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
 * Discord's avatar decoration assets are drawn on a canvas bigger than the
 * avatar photo itself — the decorative ring/frame sits *around* the avatar,
 * extending past its edge, rather than hugging it exactly. Rendering both
 * layers at the same size makes every decoration look shrunken and cramped
 * instead of framing the photo.
 *
 * This scales the decoration layer up around its own center so it bleeds
 * outward past the avatar's edges instead. Discord doesn't publish an exact
 * ratio for this, so it's tuned by eye — check it against a real equipped
 * decoration and nudge it if one still looks a touch too tight or too loose.
 * 1.2 = the decoration renders 20% bigger than the avatar box (~10% overflow
 * per edge).
 *
 * This has to stay an inline style rather than a Tailwind `scale-[...]`
 * class: Tailwind only generates CSS for class names it can see literally in
 * source, so building the class from this constant at runtime would
 * silently produce no styling at all.
 */
const DECORATION_SCALE = 1.2;

interface AvatarImageProps {
  src: string | undefined;
  name: string;
  fallbackSrc?: string;
  className?: string;
  emojiClassName?: string;
}

/** The member's live avatar photo, falling back to a local image, then an emoji placeholder, if it's missing or errors out. */
const AvatarImage = ({ src, name, fallbackSrc, className, emojiClassName }: AvatarImageProps) => {
  if (!src) {
    return <div className={`grid place-items-center bg-muted ${emojiClassName ?? ""} ${className ?? ""}`}>🖼️</div>;
  }

  return (
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
  );
};

/** The member's equipped decoration frame, scaled up so it bleeds past the avatar's edge instead of hugging it. */
const AvatarDecoration = ({ url }: { url: string }) => (
  <img
    src={url}
    alt=""
    aria-hidden="true"
    loading="lazy"
    className="absolute inset-0 z-10 w-full h-full object-contain pointer-events-none select-none"
    style={{ transform: `scale(${DECORATION_SCALE})` }}
  />
);

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
      <AvatarImage src={src} name={name} fallbackSrc={fallbackSrc} className={className} emojiClassName={emojiClassName} />
      {showDecoration && decorationUrl && <AvatarDecoration url={decorationUrl} />}
    </>
  );
};
