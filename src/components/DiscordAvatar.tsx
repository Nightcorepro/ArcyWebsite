import { useDiscordAvatar } from "@/hooks/use-discord-avatar";

interface DiscordAvatarProps {
  discordId: string;
  name: string;
  /** Local image shown while the Lanyard request is loading or if it fails. */
  fallbackSrc?: string;
  className?: string;
  emojiClassName?: string;
  /**
   * Whether to render the user's equipped Discord avatar decoration (the
   * animated frame some users have around their avatar), if they have one set.
   * Requires the nearest positioned ancestor to be the element you want the
   * decoration to hang off of (both call sites already wrap this in a
   * `relative` sized div, which is exactly what's needed).
   */
  showDecoration?: boolean;
}

/**
 * Discord's avatar decoration assets are drawn on a canvas that's bigger
 * than the avatar itself — the decorative ring/frame is meant to sit
 * *around* the avatar photo, extending past its edge, not hug it exactly.
 * Rendering the decoration at the same size as the avatar box (the old
 * behavior here) made frames look shrunken and cramped instead of framing
 * the avatar. This constant lets the decoration bleed outward past the
 * avatar container on every side to compensate.
 *
 * Discord doesn't publish an exact number for this, so it's tuned by eye —
 * if a specific decoration still looks a little too tight or too loose,
 * nudge this percentage up or down and check it against the live site.
 */
const DECORATION_BLEED_PERCENT = 10;

/** Renders a member's live Discord avatar (via Lanyard), falling back to a local image or emoji placeholder. */
export const DiscordAvatar = ({
  discordId,
  name,
  fallbackSrc,
  className,
  emojiClassName,
  showDecoration = true,
}: DiscordAvatarProps) => {
  const { avatarUrl, decorationUrl, loading, error } = useDiscordAvatar(discordId);
  const src = avatarUrl ?? (loading || error ? fallbackSrc : undefined);

  return (
    <>
      {src ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={(e) => {
            if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
              e.currentTarget.src = fallbackSrc;
            }
          }}
          className={className}
        />
      ) : (
        <div className={`grid place-items-center bg-muted ${emojiClassName ?? ""} ${className ?? ""}`}>🖼️</div>
      )}
      {showDecoration && decorationUrl && (
        <img
          src={decorationUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          // Note: no `w-full h-full` here — those would force the box back
          // to the container's exact size and fight with `inset`. Leaving
          // width/height on `auto` lets the negative inset (set below) grow
          // the box past the container edges instead. `object-contain`
          // still keeps the decoration's own aspect ratio intact within
          // that (now larger) box, so it isn't stretched or distorted.
          className="absolute z-10 object-contain pointer-events-none select-none"
          style={{ inset: `-${DECORATION_BLEED_PERCENT}%` }}
        />
      )}
    </>
  );
};
