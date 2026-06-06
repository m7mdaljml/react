import type { TaskPriorityEnum } from "./enums/tasks-board/priority";
import type { TaskStatusEnum } from "./enums/tasks-board/status";

interface ITask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  estimatedTime: number;
  priority: TaskPriorityEnum;
  status: TaskStatusEnum;
  startDate: Date;
  endDate: Date;
}

export type { ITask };
``;
