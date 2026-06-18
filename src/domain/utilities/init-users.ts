import { UserGenderEnum } from "../meta/enums/tasks-board/user-gender";
import type { IUser } from "../meta/i-user";
import { uid } from "./uid";

export const initializeUsers = () => {
  const storedUsers = localStorage.getItem("users");

  if (storedUsers) return JSON.parse(storedUsers) as IUser[];

  const users: IUser[] = [
    {
      id: uid(),
      name: "Mohammad Aljamal",
      age: 28,
      email: "mo@example.com",
      phone: 1234567890,
      image: "https://i.pravatar.cc/150?img=1",
      gender: UserGenderEnum.Male,
      jobTitle: "Software Engineer",
    },
    {
      id: uid(),
      name: "Yamen Aljamal",
      age: 24,
      email: "ya@example.com",
      phone: 1234567891,
      image: "https://i.pravatar.cc/150?img=2",
      gender: UserGenderEnum.Female,
      jobTitle: "Software Engineer",
    },
    {
      id: uid(),
      name: "Majdy Aljamal",
      age: 32,
      email: "ma@example.com",
      phone: 1234567892,
      image: "https://i.pravatar.cc/150?img=3",
      gender: UserGenderEnum.Male,
      jobTitle: "Software Engineer",
    },
    {
      id: uid(),
      name: "Ahmad Aljamal",
      age: 26,
      email: "ah@example.com",
      phone: 1234567893,
      image: "https://i.pravatar.cc/150?img=4",
      gender: UserGenderEnum.Female,
      jobTitle: "Software Engineer",
    },
    {
      id: uid(),
      name: "Sophia",
      age: 30,
      email: "so@example.com",
      phone: 1234567894,
      image: "https://i.pravatar.cc/150?img=5",
      gender: UserGenderEnum.Female,
      jobTitle: "Software Engineer",
    },
  ];

  localStorage.setItem("users", JSON.stringify(users));

  return users;
};
