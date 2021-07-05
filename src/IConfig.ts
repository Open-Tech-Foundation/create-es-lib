export default interface IConfig {
  libName: string;
  libType: string;
  ts: boolean;
  pkgManager: string;
  pkgScope: string;
  authorFullName: string;
  authorEmail: string;
  lic: string | null;
  year: number;
}
