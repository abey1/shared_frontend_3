/**
 * Sample catalog for a tool rental marketplace (JSON-serializable).
 * Demonstrates 4 levels: Department → Family → Sub-family → SKU-style leaf (still navigable).
 */
export const toolRentalMenuData = [
  {
    id: "power-tools",
    label: "Power Tools",
    icon: "Drill",
    href: "/rent/power-tools",
    featured: [
      {
        id: "ft-cordless-kit",
        title: "Pro Cordless Combo",
        description: "2 batteries · contractor daily rate",
        imageUrl:
          "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80",
        href: "/rent/featured/cordless-combo",
        badge: "Popular",
      },
      {
        id: "ft-demo-hammer",
        title: "Demo Hammer Package",
        description: "Chisel set included · weekend special",
        imageUrl:
          "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=400&q=80",
        href: "/rent/featured/demo-hammer",
        badge: "Save 15%",
      },
    ],
    children: [
      {
        id: "drills",
        label: "Drills",
        icon: "CircleDot",
        href: "/rent/power-tools/drills",
        children: [
          {
            id: "cordless-drills",
            label: "Cordless Drills",
            href: "/rent/power-tools/drills/cordless",
            children: [
              { id: "cd-18v-compact", label: "18V Compact", href: "/rent/.../18v-compact" },
              { id: "cd-18v-hammer", label: "18V Hammer / Drill", href: "/rent/.../18v-hammer" },
              { id: "cd-36v-heavy", label: "36V Heavy Duty", href: "/rent/.../36v" },
            ],
          },
          {
            id: "hammer-drills",
            label: "Hammer Drills",
            href: "/rent/power-tools/drills/hammer",
            children: [
              { id: "hd-sds-plus", label: "SDS-Plus", href: "/rent/.../sds-plus" },
              { id: "hd-sds-max", label: "SDS-Max", href: "/rent/.../sds-max" },
              { id: "hd-rotary", label: "Large Rotary", href: "/rent/.../rotary" },
            ],
          },
        ],
      },
      {
        id: "saws",
        label: "Saws",
        icon: "PanelsTopLeft",
        href: "/rent/power-tools/saws",
        children: [
          {
            id: "circular-saws",
            label: "Circular Saws",
            href: "/rent/power-tools/saws/circular",
            children: [
              { id: "cs-worm", label: "Worm Drive", href: "/rent/.../worm" },
              { id: "cs-cordless", label: "Cordless 7-1/4\"", href: "/rent/.../cordless-circular" },
            ],
          },
          {
            id: "recip-saws",
            label: "Reciprocating Saws",
            href: "/rent/power-tools/saws/recip",
            children: [
              { id: "rs-standard", label: "Standard", href: "/rent/.../recip-standard" },
              { id: "rs-compact", label: "Compact", href: "/rent/.../recip-compact" },
            ],
          },
        ],
      },
      {
        id: "grinders",
        label: "Grinders",
        icon: "Circle",
        href: "/rent/power-tools/grinders",
        children: [
          {
            id: "angle-grinders",
            label: "Angle Grinders",
            href: "/rent/power-tools/grinders/angle",
            children: [
              { id: "ag-4in", label: "4-1/2\"", href: "/rent/.../4p5" },
              { id: "ag-7in", label: "7\"", href: "/rent/.../7" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "hand-tools",
    label: "Hand Tools",
    icon: "Wrench",
    href: "/rent/hand",
    featured: [
      {
        id: "ft-measure-bundle",
        title: "Measure & Layout Kit",
        description: "Laser + tape + chalk — field ready",
        imageUrl:
          "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=400&q=80",
        href: "/rent/featured/measure-kit",
      },
    ],
    children: [
      {
        id: "wrenches",
        label: "Wrenches",
        href: "/rent/hand/wrenches",
        children: [
          {
            id: "combo-wrench",
            label: "Combination Sets",
            href: "/rent/hand/wrenches/combo",
            children: [
              { id: "cw-metric", label: "Metric", href: "/rent/.../metric" },
              { id: "cw-sae", label: "SAE", href: "/rent/.../sae" },
            ],
          },
          {
            id: "torque",
            label: "Torque Wrenches",
            href: "/rent/hand/wrenches/torque",
            children: [
              { id: "tw-digital", label: "Digital", href: "/rent/.../digital" },
              { id: "tw-beam", label: "Beam Style", href: "/rent/.../beam" },
            ],
          },
        ],
      },
      {
        id: "pliers",
        label: "Pliers",
        href: "/rent/hand/pliers",
        children: [
          {
            id: "linesman",
            label: "Linesman / Side",
            href: "/rent/hand/pliers/linesman",
            children: [{ id: "ln-insulated", label: "Insulated", href: "/rent/.../insulated" }],
          },
          {
            id: "locking",
            label: "Locking Pliers",
            href: "/rent/hand/pliers/locking",
            children: [{ id: "lk-curve", label: "Curved Jaw", href: "/rent/.../curved" }],
          },
        ],
      },
      {
        id: "screwdrivers",
        label: "Screwdrivers",
        href: "/rent/hand/screwdrivers",
        children: [
          {
            id: "multi-bit",
            label: "Multi-bit Drivers",
            href: "/rent/hand/screwdrivers/multi-bit",
            children: [
              { id: "mb-precision", label: "Precision", href: "/rent/.../precision" },
              { id: "mb-impact", label: "Impact Rated", href: "/rent/.../impact" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "safety",
    label: "Safety Equipment",
    icon: "HardHat",
    href: "/rent/safety",
    children: [
      {
        id: "helmets",
        label: "Helmets",
        href: "/rent/safety/helmets",
        children: [
          {
            id: "type1",
            label: "Type I / Front",
            href: "/rent/safety/helmets/type1",
            children: [
              { id: "h-vented", label: "Vented", href: "/rent/.../vented" },
              { id: "h-nonvent", label: "Non-vented", href: "/rent/.../nonvented" },
            ],
          },
        ],
      },
      {
        id: "gloves",
        label: "Gloves",
        href: "/rent/safety/gloves",
        children: [
          {
            id: "cut-resistant",
            label: "Cut Resistant",
            href: "/rent/safety/gloves/cut",
            children: [
              { id: "g-a2", label: "ANSI A2", href: "/rent/.../a2" },
              { id: "g-a5", label: "ANSI A5", href: "/rent/.../a5" },
            ],
          },
        ],
      },
      {
        id: "glasses",
        label: "Glasses",
        href: "/rent/safety/glasses",
        children: [
          {
            id: "clear",
            label: "Clear Lens",
            href: "/rent/safety/glasses/clear",
            children: [
              { id: "gc-otg", label: "Over-the-glass", href: "/rent/.../otg" },
              { id: "gc-anti-fog", label: "Anti-fog", href: "/rent/.../antifog" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ladders-lift",
    label: "Ladders & Lift",
    icon: "Layers",
    href: "/rent/lift",
    children: [
      {
        id: "extension",
        label: "Extension Ladders",
        href: "/rent/lift/extension",
        children: [
          {
            id: "fiberglass",
            label: "Fiberglass",
            href: "/rent/lift/extension/fiberglass",
            children: [
              { id: "fg-20", label: "20 ft", href: "/rent/.../20" },
              { id: "fg-24", label: "24 ft", href: "/rent/.../24" },
            ],
          },
        ],
      },
      {
        id: "scissor-lift",
        label: "Scissor Lifts",
        href: "/rent/lift/scissor",
        children: [
          {
            id: "sl-indoor",
            label: "Indoor Electric",
            href: "/rent/lift/scissor/indoor",
            children: [
              { id: "sl-19", label: "19 ft Platform", href: "/rent/.../19" },
              { id: "sl-26", label: "26 ft Platform", href: "/rent/.../26" },
            ],
          },
        ],
      },
    ],
  },
];
