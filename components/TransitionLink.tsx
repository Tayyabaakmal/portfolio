"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { curtain } from "@/lib/transition";

type Props = React.ComponentProps<typeof Link> & { href: string };

export default function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...rest}
      onClick={async (e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        const [path, hash] = href.split("#");
        const samePage = (path === "" || path === pathname) && pathname === (path || pathname);
        if (samePage) {
          if (hash && window.__lenis) { e.preventDefault(); window.__lenis.scrollTo(`#${hash}`); }
          return;
        }
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !curtain.cover) return;
        e.preventDefault();
        await curtain.cover();
        router.push(href);
      }}
    >
      {children}
    </Link>
  );
}
