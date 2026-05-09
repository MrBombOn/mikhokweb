using System.Diagnostics;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace WebProjectLauncher;

internal static class Program
{
    [STAThread]
    static void Main()
    {
        ApplicationConfiguration.Initialize();
        Application.Run(new LauncherForm());
    }
}

/// <summary>Projekt gyökerében opcionális web-launcher.json — bármely Node/Next (vagy más npm) repóhoz.</summary>
internal sealed class LauncherJsonFile
{
    public int ProfileVersion { get; set; } = 1;
    public string? DisplayName { get; set; }
    public string? WindowTitle { get; set; }
    public string? DevCommand { get; set; }
    public Dictionary<string, LauncherJsonStep>? Steps { get; set; }
}

internal sealed class LauncherJsonStep
{
    public string? Command { get; set; }
    public bool? DefaultOn { get; set; }
}

internal sealed record StepMeta(
    string Id,
    string Label,
    string DefaultCommand,
    bool DefaultChecked,
    string[]? NeedFilesRelative,
    string? PackageJsonScript);

internal sealed class LauncherForm : Form
{
    private const string DefaultDevTemplate = "npm run dev -- --hostname {host} --port {port}";

    private static readonly StepMeta[] StepCatalog =
    [
        new("npm-ci", "npm ci (tiszta telepites)", "npm ci", false, null, null),
        new("npm-install", "npm install", "npm install", false, null, null),
        new("prisma-generate", "Prisma client generate", "npx prisma generate", true, ["prisma/schema.prisma"], null),
        new("db-migrate", "DB migracio (npm script)", "npm run db:migrate", true, ["prisma/schema.prisma"], "db:migrate"),
        new("db-seed", "DB seed (npm script)", "npm run db:seed", false, ["prisma/schema.prisma"], "db:seed"),
        new("lint", "npm run lint", "npm run lint", false, null, "lint"),
        new("typecheck", "npm run typecheck", "npm run typecheck", false, null, "typecheck"),
        new("test", "npm run test (unit)", "npm run test", false, null, "test"),
        new("build", "npm run build (production)", "npm run build", false, null, "build"),
        new("e2e", "npm run test:e2e (Playwright)", "npm run test:e2e", false, null, "test:e2e"),
    ];

    private readonly TextBox _projectPath = new() { Width = 520 };
    private readonly TextBox _host = new() { Text = "127.0.0.1", Width = 120 };
    private readonly TextBox _port = new() { Text = "3000", Width = 80 };
    private readonly ComboBox _themeSelect = new() { Width = 160, DropDownStyle = ComboBoxStyle.DropDownList };
    private readonly TextBox _devCommand = new() { Multiline = true, Height = 44, Width = 720, ScrollBars = ScrollBars.Vertical, WordWrap = true };
    private readonly Label _configHint = new() { AutoSize = true, ForeColor = Color.DimGray, MaximumSize = new Size(720, 0) };
    private readonly Button _resetDevCmd = new() { Text = "Dev parancs visszaallitasa", AutoSize = true };
    private readonly Dictionary<string, CheckBox> _stepChecks = new();
    private readonly Dictionary<string, string> _stepCommands = new();
    private readonly Button _start = new() { Text = "Inditas", Width = 110, Height = 34 };
    private readonly Button _stop = new() { Text = "Leallitas", Width = 110, Height = 34 };
    private readonly Button _clearLog = new() { Text = "Log torles", Width = 110, Height = 34 };
    private readonly Label _status = new() { AutoSize = true, Text = "Allapot: NEM FUT" };
    private readonly Label _url = new() { AutoSize = true, Text = "Lokal cim: http://127.0.0.1:3000" };
    private readonly Label _activeProcess = new() { AutoSize = true, Text = "Futo folyamat: -", Font = new Font("Segoe UI", 9f, FontStyle.Bold) };
    private readonly ProgressBar _progress = new() { Width = 420, Height = 18, Minimum = 0, Maximum = 100, Value = 0, Style = ProgressBarStyle.Continuous };
    private readonly Label _progressLabel = new() { AutoSize = true, Text = "Inditasi folyamat: varakozas" };
    private readonly CheckBox _openBrowser = new() { Text = "Bongeszo automatikus nyitas", Checked = true, AutoSize = true };
    private readonly CheckBox _disableTelemetry = new() { Text = "Next telemetry kikapcsolasa (NEXT_TELEMETRY_DISABLED=1)", Checked = true, AutoSize = true };
    private readonly RichTextBox _log = new()
    {
        ReadOnly = true,
        Font = new Font("Consolas", 10),
        Dock = DockStyle.Fill,
        WordWrap = false,
        DetectUrls = false,
        HideSelection = false
    };

