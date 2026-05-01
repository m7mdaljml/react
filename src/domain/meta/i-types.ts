export type THashMap = {
  en: string;
  ar: string;
};

export type AppRoute = {
  path?: string;
  index?: boolean;
  handle?: { label?: THashMap };
  children?: AppRoute[];
};
