import type { LeadRecord } from "@/lib/types";

type RecentLeadsProps = {
  leads: LeadRecord[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

export function RecentLeads({ leads, selectedId, onSelect }: RecentLeadsProps) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Contact</th>
            <th>Company</th>
            <th>Industry</th>
            <th>Priority</th>
            <th>Score</th>
            <th>Follow-up</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} style={{ background: lead.id === selectedId ? "#eef6f5" : undefined }}>
              <td>
                <button className="row-link" type="button" onClick={() => onSelect(lead.id)}>
                  {lead.name}
                </button>
                <div className="stat-note">{lead.email}</div>
              </td>
              <td>{lead.company}</td>
              <td>{lead.industry}</td>
              <td>
                {lead.analysis ? (
                  <span className={`badge badge-${lead.analysis.priority.toLowerCase()}`}>
                    {lead.analysis.priority}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td>{lead.analysis?.score ?? "—"}</td>
              <td>{lead.followUpPending ? "Pending" : "Complete"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
