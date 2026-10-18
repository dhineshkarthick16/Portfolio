import type { MDXComponents } from "mdx/types";
import { VlffLiveReport } from "@/components/blog/VlffLiveReport";
import { CadenceDocCard } from "@/components/blog/CadenceDocCard";

export const mdxComponents: MDXComponents = {
  VlffLiveReport: () => <VlffLiveReport />,
  CadenceDocCard: () => <CadenceDocCard />,
  h2: (props) => <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4" {...props} />,
  h3: (props) => <h3 className="text-xl font-medium mt-8 mb-3" {...props} />,
  p: ({ children, ...props }) => {
    /**
     * MDX wraps block-level JSX (custom components, raw <div> blocks) in a
     * <p> when they appear at paragraph level in the source. A <p> that
     * contains a <div> or any custom component that itself renders block
     * content is invalid HTML and causes React hydration errors.
     *
     * Detection rules — render <div> instead of <p> when ANY child is:
     *   (a) a React element whose type is a block-level HTML tag string, OR
     *   (b) a React element whose type is a function/class (a custom component)
     *       — these always render block content in MDX paragraph context.
     */
    const isBlockChild = (child: unknown): boolean => {
      if (!child || typeof child !== "object") return false;
      if (!("type" in (child as object))) return false;
      const { type } = child as { type: unknown };
      if (typeof type === "function" || typeof type === "object") return true; // custom component
      if (typeof type === "string") {
        return /^(div|section|article|aside|blockquote|details|figure|footer|header|main|nav|summary|ul|ol|dl|pre|table|h[1-6]|hr|form|fieldset)$/.test(type);
      }
      return false;
    };

    const hasBlock = Array.isArray(children)
      ? children.some(isBlockChild)
      : isBlockChild(children);

    if (hasBlock) {
      // Use a plain <div> so block children nest legally.
      return <div className="text-base opacity-80 leading-relaxed mb-4" {...props}>{children}</div>;
    }
    return <p className="text-base opacity-80 leading-relaxed mb-4" {...props}>{children}</p>;
  },
  ul: (props) => <ul className="list-disc list-inside space-y-2 mb-4 opacity-80" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside space-y-2 mb-4 opacity-80" {...props} />,
  li: (props) => <li className="text-base" {...props} />,
  code: (props) => (
    <code className="px-1.5 py-0.5 rounded bg-white/10 text-sm font-mono" {...props} />
  ),
  pre: (props) => (
    <pre className="p-4 rounded-xl bg-white/5 border border-white/10 overflow-x-auto mb-4 text-sm" {...props} />
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-xl border border-white/10 my-6 w-full" {...props} alt={props.alt ?? ""} />
  ),
  a: (props) => (
    <a className="underline underline-offset-4 opacity-90 hover:opacity-100" {...props} />
  ),
};
