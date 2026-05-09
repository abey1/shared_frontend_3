/**
 * Desktop mega menu: full-width sheet under the header with columns expanding
 * left → right (retail flyout). Opens with horizontal motion, not a small dropdown.
 */
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Search, X } from "lucide-react";
import { getMenuIcon } from "./iconMap.js";

/** Root column + up to four child tiers — each tier is its own column to the right. */
const LEVEL_COLUMN_COUNT = 5;

/** Every node with breadcrumb + index path for search and “jump to” navigation. */
function flattenCategoriesWithPaths(roots) {
  const rows = [];
  function walk(nodes, pathIndices, labels) {
    if (!nodes?.length) return;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const pathIndicesNext = [...pathIndices, i];
      const labelsNext = [...labels, node.label];
      rows.push({
        id: node.id,
        label: node.label,
        href: node.href,
        pathIndices: pathIndicesNext,
        breadcrumb: labelsNext.join(" › "),
        searchBlob: labelsNext.join(" ").toLowerCase(),
      });
      if (node.children?.length) walk(node.children, pathIndicesNext, labelsNext);
    }
  }
  walk(roots, [], []);
  return rows;
}

/**
 * Score how well a menu row matches the query (higher = better).
 * Tie-break: exact/prefix matches prefer deeper paths; fuzzy substring prefers shallower paths
 * so "pliers" lands on the parent "Pliers" row before "Locking Pliers".
 */
function scoreRowMatch(row, q) {
  const qn = q.trim().toLowerCase();
  if (!qn) return -1;
  const lab = row.label.toLowerCase();
  if (lab === qn) return 100;
  if (lab.startsWith(qn)) return 85;
  if (lab.includes(qn)) return 70;
  const tokens = row.searchBlob.split(/\s+/).filter(Boolean);
  if (tokens.some((t) => t === qn || t.startsWith(qn))) return 55;
  if (row.searchBlob.includes(qn)) return 40;
  return 0;
}

function pickBestPathForQuery(rows, rawQuery) {
  const q = rawQuery.trim();
  if (!q) return null;
  let best = null;
  let bestScore = -1;
  let bestDepth = 0;
  for (const row of rows) {
    const s = scoreRowMatch(row, q);
    if (s <= 0) continue;
    const depth = row.pathIndices.length;
    if (s > bestScore) {
      best = row;
      bestScore = s;
      bestDepth = depth;
    } else if (best && s === bestScore) {
      if (bestScore >= 80) {
        if (depth > bestDepth) {
          best = row;
          bestDepth = depth;
        }
      } else if (depth < bestDepth) {
        best = row;
        bestDepth = depth;
      }
    }
  }
  return best ? best.pathIndices : null;
}

function getRowForPath(rows, pathIndices) {
  return rows.find(
    (r) =>
      r.pathIndices.length === pathIndices.length &&
      r.pathIndices.every((v, i) => v === pathIndices[i]),
  );
}

function getNodeAtPath(roots, path) {
  let list = roots;
  let node;
  for (let depth = 0; depth < path.length; depth++) {
    node = list[path[depth]];
    if (!node) return null;
    list = node.children ?? [];
  }
  return node ?? null;
}

/** col 0 = top-level departments; col 1 = Drills/Saws/Grinders; col 2+ = deeper levels. */
function getColumnItems(roots, path, col) {
  if (col === 0) return roots;
  const parent = getNodeAtPath(roots, path.slice(0, col));
  return parent?.children ?? [];
}

function useMegaMenuIds() {
  const uid = useId();
  return {
    triggerId: `${uid}-trigger`,
    panelId: `${uid}-panel`,
    searchFieldId: `${uid}-menu-search`,
  };
}

/** True if focus moved into the trigger or the fixed panel. */
function staysInMenuSurface(relatedTarget, triggerEl, panelEl) {
  if (!relatedTarget || !(relatedTarget instanceof Node)) return false;
  if (triggerEl?.contains(relatedTarget)) return true;
  if (panelEl?.contains(relatedTarget)) return true;
  return false;
}