    private readonly Regex _ansiRegex = new(@"\x1B\[(?<code>[0-9;]+)m", RegexOptions.Compiled);
    private Process? _serverProcess;
    private volatile bool _starting;
    private int _progressTotal;
    private int _progressCurrent;
    private ThemePreset _theme = ThemePreset.PowerShell;

    public LauncherForm()
    {
        Text = "Web Project Launcher";
        Width = 1180;
        Height = 820;
        StartPosition = FormStartPosition.CenterScreen;
        MinimumSize = new Size(980, 680);

        var rootGuess = GuessProjectRoot();
        _projectPath.Text = rootGuess ?? Environment.CurrentDirectory;
        _devCommand.Text = DefaultDevTemplate;

        var tabs = new TabControl { Dock = DockStyle.Top, Height = 320, Padding = new Point(8, 8) };
        var tabProject = new TabPage("Projekt es lepesek");
        var tabAdvanced = new TabPage("Halado (dev parancs)");
        tabs.TabPages.Add(tabProject);
        tabs.TabPages.Add(tabAdvanced);
        Controls.Add(tabs);
        Controls.Add(_log);

        BuildProjectTab(tabProject);
        BuildAdvancedTab(tabAdvanced);

        _resetDevCmd.Click += (_, _) =>
        {
            _devCommand.Text = MergedDevCommand(_projectPath.Text.Trim()) ?? DefaultDevTemplate;
            Log("Dev parancs visszaallitva alapertelmezettre / web-launcher.json szerint.");
        };

        ApplyTheme(_theme);

        FormClosing += async (_, e) =>
        {
            if (_serverProcess is { HasExited: false })
            {
                var answer = MessageBox.Show("A webszerver meg fut. Leallitsam kilepes elott?", "Leallitas", MessageBoxButtons.YesNoCancel, MessageBoxIcon.Question);
                if (answer == DialogResult.Cancel)
                {
                    e.Cancel = true;
                    return;
                }
                if (answer == DialogResult.Yes) await StopServerAsync();
            }
        };

        ReloadProjectConfig();
        Log("Web Project Launcher — barmely npm-alapu webprojekthez. Allitsd be a mappat, a lepeseket, majd Inditas.");
    }

