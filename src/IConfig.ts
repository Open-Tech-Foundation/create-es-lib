export default interface IConfig {
  libName: string;
  pkgName?: string;
  pkgNameWithScope?: string;
  libType: string;
  ts: boolean;
  pkgManager: string;
  pkgScope: string;
  authorFullName: string;
  authorEmail: string;
  lic: string | null;
  year: number;
  bundler: string | null;
  buildDir: string;
  testRunner: string | null;
}
