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
          // Decoration presets are drawn with the avatar inset a bit from
          // the frame's edge, so the overlay needs to overhang the avatar
          // slightly to line up the way it does on Discord.
          className="absolute -inset-[10%] pointer-events-none select-none"
        />
      )}
    </>
  );
};
