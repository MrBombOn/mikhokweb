using System.Diagnostics;
using System.Text;
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

internal sealed class LauncherForm : Form
{
    private readonly TextBox _projectPath = new() { Width = 560 };
    private readonly TextBox _host = new() { Text = "127.0.0.1", Width = 120 };
    private readonly TextBox _port = new() { Text = "3000", Width = 80 };
    private readonly ComboBox _themeSelect = new() { Width = 180, DropDownStyle = ComboBoxStyle.DropDownList };
    private readonly CheckBox _runMigrations = new() { Text = "Migrate inditas elott", Checked = true, AutoSize = true };
    private readonly CheckBox _runSeed = new() { Text = "Seed inditas elott", Checked = false, AutoSize = true };
    private readonly CheckBox _openBrowser = new() { Text = "Bongeszo automatikus nyitas", Checked = true, AutoSize = true };
    private readonly CheckBox _disableTelemetry = new() { Text = "Next telemetry kikapcsolasa", Checked = true, AutoSize = true };
    private readonly CheckBox _autoInstall = new() { Text = "npm install futtatasa", Checked = false, AutoSize = true };
    private readonly CheckBox _runPrismaGenerate = new() { Text = "Prisma generate futtatasa", Checked = true, AutoSize = true };
    private readonly Button _start = new() { Text = "Inditas", Width = 110, Height = 34 };
    private readonly Button _stop = new() { Text = "Leallitas", Width = 110, Height = 34 };
    private readonly Button _clearLog = new() { Text = "Log torles", Width = 110, Height = 34 };
    private readonly Label _status = new() { AutoSize = true, Text = "Allapot: NEM FUT" };
    private readonly Label _url = new() { AutoSize = true, Text = "Lokal cim: http://127.0.0.1:3000" };
    private readonly Label _activeProcess = new() { AutoSize = true, Text = "Futo folyamat: -", Font = new Font("Segoe UI", 9f, FontStyle.Bold) };
    private readonly ProgressBar _progress = new() { Width = 420, Height = 18, Minimum = 0, Maximum = 100, Value = 0, Style = ProgressBarStyle.Continuous };
    private readonly Label _progressLabel = new() { AutoSize = true, Text = "Inditasi folyamat: varakozas" };
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

        var topWrap = new Panel { Dock = DockStyle.Top, Height = 232, Padding = new Padding(12, 12, 12, 8), BackColor = Color.White };
        Controls.Add(topWrap);
        Controls.Add(_log);

        var title = new Label
        {
            Text = "Altalanos Web Project Launcher",
            Font = new Font("Segoe UI", 14, FontStyle.Bold),
            ForeColor = Color.FromArgb(25, 63, 145),
            AutoSize = true,
            Location = new Point(10, 10)
        };
        topWrap.Controls.Add(title);

        var pathLbl = new Label { Text = "Projekt mappa:", AutoSize = true, Location = new Point(12, 48) };
        topWrap.Controls.Add(pathLbl);
        _projectPath.Location = new Point(110, 44);
        topWrap.Controls.Add(_projectPath);

        var browse = new Button { Text = "Tallozas...", Width = 92, Height = 28, Location = new Point(680, 42) };
        browse.Click += (_, _) => BrowseProjectPath();
        topWrap.Controls.Add(browse);

        var hostLbl = new Label { Text = "Host:", AutoSize = true, Location = new Point(12, 82) };
        topWrap.Controls.Add(hostLbl);
        _host.Location = new Point(52, 78);
        _host.TextChanged += (_, _) => UpdateUrl();
        topWrap.Controls.Add(_host);

        var portLbl = new Label { Text = "Port:", AutoSize = true, Location = new Point(184, 82) };
        topWrap.Controls.Add(portLbl);
        _port.Location = new Point(222, 78);
        _port.TextChanged += (_, _) => UpdateUrl();
        topWrap.Controls.Add(_port);

        var themeLbl = new Label { Text = "Tema:", AutoSize = true, Location = new Point(320, 82) };
        topWrap.Controls.Add(themeLbl);
        _themeSelect.Location = new Point(368, 78);
        _themeSelect.Items.AddRange(["PowerShell", "Dark", "Light", "Amber"]);
        _themeSelect.SelectedIndex = 0;
        _themeSelect.SelectedIndexChanged += (_, _) => ApplyTheme(ThemeFromName(_themeSelect.SelectedItem?.ToString()));
        topWrap.Controls.Add(_themeSelect);

        _status.Location = new Point(560, 82);
        _status.Font = new Font("Segoe UI", 9.5f, FontStyle.Bold);
        topWrap.Controls.Add(_status);

        _url.Location = new Point(12, 112);
        _url.Font = new Font("Segoe UI", 9.5f, FontStyle.Italic);
        topWrap.Controls.Add(_url);
        _activeProcess.Location = new Point(12, 132);
        topWrap.Controls.Add(_activeProcess);

        _progress.Location = new Point(12, 156);
        topWrap.Controls.Add(_progress);
        _progressLabel.Location = new Point(440, 157);
        _progressLabel.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
        topWrap.Controls.Add(_progressLabel);

        var options = new FlowLayoutPanel
        {
            Location = new Point(12, 180),
            Width = 900,
            Height = 44,
            FlowDirection = FlowDirection.LeftToRight,
            WrapContents = true
        };
        options.Controls.AddRange([_runMigrations, _runSeed, _openBrowser, _disableTelemetry, _autoInstall, _runPrismaGenerate]);
        topWrap.Controls.Add(options);

