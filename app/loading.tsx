export default function Loading() {
  return (
    <div className="app-shell section" aria-busy="true" aria-live="polite">
      <p style={{ color: 'var(--muted)' }}>Betöltés…</p>
    </div>
  );
}
