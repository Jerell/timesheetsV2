export default function initKey(obj: object, key: string, value: any = 0) {
  if (!obj[key]) obj[key] = value;
}
