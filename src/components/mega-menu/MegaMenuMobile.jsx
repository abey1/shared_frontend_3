/**
 * Mobile / narrow viewports: full-height accordion drawer with spring animation.
 * Keeps parity with desktop data while matching touch-first interaction patterns.
 */
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getMenuIcon } from "./iconMap.js";

function breadcrumbPath(nodes) {
  return nodes.map((n) => n.label).join(" › ");
}

export function MegaMenuMobile({ categories, isOpen, onClose, title = "Browse categories" }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const node = panelRef.current;
    if (!node) return;

    const focusables = () =>
      Array.from(
        node.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => focusables()[0]?.focus());

    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[1000] bg-brand-950/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            id="mobile-mega-menu"
            className="fixed bottom-0 left-0 top-0 z-[1001] flex w-[min(92vw,380px)] flex-col bg-white shadow-2xl ring-1 ring-brand-900/10"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <header className="flex items-center justify-between border-b border-slate-200/90 bg-gradient-to-r from-brand-900 to-brand-800 px-4 py-3 text-white">
              <p className="text-sm font-semibold tracking-wide">{title}</p>
              <button
                type="button"
                className="rounded-lg p-2 text-white/90 outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-200"
                onClick={onClose}
                aria-label="Close categories menu"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </header>

            <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Category navigation">
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <MobileBranch key={cat.id} node={cat} trail={[]} />
                ))}
              </ul>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileBranch({ node, trail }) {
  const chain = useMemo(() => [...trail, node], [trail, node]);
  const hasChildren = Boolean(node.children?.length);

  if (!hasChildren) {
    const Icon = getMenuIcon(node.icon);
    return (
      <li>
        <a
          href={node.href ?? "#"}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition hover:bg-brand-50 focus-visible:ring-2 focus-visible:ring-brand-600"
        >
          {Icon ? <Icon className="h-4 w-4 text-brand-800" aria-hidden /> : null}
          <span className="min-w-0 flex-1">{node.label}</span>
        </a>
      </li>
    );
  }

  return (
    <li className="rounded-xl border border-slate-200/80 bg-surface-muted/50">
      <MobileAccordionNode node={node} chain={chain} />
    </li>
  );
}

function MobileAccordionNode({ node, chain }) {
  const [open, setOpen] = useState(false);
  const Icon = getMenuIcon(node.icon);
  const hasChildren = Boolean(node.children?.length);
  const panelId = `${node.id}-panel`;
  const btnId = `${node.id}-btn`;

  return (
    <div>
      <div className="flex items-stretch gap-1">
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          className="flex flex-1 items-center gap-2 rounded-l-xl px-3 py-3 text-left text-sm font-semibold text-slate-900 outline-none transition hover:bg-white focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600"
          onClick={() => setOpen((v) => !v)}
        >
          {Icon ? <Icon className="h-4 w-4 shrink-0 text-brand-800" aria-hidden /> : null}
          <span className="min-w-0 flex-1">{node.label}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="text-slate-500"
          >
            <ChevronDown className="h-4 w-4" aria-hidden />
          </motion.span>
        </button>
        {node.href && (
          <a
            href={node.href}
            className="flex items-center rounded-r-xl border-l border-slate-200/90 px-3 text-xs font-semibold uppercase tracking-wide text-brand-800 hover:bg-white"
            aria-label={`${node.label} — view all`}
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </a>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && hasChildren && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            aria-label={breadcrumbPath(chain)}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-slate-200/60 bg-white/80"
          >
            <ul className="space-y-1 px-2 py-2">
              {node.children.map((child) => (
                <MobileBranch key={child.id} node={child} trail={chain} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
