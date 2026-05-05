export type THashMap = {
  en: string;
  ar: string;
};

export type TAppRoute = {
  path?: string;
  index?: boolean;
  handle?: { label?: THashMap };
  children?: TAppRoute[];
};

export type TTask = {
  text: string;
  date: string;
  done: boolean;
};

export type TTodoFilter = {
  sort: string;
  taskText: string;
  done: string;
  taskDate: string;
};
