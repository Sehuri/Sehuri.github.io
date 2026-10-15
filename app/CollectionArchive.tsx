"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { IconArrowDown } from "@tabler/icons-react";
import { currentSearchTarget, gardenDeepLinkEvent } from "./deepLinks";
export default function CollectionArchive({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const reveal = (id: string) => {
      const target = document.getElementById(id);
      if (ref.current && target && ref.current.contains(target)) ref.current.open = true;
    };
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (link?.hash) reveal(decodeURIComponent(link.hash.slice(1)));
    };
    const onHash = () => reveal(currentSearchTarget());
    const onDeepLink = (event: Event) => reveal((event as CustomEvent<string>).detail);
    reveal(currentSearchTarget());
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);
    window.addEventListener(gardenDeepLinkEvent, onDeepLink);
    return () => { document.removeEventListener("click", onClick, true); window.removeEventListener("hashchange", onHash); window.removeEventListener(gardenDeepLinkEvent, onDeepLink); };
  }, []);
  return <details className="collection-archive" id="collections" ref={ref}><summary><span><small>A LITTLE FURTHER INTO THE GARDEN</small><strong>继续走走，翻看全部收藏</strong></span><IconArrowDown size={22} stroke={1.25} /></summary><div className="collection-archive-content">{children}</div></details>;
}
