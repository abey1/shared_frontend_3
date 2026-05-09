import {
  Circle,
  CircleDot,
  Drill,
  HardHat,
  Layers,
  PanelsTopLeft,
  Wrench,
} from "lucide-react";

/**
 * Whitelist pattern: only icons referenced here ship in the client bundle.
 * To add a category icon from JSON, import it above and register it in MENU_ICONS.
 */
const MENU_ICONS = {
  Drill,
  CircleDot,
  PanelsTopLeft,
  Circle,
  Wrench,
  HardHat,
  Layers,
};

export function getMenuIcon(name) {
  if (!name || !(name in MENU_ICONS)) return null;
  return MENU_ICONS[name];
}
