import { useEffect, useState } from "react";

interface LanyardAvatarDecorationData {
  asset: string;
  sku_id: string;
  expires_at: number | null;
}

interface LanyardDiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
  avatar_decoration_data: LanyardAvatarDecorationData | null;
}

interface LanyardResponse {
  success: boolean;
  data?: {
    discord_user: LanyardDiscordUser;
  };
}

interface UseDiscordAvatarResult {
  avatarUrl: string | null;
  decorationUrl: string | null;
  displayName: string | null;
  loading: boolean;
  error: boolean;
}

interface CachedDiscordAvatar {
  avatarUrl: string;
  decorationUrl: string | null;
  displayName: string | null;
}

// Simple in-memory cache so multiple components requesting the same
// Discord ID don't fire duplicate requests against the Lanyard API.
const cache = new Map<string, CachedDiscordAvatar>();

function buildAvatarUrl(discordId: string, avatarHash: string, size = 256): string {
  const isAnimated = avatarHash.startsWith("a_");
  const ext = isAnimated ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.${ext}?size=${size}`;
}

function buildDefaultAvatarUrl(discordId: string): string {
  // Discord's default (blurple) avatar fallback when a user has no custom avatar set.
  const index = (BigInt(discordId) >> 22n) % 6n;
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

function buildDecorationUrl(asset: string, size = 256): string {
  // Avatar decoration presets are always served as PNG, even though the
  // asset hash is prefixed with "a_" (that prefix is inherited from the
  // source asset naming and doesn't indicate an animated file here).
  return `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=${size}`;
}

/**
 * Fetches a user's live Discord avatar (and equipped avatar decoration, if any)
 * via the Lanyard API (https://api.lanyard.rest). Falls back to Discord's default
 * avatar if the user has none set, and silently fails (leaving avatarUrl null) if
 * the request errors out, so callers can render a local fallback image instead.
 */
export function useDiscordAvatar(discordId: string, size = 256): UseDiscordAvatarResult {
  const cached = cache.get(discordId);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(cached?.avatarUrl ?? null);
  const [decorationUrl, setDecorationUrl] = useState<string | null>(cached?.decorationUrl ?? null);
  const [displayName, setDisplayName] = useState<string | null>(cached?.displayName ?? null);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!discordId || cache.has(discordId)) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
      .then((res) => res.json())
      .then((json: LanyardResponse) => {
        if (cancelled) return;
        if (!json.success || !json.data) {
          setError(true);
          return;
        }
        const user = json.data.discord_user;
        const url = user.avatar ? buildAvatarUrl(discordId, user.avatar, size) : buildDefaultAvatarUrl(discordId);
        const decoration = user.avatar_decoration_data?.asset
          ? buildDecorationUrl(user.avatar_decoration_data.asset, size)
          : null;
        const name = user.global_name || user.username;
        cache.set(discordId, { avatarUrl: url, decorationUrl: decoration, displayName: name });
        setAvatarUrl(url);
        setDecorationUrl(decoration);
        setDisplayName(name);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [discordId, size]);

  return { avatarUrl, decorationUrl, displayName, loading, error };
}
