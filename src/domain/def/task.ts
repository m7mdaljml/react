import { TaskPriorityEnum } from "../meta/enums/tasks-board/priority";
import { TaskStatusEnum } from "../meta/enums/tasks-board/status";
import { uid } from "../utilities/uid";
import type { ITask } from "../meta/i-task";

class Task implements ITask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  estimatedTime: number;
  priority: TaskPriorityEnum;
  status: TaskStatusEnum;
  startDate: Date;
  endDate: Date;

  constructor(
    id = uid(),
    title = "",
    description = "",
    assignedTo = "",
    estimatedTime = 0,
    priority = null,
    status = TaskStatusEnum.ToDo,
    startDate = new Date(),
    endDate = new Date(),
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.assignedTo = assignedTo;
    this.estimatedTime = estimatedTime;
    this.priority = priority;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export { Task };