    private void BuildProjectTab(TabPage tab)
    {
        tab.Padding = new Padding(10);
        var title = new Label
        {
            Text = "Altalanos npm / Next.js (vagy mas) fejlesztoi indito",
            Font = new Font("Segoe UI", 12, FontStyle.Bold),
            ForeColor = Color.FromArgb(25, 63, 145),
            AutoSize = true,
            Location = new Point(8, 8)
        };
        tab.Controls.Add(title);

        var pathLbl = new Label { Text = "Projekt mappa (package.json):", AutoSize = true, Location = new Point(8, 40) };
        tab.Controls.Add(pathLbl);
        _projectPath.Location = new Point(8, 60);
        tab.Controls.Add(_projectPath);

        var browse = new Button { Text = "Tallozas...", Width = 92, Height = 28, Location = new Point(540, 56) };
        browse.Click += (_, _) =>
        {
            BrowseProjectPath();
            ReloadProjectConfig();
        };
        tab.Controls.Add(browse);
        var reloadCfg = new Button { Text = "Profil betoltese", Width = 120, Height = 28, Location = new Point(640, 56) };
        reloadCfg.Click += (_, _) => ReloadProjectConfig();
        tab.Controls.Add(reloadCfg);

        var hostLbl = new Label { Text = "Host:", AutoSize = true, Location = new Point(8, 96) };
        tab.Controls.Add(hostLbl);
        _host.Location = new Point(52, 92);
        _host.TextChanged += (_, _) => UpdateUrl();
        tab.Controls.Add(_host);

        var portLbl = new Label { Text = "Port:", AutoSize = true, Location = new Point(184, 96) };
        tab.Controls.Add(portLbl);
        _port.Location = new Point(222, 92);
        _port.TextChanged += (_, _) => UpdateUrl();
        tab.Controls.Add(_port);

        var themeLbl = new Label { Text = "Tema:", AutoSize = true, Location = new Point(320, 96) };
        tab.Controls.Add(themeLbl);
        _themeSelect.Location = new Point(368, 92);
        _themeSelect.Items.AddRange(["PowerShell", "Dark", "Light", "Amber"]);
        _themeSelect.SelectedIndex = 0;
        _themeSelect.SelectedIndexChanged += (_, _) => ApplyTheme(ThemeFromName(_themeSelect.SelectedItem?.ToString()));
        tab.Controls.Add(_themeSelect);

        _status.Location = new Point(560, 96);
        _status.Font = new Font("Segoe UI", 9.5f, FontStyle.Bold);
        tab.Controls.Add(_status);

        _url.Location = new Point(8, 124);
        _url.Font = new Font("Segoe UI", 9.5f, FontStyle.Italic);
        tab.Controls.Add(_url);
        _activeProcess.Location = new Point(8, 144);
        tab.Controls.Add(_activeProcess);

        _progress.Location = new Point(8, 168);
        tab.Controls.Add(_progress);
        _progressLabel.Location = new Point(440, 169);
        tab.Controls.Add(_progressLabel);

        _configHint.Location = new Point(8, 192);
        tab.Controls.Add(_configHint);

        var flow = new FlowLayoutPanel
        {
            Location = new Point(8, 218),
            Width = 900,
            Height = 88,
            FlowDirection = FlowDirection.LeftToRight,
            WrapContents = true,
            AutoScroll = true
        };
        flow.Controls.Add(_openBrowser);
        flow.Controls.Add(_disableTelemetry);
        foreach (var meta in StepCatalog)
        {
            var cb = new CheckBox { Text = meta.Label, AutoSize = true, Tag = meta.Id };
            _stepChecks[meta.Id] = cb;
            _stepCommands[meta.Id] = meta.DefaultCommand;
            flow.Controls.Add(cb);
        }
        tab.Controls.Add(flow);

        _start.Location = new Point(950, 56);
        _stop.Location = new Point(950, 98);
        _clearLog.Location = new Point(950, 140);
        _start.BackColor = Color.FromArgb(35, 115, 245);
        _start.ForeColor = Color.White;
        _start.FlatStyle = FlatStyle.Flat;
        _stop.FlatStyle = FlatStyle.Flat;
        _clearLog.FlatStyle = FlatStyle.Flat;
        _stop.Enabled = false;
        _start.Click += async (_, _) => await StartServerAsync();
        _stop.Click += async (_, _) => await StopServerAsync();
        _clearLog.Click += (_, _) => _log.Clear();
        tab.Controls.Add(_start);
        tab.Controls.Add(_stop);
        tab.Controls.Add(_clearLog);

        UpdateUrl();
    }

