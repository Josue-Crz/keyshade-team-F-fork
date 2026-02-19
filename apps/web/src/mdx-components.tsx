/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment -- MDXComponents parameters require any type */
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const mdxComponents: MDXComponents = {
    ...components,
    h1: ({ children }: any) => (
      <h1 className="text-brandBlue my-8 text-2xl md:text-3xl">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-brandBlue my-6 text-xl md:text-2xl">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-brandBlue my-4 text-lg md:text-xl">{children}</h3>
    ),
    p: ({ children }: any) => (
      <p className="my-4 text-sm text-white/80 md:text-base">{children}</p>
    ),
    a: ({ children, href }: any) => (
      <a className="text-brandBlue underline" href={href}>
        {children}
      </a>
    ),
    ul: ({ children }: any) => (
      <ul className="my-4 list-outside list-disc">{children}</ul>
    ),
    ol: ({ children }: any) => <ol className="my-4 list-decimal">{children}</ol>,
    li: ({ children }: any) => <li className="my-4 text-white/80">{children}</li>
  }
  return mdxComponents
}
