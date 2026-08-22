import { useId } from "react";

export type CommandBadgeType = "premium" | "staff";

interface CommandBadgeProps {
  type: CommandBadgeType;
  className?: string;
}

const LABELS: Record<CommandBadgeType, string> = {
  premium: "PREMIUM",
  staff: "STAFF",
};

/**
 * Small metallic pill shown next to a command name to flag it as
 * Premium-only or Staff-only. Toggle per-command via the `premium` /
 * `staff` flags on each command entry in `src/config/site.ts`.
 */
export const CommandBadge = ({ type, className = "" }: CommandBadgeProps) => {
  const gradientId = `${type}-icon-grad-${useId()}`;

  return (
    <span className={`command-badge command-badge--${type} ${className}`}>
      {type === "staff" ? (
        <svg className="command-badge__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffdde1" />
              <stop offset="100%" stopColor="#ff5c73" />
            </linearGradient>
          </defs>
          <path
            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
            fill={`url(#${gradientId})`}
          />
        </svg>
      ) : (
        <svg className="command-badge__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff8e4" />
              <stop offset="100%" stopColor="#d4a339" />
            </linearGradient>
          </defs>
          <path
            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
            fill={`url(#${gradientId})`}
          />
        </svg>
      )}
      <span className="command-badge__label">{LABELS[type]}</span>
    </span>
  );
};
