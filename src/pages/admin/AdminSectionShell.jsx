/**
 * Shared admin main-area chrome: padding, heading, optional lead text, then children.
 */
export default function AdminSectionShell({ title, subtitle, children }) {
  return (
    <div className="flex min-h-full flex-col p-6 md:p-10">
      <h1 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-2 max-w-xl text-sm text-text-secondary md:text-base">
          {subtitle}
        </p>
      ) : null}
      {children ? <div className="mt-8 flex flex-1 flex-col">{children}</div> : null}
    </div>
  );
}
