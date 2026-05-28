import { createContext, useContext } from "react";
import type { TAppConfig } from "../domain/meta/i-types";

const ConfigContext = createContext<TAppConfig | null>(null);

export const useConfig = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error("ConfigProvider missing");
  return ctx;
};

export default ConfigContext;
