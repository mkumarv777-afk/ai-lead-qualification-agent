const STACK = [
  "Generative AI",
  "AI Agents",
  "Next.js",
  "TypeScript",
  "n8n-ready workflows",
  "API/CRM integration",
];

export function BuiltWith() {
  return (
    <section className="built-with" aria-label="Built with">
      <span className="built-with-label">Built With</span>
      <ul>
        {STACK.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
