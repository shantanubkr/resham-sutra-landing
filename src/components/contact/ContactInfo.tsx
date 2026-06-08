import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";
import { HIGHLIGHT_YELLOW, ICON_BG_CYCLE } from "@/lib/brand-styles";

const CHANNELS = [
  {
    label: "Phone",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
    hover: "hover:border-brand-green/40 hover:bg-brand-green/5",
    icon: ICON_BG_CYCLE[1],
  },
  {
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    hover: "hover:border-[#FCE900]/50 hover:bg-[#FCE900]/5",
    icon: ICON_BG_CYCLE[0],
  },
  {
    label: "WhatsApp",
    value: "Chat with us",
    href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`,
    hover: "hover:border-brand-green/40 hover:bg-brand-green/5",
    icon: ICON_BG_CYCLE[1],
  },
] as const;

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-bold tracking-wider text-brand-green uppercase">
          Get in touch
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
          Let&apos;s start a{" "}
          <span className={HIGHLIGHT_YELLOW}>conversation</span>
        </h2>
        <p className="mt-4 leading-relaxed text-[#555555]">
          Whether you represent a government body, CSR team, NGO, or want to
          explore supporting our work, tell us who you are and we will route
          your enquiry to the right person.
        </p>
      </div>

      <div className="space-y-4">
        {CHANNELS.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.label === "WhatsApp" ? "_blank" : undefined}
            rel={
              channel.label === "WhatsApp" ? "noopener noreferrer" : undefined
            }
            className={`flex items-center gap-4 rounded-xl border border-[#EEEEEE] bg-white p-4 transition-colors ${channel.hover}`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${channel.icon}`}
            >
              {channel.label.charAt(0)}
            </span>
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#555555] uppercase">
                {channel.label}
              </p>
              <p className="mt-0.5 font-medium text-[#1A1A1A]">{channel.value}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] p-5 text-sm text-[#555555]">
        <p className="font-semibold text-[#1A1A1A]">Registered office</p>
        <p className="mt-1 leading-relaxed">{CONTACT.registeredOffice}</p>
        <p className="mt-4 font-semibold text-[#1A1A1A]">Works office</p>
        <p className="mt-1 leading-relaxed">{CONTACT.worksOffice}</p>
      </div>

      <div className="rounded-xl border border-brand-purple/20 bg-brand-purple/[0.06] p-6">
        <p className="font-semibold text-[#1A1A1A]">Prefer a quick call?</p>
        <p className="mt-2 text-sm text-[#555555]">
          Our team typically responds within 2 business days. For urgent
          partnership enquiries, WhatsApp is fastest.
        </p>
        <Button
          href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
          variant="secondary"
          className="mt-4 w-full border-brand-green/30 hover:border-brand-green/50 hover:bg-brand-green/5"
        >
          Message on WhatsApp
        </Button>
      </div>
    </div>
  );
}
