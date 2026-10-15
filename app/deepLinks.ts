export const gardenDeepLinkEvent = "shenhuili:deep-link";

export function searchTargetId(prefix: string, value: string) {
  const slug = value
    .normalize("NFKC")
    .toLocaleLowerCase("zh-CN")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return `${prefix}-${slug}`;
}

export function currentSearchTarget() {
  if (typeof window === "undefined") return "";
  return decodeURIComponent(window.location.hash.replace(/^#/, ""));
}

export function revealSearchTarget(targetId: string) {
  window.setTimeout(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    for (let parent = target.parentElement; parent; parent = parent.parentElement) {
      if (parent instanceof HTMLDetailsElement) parent.open = true;
    }
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.focus({ preventScroll: true });
  }, 120);
}
