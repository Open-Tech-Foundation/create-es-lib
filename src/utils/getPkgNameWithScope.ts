export default function getPkgNameWithScope(
  libName: string,
  scope: string | undefined
): string {
  return scope ? `@${scope}/${libName}` : libName;
}
