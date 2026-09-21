export function ProfileStrip() {
  const facts = ["Based in Indonesia", "Focused on modern web experiences", "Open to opportunities"];
  return (
    <section id="profile-strip" className="profile-strip" aria-label="Quick profile">
      <div className="container profile-strip-inner">
        {facts.map((fact, index) => <p key={fact}><span>0{index + 1}</span>{fact}</p>)}
      </div>
    </section>
  );
}
