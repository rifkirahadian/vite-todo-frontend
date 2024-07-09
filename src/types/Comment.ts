import { User } from "./User";

export interface Comment {
  id: number;
  comment: string;
  user: User;
  createdAt: string;
}
