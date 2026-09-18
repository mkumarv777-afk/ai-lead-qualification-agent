type DashboardStatsProps = {
  stats: {
    total: number;
    hot: number;
    qualified: number;
    pending: number;
  };
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  const cards = [
    { label: "Total Leads", value: stats.total, note: "In this demo workspace" },
    { label: "Hot Leads", value: stats.hot, note: "Score 75+" },
    { label: "Qualified Leads", value: stats.qualified, note: "Past qualification stage" },
    { label: "Follow-ups Pending", value: stats.pending, note: "Awaiting send or CRM push" },
  ];

  return (
    <section className="stats" aria-label="Lead metrics">
      {cards.map((card) => (
        <article className="stat-card" key={card.label}>
          <div className="stat-label">{card.label}</div>
          <div className="stat-value">{card.value}</div>
          <div className="stat-note">{card.note}</div>
        </article>
      ))}
    </section>
  );
}
