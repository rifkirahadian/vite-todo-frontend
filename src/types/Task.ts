import { User } from "./User";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate?: string;
  status: string;
  userAssignee?: User;
}