export function MegaMenu({
  categories,
  triggerLabel = "Shop by category",
  triggerClassName,
  panelMaxHeightClass = "max-h-[min(72vh,580px)]",
  className = "",
}) {
  const { triggerId, panelId, searchFieldId } = useMegaMenuIds();
  const [open, setOpen] = useState(false);
  const [hoverPath, setHoverPath] = useState([]);
  const [menuSearch, setMenuSearch] = useState("");
  const [panelTop, setPanelTop] = useState(0);
  const closeTimer = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const menuSearchRef = useRef("");
  const [searchJumpMessage, setSearchJumpMessage] = useState("");

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setHoverPath([]);
      setMenuSearch("");
      setSearchJumpMessage("");
    }, 180);
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
    setHoverPath((p) => (p.length > 0 ? p : [0]));
  };

  const onTriggerEnter = () => {
    openMenu();
  };

  const onSurfaceEnter = () => {
    clearCloseTimer();
  };

  const activeRoot = hoverPath.length ? categories[hoverPath[0]] : null;
  const featured = activeRoot?.featured;

  /** One array slot per vertical column: roots, then each nested level. */
  const levelColumns = useMemo(() => {
    const cols = [];
    for (let c = 0; c < LEVEL_COLUMN_COUNT; c++) {
      cols.push(getColumnItems(categories, hoverPath, c));
    }
    return cols;
  }, [categories, hoverPath]);

  const flatSearchRows = useMemo(
    () => flattenCategoriesWithPaths(categories),
    [categories],
  );

  useEffect(() => {
    menuSearchRef.current = menuSearch;
  }, [menuSearch]);

  /**
   * After the user pauses typing, snap column navigation to the best-matching branch
   * (e.g. "pliers" → Hand Tools › Pliers) without replacing the flyout with a result list.
   */
  useEffect(() => {
    if (!open) return;
    const q = menuSearch.trim();
    const id = window.setTimeout(() => {
      if (!q) {
        setSearchJumpMessage("");
        return;
      }
      const path = pickBestPathForQuery(flatSearchRows, q);
      if (path && path.length) {
        setHoverPath(path);
        const hit = getRowForPath(flatSearchRows, path);
        setSearchJumpMessage(hit ? `Menu opened to ${hit.breadcrumb}` : "");
      } else {
        setSearchJumpMessage(`No category match for ${q}`);
      }
    }, 220);
    return () => window.clearTimeout(id);
  }, [menuSearch, open, flatSearchRows]);

  /** Pin sheet under header while open (sticky-safe). */
  const updatePanelPosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    setPanelTop(el.getBoundingClientRect().bottom);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePanelPosition();
    const onScrollOrResize = () => updatePanelPosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updatePanelPosition]);

  useEffect(() => {
    setHoverPath((prev) => {
      let list = categories;
      const next = [];
      for (let depth = 0; depth < prev.length; depth++) {
        const idx = prev[depth];
        if (idx < 0 || idx >= list.length) break;
        next.push(idx);
        list = list[idx].children ?? [];
        if (!list.length) break;
      }
      return next;
    });
  }, [categories]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      if (menuSearchRef.current.trim()) {
        setMenuSearch("");
        setSearchJumpMessage("");
        return;
      }
      setOpen(false);
      setHoverPath([]);
      setMenuSearch("");
      setSearchJumpMessage("");
      triggerRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const focusFirstMenuItem = useCallback(() => {
    panelRef.current?.querySelector('[role="menuitem"]')?.focus();
  }, []);

  const onTriggerKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      setHoverPath((p) => (p.length > 0 ? p : [0]));
      requestAnimationFrame(focusFirstMenuItem);
    }
  };

  /** col is 0-based level index (0 = departments, 1 = Drills/Saws/…, …). */
  const onItemKeyDown = (e, col, rowIndex, hasChildren) => {
    if (e.key === "ArrowRight" && hasChildren) {
      e.preventDefault();
      setHoverPath((p) => [...p.slice(0, col), rowIndex]);
      return;
    }
    if (e.key === "ArrowLeft" && col > 0) {
      e.preventDefault();
      setHoverPath((p) => p.slice(0, col));
    }
  };

  const onRailKeyDown = (e, rowIndex) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setHoverPath([rowIndex]);
      requestAnimationFrame(focusFirstMenuItem);
    }
  };

  const defaultTriggerClassName =
    "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white/95 outline-none ring-brand-400 transition hover:bg-white/10 focus-visible:ring-2";

  return (
    <div className={`inline-flex ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        className={triggerClassName ?? defaultTriggerClassName}
        onMouseEnter={onTriggerEnter}
        onMouseLeave={scheduleClose}
        onFocus={openMenu}
        onBlur={(ev) => {
          if (!staysInMenuSurface(ev.relatedTarget, triggerRef.current, panelRef.current)) {
            scheduleClose();
          }
        }}
        onClick={() => {
          setOpen((prev) => {
            const next = !prev;
            if (next) {
              setHoverPath((p) => (p.length > 0 ? p : [0]));
              requestAnimationFrame(focusFirstMenuItem);
            }
            return next;
          });
        }}
        onKeyDown={onTriggerKeyDown}
      >
        {triggerLabel}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="inline-block opacity-70"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="region"
            aria-label={`${triggerLabel} panel`}
            style={{ top: panelTop }}
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 right-0 z-[998] w-screen max-w-[100vw] border-t border-slate-200/90 bg-white shadow-[0_18px_40px_-12px_rgba(15,85,82,0.18)]"
            onMouseEnter={onSurfaceEnter}
            onMouseLeave={scheduleClose}
          >
            <div
              className={`mx-auto flex min-h-0 max-w-[1400px] flex-col ${panelMaxHeightClass} min-h-[320px]`}
            >
              <div className="flex shrink-0 items-center gap-3 border-b border-slate-200/90 bg-gradient-to-r from-slate-50 to-white px-4 py-3">
                <Search
                  className="pointer-events-none h-5 w-5 shrink-0 text-brand-900/45"
                  aria-hidden
                />
                <label htmlFor={searchFieldId} className="sr-only">
                  Search categories in this menu
                </label>
                <input
                  id={searchFieldId}
                  type="search"
                  role="searchbox"
                  autoComplete="off"
                  placeholder="Type to jump (e.g. pliers, drills…)"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="min-w-0 flex-1 border-0 bg-transparent py-1 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:ring-0"
                />
                {menuSearch ? (
                  <button
                    type="button"
                    className="rounded-lg p-1.5 text-slate-500 outline-none transition hover:bg-slate-200/80 hover:text-slate-800 focus-visible:ring-2 focus-visible:ring-brand-600"
                    aria-label="Clear search"
                    onClick={() => {
                      setMenuSearch("");
                      setSearchJumpMessage("");
                    }}
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                ) : null}
              </div>

              {menuSearch.trim() ? (
                <p className="sr-only" aria-live="polite">
                  {searchJumpMessage}
                </p>
              ) : null}

              <div
                className={`flex min-h-0 flex-1 flex-nowrap divide-x divide-slate-200/90 overflow-hidden`}
              >
                <aside
                      className="flex w-[3.25rem] shrink-0 flex-col items-center gap-1 border-r border-slate-200/90 bg-slate-50 py-3"
                      aria-label="Department icons"
                    >
                      {categories.map((cat, i) => {
                        const Icon = getMenuIcon(cat.icon);
                        const isRootActive = hoverPath[0] === i;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            title={cat.label}
                            aria-label={cat.label}
                            aria-current={isRootActive ? "true" : undefined}
                            className={`flex h-10 w-10 items-center justify-center rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-brand-600 ${
                              isRootActive
                                ? "bg-brand-900 text-white shadow-inner"
                                : "text-slate-600 hover:bg-white hover:text-brand-900"
                            }`}
                            onMouseEnter={() => setHoverPath([i])}
                            onFocus={() => setHoverPath([i])}
                            onKeyDown={(e) => onRailKeyDown(e, i)}
                          >
                            {Icon ? (
                              <Icon className="h-5 w-5 shrink-0" aria-hidden />
                            ) : (
                              <span className="text-xs font-bold tabular-nums">{i + 1}</span>
                            )}
                          </button>
                        );
                      })}
                    </aside>

                    <div className="flex min-h-0 min-w-0 flex-1 flex-row flex-nowrap overflow-x-auto overflow-y-hidden">
                      {levelColumns.map((items, col) => {
                        const visible = col === 0 || hoverPath.length >= col;
                        if (!visible) return null;
                        if (col > 0 && items.length === 0) return null;

                        return (
                          <motion.div
                            key={col}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            className="w-[220px] shrink-0 overflow-y-auto bg-white"
                          >
                            <div className="py-3" role="presentation">
                              <ul
                                role="menu"
                                aria-label={
                                  col === 0 ? "Departments" : `Category level ${col + 1}`
                                }
                              >
                                {items.map((item, rowIndex) => {
                                  const Icon = getMenuIcon(item.icon);
                                  const hasChildren = Boolean(
                                    item.children && item.children.length,
                                  );
                                  const isActive =
                                    col < hoverPath.length &&
                                    hoverPath[col] === rowIndex;

                                  return (
                                    <li key={item.id} role="presentation">
                                      <a
                                        role="menuitem"
                                        href={item.href ?? "#"}
                                        className={`group mx-2 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-600 ${
                                          isActive
                                            ? "bg-slate-100 font-medium text-brand-800"
                                            : "text-slate-800 hover:bg-slate-50 hover:text-brand-900"
                                        }`}
                                        onMouseEnter={() => {
                                          setHoverPath((prev) => [
                                            ...prev.slice(0, col),
                                            rowIndex,
                                          ]);
                                        }}
                                        onFocus={() => {
                                          setHoverPath((prev) => [
                                            ...prev.slice(0, col),
                                            rowIndex,
                                          ]);
                                        }}
                                        onKeyDown={(e) =>
                                          onItemKeyDown(e, col, rowIndex, hasChildren)
                                        }
                                      >
                                        {Icon ? (
                                          <Icon
                                            className={`h-4 w-4 shrink-0 ${
                                              isActive
                                                ? "text-brand-800"
                                                : "text-slate-400 group-hover:text-brand-700"
                                            }`}
                                            aria-hidden
                                          />
                                        ) : (
                                          <span className="w-4 shrink-0" />
                                        )}
                                        <span className="min-w-0 flex-1 truncate">
                                          {item.label}
                                        </span>
                                        {hasChildren && (
                                          <ChevronRight
                                            className={`h-4 w-4 shrink-0 ${
                                              isActive
                                                ? "translate-x-0.5 text-brand-800"
                                                : "text-slate-300 group-hover:translate-x-0.5 group-hover:text-brand-600"
                                            }`}
                                            aria-hidden
                                          />
                                        )}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                              {col > 0 &&
                                (() => {
                                  const parent = getNodeAtPath(
                                    categories,
                                    hoverPath.slice(0, col),
                                  );
                                  if (!parent?.href) return null;
                                  return (
                                    <a
                                      href={parent.href}
                                      className="mx-4 mt-2 block text-xs font-semibold text-brand-800 underline-offset-2 hover:underline"
                                    >
                                      View all {parent.label.toLowerCase()}
                                    </a>
                                  );
                                })()}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                <motion.aside className="hidden min-h-0 w-[min(100%,320px)] shrink-0 overflow-y-auto bg-gradient-to-b from-slate-50/90 to-white md:block lg:w-[360px]">
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-900/75">
                    Featured rentals
                  </p>
                  <AnimatePresence mode="wait">
                    {featured && featured.length > 0 ? (
                      <motion.div
                        key={activeRoot?.id ?? "none"}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.18 }}
                        className="mt-3 space-y-3"
                      >
                        {featured.map((f) => (
                          <a
                            key={f.id}
                            href={f.href}
                            className="group flex gap-3 overflow-hidden rounded-xl border border-slate-200/90 bg-white p-3 shadow-sm outline-none transition hover:border-brand-800/20 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-700"
                          >
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                              <img
                                src={f.imageUrl}
                                alt={f.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              {f.badge && (
                                <span className="mb-0.5 inline-block rounded bg-brand-900 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                                  {f.badge}
                                </span>
                              )}
                              <p className="text-sm font-semibold text-slate-900">{f.title}</p>
                              {f.description && (
                                <p className="mt-0.5 text-xs leading-snug text-slate-600">
                                  {f.description}
                                </p>
                              )}
                            </div>
                          </a>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.p
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 text-sm text-slate-600"
                      >
                        Select a department to see curated rental bundles.
                      </motion.p>
                    )}
                  </AnimatePresence>
                  </div>
                </motion.aside>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
