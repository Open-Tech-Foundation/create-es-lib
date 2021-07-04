export default function getPkgName(
  libName: string,
  scope: string | undefined
): string {
  return scope ? `${scope}/${libName}` : libName;
}
