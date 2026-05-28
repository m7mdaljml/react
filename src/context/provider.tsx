import ConfigContext from "./context";
import type { TAppConfig } from "../domain/meta/i-types";

declare global {
  interface Window {
    appConfig?: TAppConfig;
  }
}

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const config: TAppConfig = window.appConfig!;

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};
