type Level = 'info' | 'warn' | 'error';

type LogMeta = Record<string, unknown>;

function sanitize(meta: LogMeta): LogMeta {
  const redactedKeys = ['password', 'token', 'cookie', 'authorization', 'email'];
  const out: LogMeta = {};
  for (const [key, value] of Object.entries(meta)) {
    if (redactedKeys.some((k) => key.toLowerCase().includes(k))) {
      out[key] = '[REDACTED]';
      continue;
    }
    out[key] = value;
  }
  return out;
}

function write(level: Level, event: string, meta: LogMeta = {}) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    event,
    ...sanitize(meta),
  };
  const line = JSON.stringify(payload);
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.info(line);
}

export const serverLogger = {
  info: (event: string, meta?: LogMeta) => write('info', event, meta),
  warn: (event: string, meta?: LogMeta) => write('warn', event, meta),
  error: (event: string, meta?: LogMeta) => write('error', event, meta),
};

