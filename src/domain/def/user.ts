import { UserGenderEnum } from "../meta/enums/tasks-board/user-gender";
import type { IUser } from "../meta/i-user";

class User implements IUser {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: number;
  image: string;
  gender: UserGenderEnum;
  jobTitle: string;
  constructor(
    id = "",
    name = "",
    age = 0,
    email = "",
    phone = 0,
    image = "",
    gender = null,
    jobTitle = "",
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.email = email;
    this.phone = phone;
    this.image = image;
    this.gender = gender;
    this.jobTitle = jobTitle;
  }
}

export { User };
