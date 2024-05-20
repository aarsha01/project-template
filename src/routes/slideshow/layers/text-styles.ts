export type TextStyles = {
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  lineHeight: string;
};

export const normalTextStyles = {
  fontSize: 40,
  fontFamily: "Poppins",
  fontWeight: 700,
  lineHeight: "1.5",
} satisfies TextStyles;

export const titleTextStyles = {
  fontSize: 72,
  fontFamily: "Arvo",
  fontWeight: 700,
  lineHeight: "1.5",
} satisfies TextStyles;
