import { Bot, Sparkles, Shield, Music, Zap, MessageSquare, Globe, Github, Twitter, Mail, MessageCircle, Crown } from "lucide-react";

export const siteConfig = {
  bot: {
    name: "nasm",
    tagline: "The next-generation Discord bot",
    description:
      "nasm is an all-in-one Discord bot crafted for modern communities. Moderation, music, fun, utilities — beautifully designed and lightning fast.",
    version: "v1.0",
    servers: "120K+",
    users: "8.4M+",
    commands: 240,
    uptime: "97%",
    inviteUrl: "https://discord.com/oauth2/authorize",
    supportUrl: "",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Commands", href: "/commands" },
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
  ],

  features: [
    {
      icon: Shield,
      title: "Advanced Moderation",
      description:
        "AI-powered auto-mod, raid protection, and granular permission controls keep your server safe 24/7.",
    },
    {
      icon: Music,
      title: "High-Fidelity Music",
      description:
        "Crystal clear lossless audio streaming from Spotify, YouTube, SoundCloud and Apple Music.",
    },
    {
      icon: Sparkles,
      title: "Custom Embeds",
      description:
        "Create stunning announcements with our visual embed builder — no code required.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Globally distributed infrastructure ensures every command responds in under 50ms.",
    },
    {
      icon: MessageSquare,
      title: "Smart Tickets",
      description:
        "A complete support system with transcripts, categories and staff assignments.",
    },
    {
      icon: Globe,
      title: "20+ Languages",
      description:
        "Fully translated experience for your international community members.",
    },
    {
      icon: Crown,
      title: "Cheap Premium",
      description:
        "Get premium features for cheap. [$10/year]",
    },
  ],

  commandCategories: [
    {
      name: "Moderation",
      icon: Shield,
      commands: [
        { name: "/ban", description: "Ban a member from the server", usage: "/ban <user> [reason]", premium: false, staff: false },
        { name: "/kick", description: "Kick a member from the server", usage: "/kick <user> [reason]", premium: false, staff: false },
        { name: "/mute", description: "Timeout a member", usage: "/mute <user> <duration>", premium: false, staff: false },
        { name: "/warn", description: "Issue a warning to a member", usage: "/warn <user> <reason>", premium: false, staff: false },
        { name: "/purge", description: "Bulk delete messages", usage: "/purge <amount>", premium: false, staff: false },
      ],
    },
    {
      name: "Music",
      icon: Music,
      commands: [
        { name: "/play", description: "Play a song or playlist", usage: "/play <query>", premium: false, staff: false },
        { name: "/queue", description: "View the current music queue", usage: "/queue", premium: false, staff: false },
        { name: "/skip", description: "Skip the current track", usage: "/skip", premium: false, staff: false },
        { name: "/lyrics", description: "Fetch lyrics for the current song", usage: "/lyrics", premium: false, staff: false },
        { name: "/loop", description: "Loop track or queue", usage: "/loop <mode>", premium: false, staff: false },
      ],
    },
    {
      name: "Utility",
      icon: Zap,
      commands: [
        { name: "/serverinfo", description: "Display server statistics", usage: "/serverinfo", premium: false, staff: false },
        { name: "/userinfo", description: "Display user information", usage: "/userinfo <user>", premium: false, staff: false },
        { name: "/avatar", description: "Show user avatar in HD", usage: "/avatar <user>", premium: false, staff: false },
        { name: "/poll", description: "Create an interactive poll", usage: "/poll <question>", premium: false, staff: false },
        { name: "/remind", description: "Set a personal reminder", usage: "/remind <time> <text>", premium: false, staff: false },
        { name: "/afk", description: "Displays your status as AFK on ping", usage: "/afk", premium: false, staff: false },
      ],
    },
    {
      name: "Ai",
      icon: Bot,
      commands: [
        { name: "/ask", description: "Ask questions to Ai", usage: "/ask <question>", premium: false, staff: false },
        { name: "/ai model", description: "Change the Ai model", usage: "/ai model <ai> <model>", premium: true, staff: false },
        { name: "/ai usage", description: "Check the Ai usage limit", usage: "/ai usage", premium: true, staff: false },
      ],
    },
    {
      name: "Fun",
      icon: Sparkles,
      commands: [
        { name: "/meme", description: "Get a random fresh meme", usage: "/meme", premium: false, staff: false },
        { name: "/8ball", description: "Ask the magic 8-ball", usage: "/8ball <question>", premium: false, staff: false },
        { name: "/trivia", description: "Start a trivia game", usage: "/trivia", premium: false, staff: false },
        { name: "/ship", description: "Calculate love compatibility", usage: "/ship <user1> <user2>", premium: false, staff: false },
      ],
    },
  ],

  team: [
    {
      name: "Sayuri",
      role: "Founder & Lead Developer",
      bio: "Love being the core of all.",
      discordId: "1397594127159525497",
      socials: { discord: "#", twitter: "#" },
    },
    {
      name: "Nightcorepro",
      role: "Product Designer",
      bio: "Love the way it looks.",
      discordId: "1113463634409041951",
      socials: { discord: "#", github: "#" },
    },
  ],

  faqs: [
    {
      q: "Is nasm free to use?",
      a: "Yes, all core features are completely free. We offer an optional Premium tier for advanced music quality and exclusive customization.",
    },
    {
      q: "How do I add nasm to my server?",
      a: "Click the Invite button anywhere on the site, authorize the bot with the Manage Server permission, and you are ready in seconds.",
    },
    {
      q: "Does nasm store my messages?",
      a: "No. We only store configuration data essential for commands. See our Privacy page for full details.",
    },
    {
      q: "Can I request a new feature?",
      a: "Absolutely. Join our support server and post in the #suggestions channel, we ship community ideas every week.",
    },
    {
      q: "What happens if the bot goes offline?",
      a: "Our infrastructure is multi-region with automatic failover. In the rare case of downtime, status updates are posted to our support server immediately.",
    },
  ],

  contact: {
    discord: "https://discord.gg/",
    github: "https://github.com/",
    twitter: "https://twitter.com/",
  },

  socials: [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: MessageCircle, href: "#", label: "Discord" },
  ],

  privacy: {
    lastUpdated: "August 18 2026",
    sections: [
      {
        title: "Information We Collect",
        body: "We collect minimal data required for the bot to function: server IDs, channel IDs, role IDs, and configuration preferences. We never store message content unless explicitly enabled by a server administrator for logging features.",
      },
      {
        title: "How We Use Your Data",
        body: "Your data is used solely to provide bot functionality such as remembering your server's prefix, custom commands, moderation logs, and music queues. We do not sell, rent, or share your data with third parties.",
      },
      {
        title: "Data Retention",
        body: "Configuration data persists while the bot remains in your server. When Nebula is removed, all associated data is automatically purged within 30 days.",
      },
      {
        title: "Your Rights",
        body: "You may request a full export or deletion of your data at any time by contacting our support team via email or Discord.",
      },
    ],
  },

  terms: {
    sections: [
      {
        title: "Acceptable Use",
        body: "By using nasm, you agree not to abuse the service, attempt to bypass rate limits, or use the bot for illegal activities. Violations may result in a permanent ban from the service.",
      },
      {
        title: "Service Availability",
        body: "While we target 97% uptime, Nebula is provided as-is. We are not liable for service interruptions, data loss, or damages arising from use of the bot.",
      },
      {
        title: "Changes to These Terms",
        body: "We may update these terms occasionally. Continued use after changes constitutes acceptance of the updated terms.",
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
