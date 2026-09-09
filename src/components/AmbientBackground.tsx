export default function AmbientBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <span className="glow-bubble" key={index} />
      ))}
    </div>
  )
}
