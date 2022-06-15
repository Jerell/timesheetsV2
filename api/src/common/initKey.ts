export default function initKey(
  obj: Record<string, unknown>,
  key: string,
  value: any = 0
) {
  if (!obj[key]) obj[key] = value;
}
