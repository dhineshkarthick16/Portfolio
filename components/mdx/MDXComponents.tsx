import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="text-2xl font-semibold tracking-tight mt-12 mb-4" {...props} />,
  h3: (props) => <h3 className="text-xl font-medium mt-8 mb-3" {...props} />,
  p: (props) => <p className="text-base opacity-80 leading-relaxed mb-4" {...props} />,
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
