import type { UserGenderEnum } from "./enums/tasks-board/user-gender";

interface IUser {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: number;
  image: string;
  gender: UserGenderEnum;
  jobTitle: string;
}

export type { IUser };
