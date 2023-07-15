const guidRegex = /[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/i;

export function isGuid(string) {
  return guidRegex.test(string);
}
