export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  status: 'todo' | 'inprogress' | 'done';
}
