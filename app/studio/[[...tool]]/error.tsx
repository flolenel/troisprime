'use client'

export default function StudioError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      gap: '1rem',
    }}>
      <h2 style={{ color: '#FC431F' }}>Erreur dans le studio</h2>
      <p style={{ color: '#666' }}>{error.message}</p>
      <button
        onClick={reset}
        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Réessayer
      </button>
    </div>
  )
}
