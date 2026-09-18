import { WORKFLOW_STEPS, type WorkflowStage } from "@/lib/types";

const ORDER: WorkflowStage[] = WORKFLOW_STEPS.map((step) => step.id);

type WorkflowStatusProps = {
  current: WorkflowStage;
  analyzing: boolean;
};

export function WorkflowStatus({ current, analyzing }: WorkflowStatusProps) {
  const currentIndex = ORDER.indexOf(current);

  return (
    <ol className="workflow" aria-label="Lead workflow">
      {WORKFLOW_STEPS.map((step, index) => {
        const done = index < currentIndex || (current === "crm" && index <= currentIndex);
        const active = analyzing ? index <= 1 : index === currentIndex && current !== "crm";
        const className = done ? "step done" : active ? "step active" : "step";
        const stateLabel = done ? "Complete" : active ? "In progress" : "Queued";
        return (
          <li className={className} key={step.id}>
            <span className="step-index" aria-hidden="true">
              {done ? "✓" : index + 1}
            </span>
            <span className="step-label">{step.label}</span>
            <span className="step-state">{stateLabel}</span>
          </li>
        );
      })}
    </ol>
  );
}
