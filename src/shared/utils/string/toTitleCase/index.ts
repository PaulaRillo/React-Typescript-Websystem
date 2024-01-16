export function toTitleCase(value?: string) {
  if (!value) return '';
  if (typeof value !== 'string') return String(value);
  return value.replace(
    /\w\S*/g,
    (v) => v.charAt(0).toUpperCase() + v.substr(1).toLowerCase()
  );
}
