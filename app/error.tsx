'use client';
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="app-shell section">
      <h2 style={{ color: 'var(--text)' }}>Hiba történt</h2>
      <p style={{ color: 'var(--muted)' }}>{error.message}</p>
      <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => reset()}>Újra</button>
    </div>
  );
}
