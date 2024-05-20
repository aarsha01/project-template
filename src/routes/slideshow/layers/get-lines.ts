import { fillTextBox } from "@remotion/layout-utils";

export function getLines(
  text: string,
  maxWidth: number,
  {
    fontSize,
    fontFamily,
    fontWeight,
  }: {
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
  },
  additionalStyles: Record<string, string>
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  // console.log(words);
  const box = fillTextBox({
    maxLines: 100,
    maxBoxWidth: maxWidth,
  });
  let firstLine = true;
  for (const word of words) {
    const { newLine, exceedsBox } = box.add({
      text: word,
      validateFontIsLoaded: false,
      fontSize,
      fontFamily,
      fontWeight,
      additionalStyles,
    });
    if (newLine) {
      firstLine = false;
      console.log("currentLine", currentLine, "---newLine word", word);
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += firstLine && !currentLine ? word : ` ${word}`;
    }
    if (exceedsBox) {
      break;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}
