// Items with a `src` render as a logo; items without render as a text pill.
export type PressItem = { label: string; src?: string; width?: number; height?: number };

const items: PressItem[] = [
  { label: "Tiny Health report import" },
  { label: "Zoom sessions" },
  { label: "Booking links" },
  { label: "Email delivery" },
  { label: "PDF guides" },
];

export const press = {
  caption: "Works with the tools you already use:",
  items,
};
