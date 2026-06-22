import type { Role } from "@/types/domain";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

const createdAt = new Date();

export const demoUsers: DemoUser[] = [
  {
    id: "demo-admin-1",
    name: "Admin Demo",
    email: "admin@demo.local",
    password: "Admin123!",
    role: "ADMIN",
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: "demo-customer-1",
    name: "Client Demo",
    email: "client@demo.local",
    password: "Client123!",
    role: "CUSTOMER",
    createdAt,
    updatedAt: createdAt,
  },
];

export function findDemoUserByCredentials(email: string, password: string) {
  return demoUsers.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
  );
}
