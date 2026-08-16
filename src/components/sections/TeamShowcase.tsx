import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SplitTextReveal } from "@/components/reactbits/SplitTextReveal";
import { DiscordAvatar } from "@/components/DiscordAvatar";
import prayagAvatar from "@/assets/prayag-avatar.jpg";
import devAvatar from "@/assets/dev-avatar.jpg";

// Local fallback images shown while the live Discord avatar loads,
// or if the Lanyard API request fails.
const FALLBACK_AVATARS: Record<string, string> = {
  "1397594127159525497": prayagAvatar, // Sayuri
  "1113463634409041951": devAvatar, // Nightcorepro
};

type TeamMember = (typeof siteConfig.team)[number];

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="liquid-glass rounded-3xl p-6 text-center group"
    >
      <div className="relative w-28 h-28 mx-auto">
        <div className="absolute inset-0 bg-aurora rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
        <DiscordAvatar
          discordId={member.discordId}
          name={member.name}
          fallbackSrc={FALLBACK_AVATARS[member.discordId]}
          className="relative w-28 h-28 rounded-full object-cover ring-2 ring-primary/40 group-hover:scale-105 transition-transform duration-500"
          emojiClassName="relative w-28 h-28 rounded-full text-5xl ring-2 ring-primary/40 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="mt-5 font-display font-semibold text-lg">{member.name}</h3>
      <p className="text-sm text-primary font-medium">{member.role}</p>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
      <div className="mt-5 flex justify-center gap-2">
        <a href={member.socials.github} className="liquid-glass h-9 w-9 rounded-full grid place-items-center hover:scale-110 transition-transform">
          <Github className="h-4 w-4" />
        </a>
        <a href={member.socials.twitter} className="liquid-glass h-9 w-9 rounded-full grid place-items-center hover:scale-110 transition-transform">
          <Twitter className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};

export const TeamShowcase = () => {
  return (
    <section className="container max-w-6xl py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Developers</span>
        <SplitTextReveal
          as="h2"
          text="Built by a tiny, obsessed team"
          className="mt-3 font-display font-bold text-4xl md:text-5xl tracking-tight"
        />
        <p className="mt-4 text-muted-foreground">
          The humans behind {siteConfig.bot.name}. Designers, engineers, dreamers.
        </p>
      </motion.div>

      <div className="mt-14 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {siteConfig.team.map((m, i) => (
          <TeamMemberCard key={m.name} member={m} index={i} />
        ))}
      </div>
    </section>
  );
};
