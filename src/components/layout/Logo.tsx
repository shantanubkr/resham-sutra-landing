import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-16 w-auto sm:h-[4.5rem]" }: LogoProps) {
  return (
    <Image
      src="/logos/reshamsutra-logo.png"
      alt="Resham Sutra"
      width={1122}
      height={693}
      className={className}
      priority
    />
  );
}

export function LogoLink({ className }: LogoProps) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center">
      <Logo className={className} />
    </Link>
  );
}
