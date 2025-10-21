// Georgian-English transliteration utilities

const enToKaMap: Record<string, string> = {
  q: "ქ",
  w: "წ",
  e: "ე",
  r: "რ",
  t: "ტ",
  y: "ყ",
  u: "უ",
  i: "ი",
  o: "ო",
  p: "პ",
  a: "ა",
  s: "ს",
  d: "დ",
  f: "ფ",
  g: "გ",
  h: "ჰ",
  j: "ჯ",
  k: "კ",
  l: "ლ",
  z: "ზ",
  x: "ხ",
  c: "ც",
  v: "ვ",
  b: "ბ",
  n: "ნ",
  m: "მ",
  Q: "ღ",
  W: "ჭ",
  E: "ე",
  R: "ღ",
  T: "თ",
  Y: "ყ",
  U: "უ",
  I: "ი",
  O: "ო",
  P: "პ",
  A: "ა",
  S: "შ",
  D: "დ",
  F: "ფ",
  G: "გ",
  H: "ჰ",
  J: "ჟ",
  K: "კ",
  L: "ლ",
  Z: "ძ",
  X: "ხ",
  C: "ჩ",
  V: "ვ",
  B: "ბ",
  N: "ნ",
  M: "მ",
};

// Create reverse map for Georgian to English
const kaToEnMap: Record<string, string> = {};
Object.entries(enToKaMap).forEach(([en, ka]) => {
  kaToEnMap[ka] = en.toLowerCase();
});

export const transliterateToGeorgian = (text: string): string => {
  return text
    .split("")
    .map((char) => enToKaMap[char] || char)
    .join("");
};

export const transliterateToEnglish = (text: string): string => {
  return text
    .split("")
    .map((char) => kaToEnMap[char] || char)
    .join("");
};