    private void BuildAdvancedTab(TabPage tab)
    {
        tab.Padding = new Padding(10);
        var help = new Label
        {
            Location = new Point(8, 12),
            MaximumSize = new Size(900, 0),
            AutoSize = true,
            Text = "A {host} es {port} helyorzok behelyettesitodnek. Mas keretrendszerhez (pl. Vite) ird at a parancsot, pl.: npm run dev -- --host {host} --port {port}"
        };
        tab.Controls.Add(help);
        _devCommand.Location = new Point(8, 56);
        tab.Controls.Add(_devCommand);
        _resetDevCmd.Location = new Point(8, 108);
        tab.Controls.Add(_resetDevCmd);
    }

    private static string? GuessProjectRoot()
    {
        var d = AppContext.BaseDirectory;
        for (var i = 0; i < 10; i++)
        {
            if (File.Exists(Path.Combine(d, "package.json"))) return d;
            var parent = Directory.GetParent(d);
            if (parent is null) break;
            d = parent.FullName;
        }
        return null;
    }

    private static LauncherJsonFile? LoadLauncherJson(string projectDir)
    {
        var path = Path.Combine(projectDir, "web-launcher.json");
        if (!File.Exists(path)) return null;
        try
        {
            var json = File.ReadAllText(path);
            return JsonSerializer.Deserialize<LauncherJsonFile>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
        catch
        {
            return null;
        }
    }

    private static string? MergedDevCommand(string projectDir)
    {
        var j = LoadLauncherJson(projectDir);
        if (string.IsNullOrWhiteSpace(j?.DevCommand)) return null;
        return j.DevCommand.Trim();
    }

    private void ReloadProjectConfig()
    {
        var dir = _projectPath.Text.Trim();
        if (!Directory.Exists(dir) || !File.Exists(Path.Combine(dir, "package.json")))
        {
            _configHint.Text = "Adj meg egy letezo mappat, ahol van package.json.";
            return;
        }

        var json = LoadLauncherJson(dir);
        Text = string.IsNullOrWhiteSpace(json?.WindowTitle)
            ? (string.IsNullOrWhiteSpace(json?.DisplayName) ? "Web Project Launcher" : $"Launcher — {json.DisplayName}")
            : json!.WindowTitle!;

        _devCommand.Text = MergedDevCommand(dir) ?? DefaultDevTemplate;

        foreach (var meta in StepCatalog)
        {
            var cmd = meta.DefaultCommand;
            var on = meta.DefaultChecked;
            if (json?.Steps is not null && json.Steps.TryGetValue(meta.Id, out var step))
            {
                if (!string.IsNullOrWhiteSpace(step.Command)) cmd = step.Command!.Trim();
                if (step.DefaultOn.HasValue) on = step.DefaultOn.Value;
            }
            _stepCommands[meta.Id] = cmd;
            if (_stepChecks.TryGetValue(meta.Id, out var cb))
            {
                cb.Checked = on;
                var need = meta.NeedFilesRelative is not null && !meta.NeedFilesRelative.All(f => File.Exists(Path.Combine(dir, f)));
                var scriptMissing = meta.PackageJsonScript is not null && !PackageJsonHasScript(dir, meta.PackageJsonScript);
                if (need || scriptMissing)
                {
                    cb.Enabled = false;
                    cb.Checked = false;
                }
                else cb.Enabled = true;
            }
        }

        _configHint.Text = File.Exists(Path.Combine(dir, "web-launcher.json"))
            ? "Profil: web-launcher.json betoltve."
            : "Nincs web-launcher.json — alapertelmezett lepesek. Masik projekthez masold a web-launcher.example.json fajlt web-launcher.json neven.";
    }

    private static bool PackageJsonHasScript(string projectDir, string scriptName)
    {
        var path = Path.Combine(projectDir, "package.json");
        if (!File.Exists(path)) return false;
        try
        {
            using var doc = JsonDocument.Parse(File.ReadAllText(path));
            return doc.RootElement.TryGetProperty("scripts", out var scripts) && scripts.TryGetProperty(scriptName, out _);
        }
        catch
        {
            return false;
        }
    }

    private void BrowseProjectPath()
    {
        using var dlg = new FolderBrowserDialog
        {
            Description = "Valaszd ki a webprojekt gyokermappajat (ahol a package.json van)",
            SelectedPath = Directory.Exists(_projectPath.Text) ? _projectPath.Text : Environment.CurrentDirectory
        };
        if (dlg.ShowDialog() == DialogResult.OK) _projectPath.Text = dlg.SelectedPath;
    }

    private void UpdateUrl() => _url.Text = $"Lokal cim: http://{_host.Text}:{_port.Text}";

    private void SetUiRunning(bool running)
    {
        _start.Enabled = !running && !_starting;
        _stop.Enabled = running || _starting;
        _status.Text = running ? "Allapot: FUT" : (_starting ? "Allapot: INDUL..." : "Allapot: NEM FUT");
        _status.ForeColor = running ? _theme.SuccessColor : (_starting ? _theme.WarningColor : _theme.ErrorColor);
        if (!running && !_starting) SetActiveProcess("-");
    }

    private void BeginProgress(int totalSteps)
    {
        _progressTotal = Math.Max(1, totalSteps);
        _progressCurrent = 0;
        _progress.Value = 0;
        _progressLabel.Text = "Inditasi folyamat: folyamatban...";
    }

    private void AdvanceProgress(string stage)
    {
        _progressCurrent++;
        var pct = (int)Math.Round((_progressCurrent * 100.0) / _progressTotal);
        _progress.Value = Math.Clamp(pct, 0, 100);
        _progressLabel.Text = $"Inditasi folyamat: {stage} ({_progress.Value}%)";
    }

    private void FinishProgress(bool ok)
    {
        _progress.Value = ok ? 100 : 0;
        _progressLabel.Text = ok ? "Inditasi folyamat: kesz" : "Inditasi folyamat: hibaval leallt";
    }

    private void SetActiveProcess(string name)
    {
        if (InvokeRequired)
        {
            BeginInvoke(() => SetActiveProcess(name));
            return;
        }
        _activeProcess.Text = $"Futo folyamat: {name}";
    }

    private void ApplyTheme(ThemePreset preset)
    {
        _theme = preset;
        BackColor = preset.FormBackColor;
        _log.BackColor = preset.LogBackColor;
        _log.ForeColor = preset.LogForeColor;
        _log.SelectionBackColor = preset.LogBackColor;
        _progress.ForeColor = preset.AccentColor;
        _status.ForeColor = preset.ErrorColor;
    }

    private static ThemePreset ThemeFromName(string? name) => name switch
    {
        "Dark" => ThemePreset.Dark,
        "Light" => ThemePreset.Light,
        "Amber" => ThemePreset.Amber,
        _ => ThemePreset.PowerShell
    };

    private static readonly Dictionary<int, Color> AnsiColorMap = new()
    {
        [30] = Color.Black, [31] = Color.IndianRed, [32] = Color.MediumSeaGreen, [33] = Color.Goldenrod,
        [34] = Color.DodgerBlue, [35] = Color.MediumOrchid, [36] = Color.DarkTurquoise, [37] = Color.Gainsboro,
        [90] = Color.Gray, [91] = Color.Salmon, [92] = Color.LightGreen, [93] = Color.Khaki,
        [94] = Color.SkyBlue, [95] = Color.Plum, [96] = Color.LightCyan, [97] = Color.White
    };

    private void Log(string line)
    {
        if (InvokeRequired)
        {
            BeginInvoke(() => Log(line));
            return;
        }
        AppendAnsiLine($"[{DateTime.Now:HH:mm:ss}] {line}");
    }

    private void AppendAnsiLine(string text)
    {
        var currentColor = _theme.LogForeColor;
        var last = 0;
        foreach (Match m in _ansiRegex.Matches(text))
        {
            if (m.Index > last) AppendSegment(text[last..m.Index], currentColor);
            var codes = m.Groups["code"].Value.Split(';', StringSplitOptions.RemoveEmptyEntries);
            foreach (var c in codes)
            {
                if (!int.TryParse(c, out var code)) continue;
                if (code == 0) currentColor = _theme.LogForeColor;
                else if (AnsiColorMap.TryGetValue(code, out var mapped)) currentColor = mapped;
            }
            last = m.Index + m.Length;
        }
        if (last < text.Length) AppendSegment(text[last..], currentColor);
        AppendSegment(Environment.NewLine, _theme.LogForeColor);
        _log.SelectionStart = _log.TextLength;
        _log.ScrollToCaret();
    }

    private void AppendSegment(string text, Color color)
    {
        _log.SelectionStart = _log.TextLength;
        _log.SelectionLength = 0;
        _log.SelectionColor = color;
        _log.AppendText(text);
    }

    private bool ValidateSettings(out string projectDir)
    {
        projectDir = _projectPath.Text.Trim();
        if (string.IsNullOrWhiteSpace(projectDir) || !Directory.Exists(projectDir))
        {
            MessageBox.Show("A projekt mappa nem letezik.", "Hiba", MessageBoxButtons.OK, MessageBoxIcon.Error);
            return false;
        }
        if (!File.Exists(Path.Combine(projectDir, "package.json")))
        {
            MessageBox.Show("A megadott mappaban nincs package.json.", "Hiba", MessageBoxButtons.OK, MessageBoxIcon.Error);
            return false;
        }
        if (!Regex.IsMatch(_port.Text.Trim(), @"^\d{2,5}$"))
        {
            MessageBox.Show("A port szama ervenytelen.", "Hiba", MessageBoxButtons.OK, MessageBoxIcon.Error);
            return false;
        }
        if (string.IsNullOrWhiteSpace(_devCommand.Text))
        {
            MessageBox.Show("A dev parancs sablon ures.", "Hiba", MessageBoxButtons.OK, MessageBoxIcon.Error);
            return false;
        }
        return true;
    }

    private ProcessStartInfo BuildCommandPsi(string projectDir, string command, Dictionary<string, string>? env = null)
    {
        var psi = new ProcessStartInfo("cmd.exe", $"/d /c chcp 65001>nul & {command}")
        {
            WorkingDirectory = projectDir,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true,
            StandardOutputEncoding = new UTF8Encoding(false),
            StandardErrorEncoding = new UTF8Encoding(false)
        };
        psi.Environment["FORCE_COLOR"] = "1";
        psi.Environment["CLICOLOR_FORCE"] = "1";
        psi.Environment["TERM"] = "xterm-256color";
        if (env is not null)
        {
            foreach (var kv in env) psi.Environment[kv.Key] = kv.Value;
        }
        return psi;
    }

    private async Task<int> RunCommandAsync(string projectDir, string command, string displayName, Dictionary<string, string>? env = null)
    {
        SetActiveProcess(displayName);
        var psi = BuildCommandPsi(projectDir, command, env);
        using var p = new Process { StartInfo = psi, EnableRaisingEvents = true };
        p.OutputDataReceived += (_, e) => { if (!string.IsNullOrWhiteSpace(e.Data)) Log(e.Data); };
        p.ErrorDataReceived += (_, e) => { if (!string.IsNullOrWhiteSpace(e.Data)) Log("[ERR] " + e.Data); };
        p.Start();
        p.BeginOutputReadLine();
        p.BeginErrorReadLine();
        await p.WaitForExitAsync();
        return p.ExitCode;
    }

    private async Task StartServerAsync()
    {
        if (_starting) return;
        if (_serverProcess is { HasExited: false })
        {
            MessageBox.Show("A szerver mar fut.", "Info", MessageBoxButtons.OK, MessageBoxIcon.Information);
            return;
        }
        if (!ValidateSettings(out var projectDir)) return;

        if (_stepChecks.GetValueOrDefault("npm-ci")?.Checked == true && _stepChecks.GetValueOrDefault("npm-install")?.Checked == true)
        {
            MessageBox.Show("Valaszd ki vagy az npm ci-t, vagy az npm install-t — ne mindkettot egyszerre.", "Figyelem", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        _starting = true;
        SetUiRunning(false);
        Log("=== Inditas kezdete ===");
        Log($"Projekt: {projectDir}");

        var pipeline = new List<(string name, string cmd)>();
        pipeline.Add(("npm ellenorzes", "where npm"));
        foreach (var meta in StepCatalog)
        {
            if (!_stepChecks.TryGetValue(meta.Id, out var cb) || !cb.Checked) continue;
            if (meta.NeedFilesRelative is not null && !meta.NeedFilesRelative.All(f => File.Exists(Path.Combine(projectDir, f))))
            {
                Log($"Kihagyva (hianyzo fajlok): {meta.Label}");
                continue;
            }
            if (meta.PackageJsonScript is not null && !PackageJsonHasScript(projectDir, meta.PackageJsonScript))
            {
                Log($"Kihagyva (nincs npm script: {meta.PackageJsonScript}): {meta.Label}");
                continue;
            }
            var cmd = _stepCommands.GetValueOrDefault(meta.Id, meta.DefaultCommand);
            if (string.IsNullOrWhiteSpace(cmd)) continue;
            pipeline.Add((meta.Label, cmd));
        }

        var devTemplate = _devCommand.Text.Trim().Replace("{host}", _host.Text.Trim(), StringComparison.OrdinalIgnoreCase)
            .Replace("{port}", _port.Text.Trim(), StringComparison.OrdinalIgnoreCase);
        pipeline.Add(("dev szerver", devTemplate));

        BeginProgress(pipeline.Count);

        try
        {
            for (var i = 0; i < pipeline.Count; i++)
            {
                var (name, cmd) = pipeline[i];
                Log($"[{i + 1}/{pipeline.Count}] {name}: {cmd}");
                if (i == 0)
                {
                    if (await RunCommandAsync(projectDir, cmd, name) != 0)
                    {
                        Log("HIBA: npm nem talalhato a PATH-on.");
                        FinishProgress(false);
                        return;
                    }
                }
                else if (i < pipeline.Count - 1)
                {
                    if (await RunCommandAsync(projectDir, cmd, name) != 0)
                    {
                        Log($"HIBA: lepes sikertelen: {name}");
                        FinishProgress(false);
                        return;
                    }
                }
                else
                {
                    var envVars = new Dictionary<string, string>();
                    if (_disableTelemetry.Checked) envVars["NEXT_TELEMETRY_DISABLED"] = "1";
                    var psi = BuildCommandPsi(projectDir, cmd, envVars);
                    _serverProcess = new Process { StartInfo = psi, EnableRaisingEvents = true };
                    _serverProcess.OutputDataReceived += (_, e) => { if (!string.IsNullOrWhiteSpace(e.Data)) Log(e.Data); };
                    _serverProcess.ErrorDataReceived += (_, e) => { if (!string.IsNullOrWhiteSpace(e.Data)) Log("[ERR] " + e.Data); };
                    _serverProcess.Exited += (_, _) => { Log("A dev szerver folyamat leallt."); SetUiRunning(false); };
                    _serverProcess.Start();
                    _serverProcess.BeginOutputReadLine();
                    _serverProcess.BeginErrorReadLine();
                    SetUiRunning(true);
                    SetActiveProcess(name);
                    Log($"Sikeres inditas. PID: {_serverProcess.Id}");
                    Log($"Bongeszo: http://{_host.Text.Trim()}:{_port.Text.Trim()}");
                    if (_openBrowser.Checked)
                    {
                        Process.Start(new ProcessStartInfo { FileName = $"http://{_host.Text.Trim()}:{_port.Text.Trim()}", UseShellExecute = true });
                    }
                }
                AdvanceProgress(name);
            }
            FinishProgress(true);
        }
        finally
        {
            _starting = false;
            if (_serverProcess is not { HasExited: false })
            {
                SetUiRunning(false);
                if (_progress.Value > 0 && _progress.Value < 100) FinishProgress(false);
            }
            else SetUiRunning(true);
        }
    }

    private async Task StopServerAsync()
    {
        if (_serverProcess is null || _serverProcess.HasExited)
        {
            SetUiRunning(false);
            Log("Nincs futo dev szerver.");
            return;
        }
        try
        {
            Log($"Leallitas PID {_serverProcess.Id}...");
            using var killer = Process.Start(new ProcessStartInfo("taskkill", $"/PID {_serverProcess.Id} /T /F")
            {
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
                StandardOutputEncoding = new UTF8Encoding(false),
                StandardErrorEncoding = new UTF8Encoding(false)
            });
            if (killer is not null)
            {
                var outText = await killer.StandardOutput.ReadToEndAsync();
                var errText = await killer.StandardError.ReadToEndAsync();
                await killer.WaitForExitAsync();
                if (!string.IsNullOrWhiteSpace(outText)) Log(outText.Trim());
                if (!string.IsNullOrWhiteSpace(errText)) Log("[ERR] " + errText.Trim());
            }
        }
        catch (Exception ex)
        {
            Log("Leallitasi hiba: " + ex.Message);
        }
        finally
        {
            _serverProcess = null;
            SetUiRunning(false);
            _progress.Value = 0;
            _progressLabel.Text = "Inditasi folyamat: varakozas";
        }
    }
}

internal sealed record ThemePreset(
    Color FormBackColor,
    Color LogBackColor,
    Color LogForeColor,
    Color AccentColor,
    Color SuccessColor,
    Color WarningColor,
    Color ErrorColor)
{
    public static ThemePreset PowerShell { get; } = new(
        FormBackColor: Color.FromArgb(236, 241, 247),
        LogBackColor: Color.FromArgb(1, 36, 86),
        LogForeColor: Color.FromArgb(238, 242, 255),
        AccentColor: Color.FromArgb(75, 156, 255),
        SuccessColor: Color.FromArgb(123, 202, 125),
        WarningColor: Color.FromArgb(255, 195, 81),
        ErrorColor: Color.FromArgb(255, 121, 121));

    public static ThemePreset Dark { get; } = new(
        FormBackColor: Color.FromArgb(27, 30, 36),
        LogBackColor: Color.FromArgb(16, 18, 22),
        LogForeColor: Color.Gainsboro,
        AccentColor: Color.FromArgb(90, 160, 255),
        SuccessColor: Color.MediumSeaGreen,
        WarningColor: Color.Goldenrod,
        ErrorColor: Color.IndianRed);

    public static ThemePreset Light { get; } = new(
        FormBackColor: Color.FromArgb(244, 247, 252),
        LogBackColor: Color.White,
        LogForeColor: Color.FromArgb(32, 38, 45),
        AccentColor: Color.FromArgb(35, 115, 245),
        SuccessColor: Color.DarkGreen,
        WarningColor: Color.DarkGoldenrod,
        ErrorColor: Color.Firebrick);

    public static ThemePreset Amber { get; } = new(
        FormBackColor: Color.FromArgb(42, 36, 28),
        LogBackColor: Color.FromArgb(28, 20, 10),
        LogForeColor: Color.FromArgb(255, 225, 180),
        AccentColor: Color.FromArgb(237, 170, 66),
        SuccessColor: Color.FromArgb(157, 209, 115),
        WarningColor: Color.FromArgb(255, 195, 81),
        ErrorColor: Color.FromArgb(255, 128, 109));
}
