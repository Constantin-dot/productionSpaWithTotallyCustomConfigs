export type ModsType = Record<string, boolean | string | undefined>;

export function classNames(
  cls: string,
  mods: ModsType = {},
  additional: Array<string | undefined> = [],
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}