        _start.Location = new Point(950, 42);
        _stop.Location = new Point(950, 84);
        _clearLog.Location = new Point(950, 126);
        _start.BackColor = Color.FromArgb(35, 115, 245);
        _start.ForeColor = Color.White;
        _start.FlatStyle = FlatStyle.Flat;
        _stop.FlatStyle = FlatStyle.Flat;
        _clearLog.FlatStyle = FlatStyle.Flat;
        _stop.Enabled = false;

        _start.Click += async (_, _) => await StartServerAsync();
        _stop.Click += async (_, _) => await StopServerAsync();
        _clearLog.Click += (_, _) => _log.Clear();
        topWrap.Controls.Add(_start);
        topWrap.Controls.Add(_stop);
        topWrap.Controls.Add(_clearLog);

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
                if (answer == DialogResult.Yes)
                {
                    await StopServerAsync();
                }
            }
        };

        Log("Launcher keszen all. Valassz projektet, majd kattints az Inditas gombra.");
    }

    private static string? GuessProjectRoot()
    {
        var d = AppContext.BaseDirectory;
        for (var i = 0; i < 8; i++)
        {
            if (File.Exists(Path.Combine(d, "package.json"))) return d;
            var parent = Directory.GetParent(d);
            if (parent is null) break;
            d = parent.FullName;
        }
        return null;
    }

    private void BrowseProjectPath()
    {
        using var dlg = new FolderBrowserDialog
        {
            Description = "Valaszd ki a webprojekt gyokermappajat",
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
        if (!running && !_starting)
        {
            SetActiveProcess("-");
        }
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
            if (m.Index > last)
            {
                AppendSegment(text[last..m.Index], currentColor);
            }

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
            foreach (var kv in env)
            {
                psi.Environment[kv.Key] = kv.Value;
            }
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

        _starting = true;
        SetUiRunning(false);
        Log("=== Inditas kezdete ===");
        Log($"Projekt: {projectDir}");
        var totalSteps = 1 + (_autoInstall.Checked ? 1 : 0) + (_runPrismaGenerate.Checked ? 1 : 0) + (_runMigrations.Checked ? 1 : 0) + (_runSeed.Checked ? 1 : 0) + 1;
        BeginProgress(totalSteps);

        try
        {
            Log("[1/4] npm ellenorzes...");
            if (await RunCommandAsync(projectDir, "where npm", "where npm (ellenorzes)") != 0) { Log("HIBA: npm nem talalhato."); FinishProgress(false); return; }
            AdvanceProgress("npm ellenorzes");

            if (_autoInstall.Checked)
            {
                Log("[2/4] npm install...");
                if (await RunCommandAsync(projectDir, "npm install", "npm install") != 0) { FinishProgress(false); return; }
                AdvanceProgress("npm install");
            }

            if (_runPrismaGenerate.Checked)
            {
                Log("[3/4] npx prisma generate...");
                if (await RunCommandAsync(projectDir, "npx prisma generate", "npx prisma generate") != 0) { FinishProgress(false); return; }
                AdvanceProgress("prisma generate");
            }

            if (_runMigrations.Checked)
            {
                Log("[4/4] npm run db:migrate...");
                if (await RunCommandAsync(projectDir, "npm run db:migrate", "npm run db:migrate") != 0) { FinishProgress(false); return; }
                AdvanceProgress("db migrate");
            }

            if (_runSeed.Checked)
            {
                Log("Seed futtatasa: npm run db:seed...");
                if (await RunCommandAsync(projectDir, "npm run db:seed", "npm run db:seed") != 0) { FinishProgress(false); return; }
                AdvanceProgress("db seed");
            }

            var envVars = new Dictionary<string, string>();
            if (_disableTelemetry.Checked) envVars["NEXT_TELEMETRY_DISABLED"] = "1";

            var cmd = $"npm run dev -- --hostname {_host.Text.Trim()} --port {_port.Text.Trim()}";
            var psi = BuildCommandPsi(projectDir, cmd, envVars);
            _serverProcess = new Process { StartInfo = psi, EnableRaisingEvents = true };
            _serverProcess.OutputDataReceived += (_, e) => { if (!string.IsNullOrWhiteSpace(e.Data)) Log(e.Data); };
            _serverProcess.ErrorDataReceived += (_, e) => { if (!string.IsNullOrWhiteSpace(e.Data)) Log("[ERR] " + e.Data); };
            _serverProcess.Exited += (_, _) => { Log("A webszerver leallt."); SetUiRunning(false); };
            _serverProcess.Start();
            _serverProcess.BeginOutputReadLine();
            _serverProcess.BeginErrorReadLine();

            SetUiRunning(true);
            SetActiveProcess($"npm run dev ({_host.Text.Trim()}:{_port.Text.Trim()})");
            AdvanceProgress("dev szerver inditas");
            FinishProgress(true);
            Log($"Sikeres inditas. PID: {_serverProcess.Id}");
            Log($"Lokal cim: http://{_host.Text.Trim()}:{_port.Text.Trim()}");

            if (_openBrowser.Checked)
            {
                Process.Start(new ProcessStartInfo { FileName = $"http://{_host.Text.Trim()}:{_port.Text.Trim()}", UseShellExecute = true });
            }
        }
        finally
        {
            _starting = false;
            if (_serverProcess is not { HasExited: false })
            {
                SetUiRunning(false);
                if (_progress.Value > 0 && _progress.Value < 100) FinishProgress(false);
            }
            else
            {
                SetUiRunning(true);
            }
        }
    }

    private async Task StopServerAsync()
    {
        if (_serverProcess is null || _serverProcess.HasExited)
        {
            SetUiRunning(false);
            Log("Nincs futo webszerver.");
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
