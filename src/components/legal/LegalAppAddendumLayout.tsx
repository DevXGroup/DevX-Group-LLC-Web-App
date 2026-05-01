import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * LegalAppAddendumLayout — server-rendered layout for per-app privacy /
 * terms addenda. Designed for Apple App Store reviewers and end users:
 * fast (no client bundle), semantic HTML, scannable, dense.
 *
 * Visual language matches the existing dark + emerald aesthetic of
 * /privacy and /terms but skips the heavy Framer Motion treatment because
 * legal text needs to be readable, not theatrical.
 */

export type LegalSection = {
  /** Stable id used as anchor (#1, #2, ...) */
  id: string
  /** Display number, e.g. "1" or "A.3" */
  number: string
  title: string
  /** Optional intro paragraphs (rendered above tables/lists) */
  paragraphs?: ReactNode[]
  /** Optional bulleted list, label/body pairs */
  bullets?: { label?: string; body: ReactNode }[]
  /** Optional two-column table */
  table?: {
    headers: [string, string] | [string, string, string]
    rows: ReactNode[][]
  }
  /** Free-form trailing content if a section needs a one-off layout */
  trailing?: ReactNode
}

export type LegalAppAddendumLayoutProps = {
  /** App display name, e.g. "Nutrify.AI" */
  appName: string
  /** Document kind, e.g. "Privacy Policy" or "Terms of Service" */
  documentKind: string
  /** ISO-ish date, e.g. "May 1, 2026" */
  effectiveDate: string
  lastUpdated: string
  /** One-paragraph TL;DR shown above the section list */
  summary: ReactNode
  /** App home URL on the site, e.g. "/portfolio/nutrify-ai" */
  appHomeHref: string
  /** Corporate-policy URL, e.g. "/privacy" or "/terms" */
  corporatePolicyHref: string
  /** Other-document URL for this same app, e.g. terms link from privacy page */
  siblingDocumentHref: string
  siblingDocumentLabel: string
  contactEmail: string
  sections: LegalSection[]
}

const ContainerHeader = ({
  appName,
  documentKind,
  effectiveDate,
  lastUpdated,
  summary,
  appHomeHref,
}: Pick<
  LegalAppAddendumLayoutProps,
  'appName' | 'documentKind' | 'effectiveDate' | 'lastUpdated' | 'summary' | 'appHomeHref'
>) => (
  <header className="border-b border-white/5 pb-12 mb-12">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/90 mb-4">
      {appName} · {documentKind}
    </p>
    <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-6 max-w-3xl">
      {documentKind} for {appName}
    </h1>
    <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-400 mb-8 max-w-2xl">
      <div>
        <span className="block text-slate-500 uppercase tracking-wide text-[10px] font-semibold">
          Effective
        </span>
        <span className="text-slate-300">{effectiveDate}</span>
      </div>
      <div>
        <span className="block text-slate-500 uppercase tracking-wide text-[10px] font-semibold">
          Last updated
        </span>
        <span className="text-slate-300">{lastUpdated}</span>
      </div>
      <div>
        <span className="block text-slate-500 uppercase tracking-wide text-[10px] font-semibold">
          App
        </span>
        <Link
          href={appHomeHref}
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          {appName}
        </Link>
      </div>
    </div>
    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.04] p-6 max-w-3xl text-slate-300 text-base leading-relaxed">
      {summary}
    </div>
  </header>
)

const SectionBlock = ({ section }: { section: LegalSection }) => (
  <section id={section.id} className="scroll-mt-24 mb-16">
    <header className="flex items-baseline gap-4 mb-6">
      <span className="text-emerald-400/60 font-mono text-sm">§{section.number}</span>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight max-w-3xl">
        {section.title}
      </h2>
    </header>

    {section.paragraphs && (
      <div className="space-y-4 text-slate-300/90 text-base leading-relaxed max-w-3xl">
        {section.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    )}

    {section.bullets && (
      <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 max-w-3xl">
        <ul className="space-y-3">
          {section.bullets.map((b, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-slate-300 leading-relaxed"
            >
              {b.label && (
                <span className="text-xs font-semibold uppercase tracking-wide text-emerald-400/90 sm:w-44 sm:flex-none sm:pt-1">
                  {b.label}
                </span>
              )}
              <span className="flex-1">{b.body}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {section.table && (
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 max-w-4xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/[0.04] text-slate-400 uppercase text-[11px] tracking-wide">
            <tr>
              {section.table.headers.map((h) => (
                <th key={h} className="px-4 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {section.table.rows.map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 align-top leading-relaxed">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {section.trailing && <div className="mt-6 max-w-3xl">{section.trailing}</div>}
  </section>
)

const ContainerFooter = ({
  appName,
  documentKind,
  corporatePolicyHref,
  siblingDocumentHref,
  siblingDocumentLabel,
  contactEmail,
}: Pick<
  LegalAppAddendumLayoutProps,
  | 'appName'
  | 'documentKind'
  | 'corporatePolicyHref'
  | 'siblingDocumentHref'
  | 'siblingDocumentLabel'
  | 'contactEmail'
>) => (
  <footer className="border-t border-white/5 pt-12 mt-12 max-w-3xl">
    <h3 className="text-lg font-semibold text-white mb-3">Related</h3>
    <ul className="space-y-2 text-sm text-slate-400">
      <li>
        <Link
          href={corporatePolicyHref}
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          ↑ DevX Group corporate {documentKind}
        </Link>{' '}
        — the parent document this addendum extends.
      </li>
      <li>
        <Link
          href={siblingDocumentHref}
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          → {appName} {siblingDocumentLabel}
        </Link>
      </li>
      <li>
        Questions:{' '}
        <a
          href={`mailto:${contactEmail}`}
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          {contactEmail}
        </a>
      </li>
    </ul>
    <p className="text-xs text-slate-500 mt-8">
      © {new Date().getFullYear()} DevX Group LLC. All rights reserved.
    </p>
  </footer>
)

export default function LegalAppAddendumLayout(props: LegalAppAddendumLayoutProps) {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-slate-200">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 py-20 sm:py-24">
        <ContainerHeader
          appName={props.appName}
          documentKind={props.documentKind}
          effectiveDate={props.effectiveDate}
          lastUpdated={props.lastUpdated}
          summary={props.summary}
          appHomeHref={props.appHomeHref}
        />
        <nav aria-label="Table of contents" className="mb-16 max-w-3xl">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
            Contents
          </h2>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {props.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-slate-300 hover:text-emerald-400 transition-colors flex gap-3"
                >
                  <span className="text-emerald-400/50 font-mono">§{s.number}</span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div>
          {props.sections.map((s) => (
            <SectionBlock key={s.id} section={s} />
          ))}
        </div>
        <ContainerFooter
          appName={props.appName}
          documentKind={props.documentKind}
          corporatePolicyHref={props.corporatePolicyHref}
          siblingDocumentHref={props.siblingDocumentHref}
          siblingDocumentLabel={props.siblingDocumentLabel}
          contactEmail={props.contactEmail}
        />
      </div>
    </main>
  )
}
