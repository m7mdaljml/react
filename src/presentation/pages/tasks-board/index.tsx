import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { Task } from "../../../domain/def/task";
import { initializeUsers } from "../../../domain/utilities/init-users";
import { FaFilter, FaFileExcel } from "react-icons/fa";
import type { IUser } from "../../../domain/meta/i-user";
import { exportToExcel } from "../../../domain/utilities/export-to-excel";

// Components
import FormModal from "../../components/tasks-board/form-modal";
import TaskCard from "../../components/tasks-board/task-card";
import FilterModal from "../../components/tasks-board/filter";

const TasksBoard = () => {
  const { t } = useTranslation();

  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [users, setUsers] = useState<IUser[]>(() => initializeUsers());
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const emptyFilter = {
    title: "",
    assignedTo: "",
    priority: "",
  };

  const [filters, setFilters] = useState(emptyFilter);
  const [task, setTask] = useState(new Task());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragOverColumn, setDragOverColumn] = useState<number | null>(null);

  const hasFilters = Object.values(filters).some((v) => v !== "" && v != null);

  const getFilteredTasks = (tasks: any[]) => {
    return tasks.filter((task) => {
      const matchTitle =
        !filters.title ||
        task.title.toLowerCase().includes(filters.title.toLowerCase());

      const matchAssignee =
        !filters.assignedTo || task.assignedTo === filters.assignedTo;

      const matchPriority =
        !filters.priority || task.priority === +filters.priority;

      return matchTitle && matchAssignee && matchPriority;
    });
  };

  const columns = [
    {
      id: 1,
      title: t("tasksBoard.todo"),
      color: "bg-info",
      list: getFilteredTasks(todoList),
    },
    {
      id: 2,
      title: t("tasksBoard.inProgress"),
      color: "bg-warning",
      list: getFilteredTasks(inProgressList),
    },
    {
      id: 3,
      title: t("tasksBoard.review"),
      color: "bg-primary",
      list: getFilteredTasks(reviewList),
    },
    {
      id: 4,
      title: t("tasksBoard.done"),
      color: "bg-success",
      list: getFilteredTasks(doneList),
    },
  ];

  const colsMap: any = {
    1: [todoList, setTodoList],
    2: [inProgressList, setInProgressList],
    3: [reviewList, setReviewList],
    4: [doneList, setDoneList],
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTask(new Task());
    setIsEditMode(false);
  };

  const handleSubmit = () => {
    setTodoList([...todoList, task]);
    setTask(new Task());
    closeModal();
    setFilters(emptyFilter);
    setShowToast(true);
    toast.success(`${t("tasksBoard.taskAddedSuccessfully")}`);
  };

  const handleMoveNext = (task: any, currentStage: number) => {
    if (currentStage == 4) return;
    const [currentList, setCurrentList] = colsMap[currentStage];
    const [nextList, setNextList] = colsMap[currentStage + 1];
    setCurrentList(currentList.filter((t: any) => t.id !== task.id));
    setNextList([...nextList, task]);
    setShowToast(true);
    toast.success(t("tasksBoard.taskMovedSuccessfully"));
  };

  const handleDelete = (task: any, currentStage: number) => {
    const [currentList, setCurrentList] = colsMap[currentStage];
    setCurrentList(currentList.filter((t: any) => t.id !== task.id));
    setShowToast(true);
    toast.success(t("tasksBoard.taskDeletedSuccessfully"));
  };

  const updateTask = (updatedTask: any) => {
    const update = (list: any[]) =>
      list.map((t) => (t.id === updatedTask.id ? updatedTask : t));

    setTodoList((t) => update(t));
  };

  const handleEdit = () => {
    updateTask(task);
    setShowToast(true);
    toast.success(t("tasksBoard.taskUpdatedSuccessfully"));
    setIsEditMode(false);
    setIsModalOpen(false);
    setTask(new Task());
  };

  const handleDragOver = (e: any, columnId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: any, targetStage: number) => {
    e.preventDefault();
    setDragOverColumn(null);

    const taskId = e.dataTransfer.getData("taskId");
    const sourceStage = parseInt(e.dataTransfer.getData("sourceStage"));

    if (sourceStage == targetStage) return;

    const [sourceList, setSourceList] = colsMap[sourceStage];
    const [targetList, setTargetList] = colsMap[targetStage];

    const draggedTask = sourceList.find((t: any) => t.id == taskId);
    if (!draggedTask) return;

    setSourceList(sourceList.filter((t: any) => t.id !== taskId));
    setTargetList([...targetList, draggedTask]);

    setShowToast(true);
    toast.success(t("tasksBoard.taskMovedSuccessfully"));
  };

  const handleExport = () => {
    const headers = {
      title: t("tasksBoard.taskTitle"),
      description: t("tasksBoard.taskDescription"),
      assignedTo: t("tasksBoard.assignedTo"),
      estimatedTime: t("tasksBoard.estimatedTime"),
      priority: t("tasksBoard.priority"),
    };

    const mapTask = (task: any) => {
      const assignedUser = users.find(
        (user: IUser) => user.id === task.assignedTo,
      );

      return {
        title: task.title,
        description: task.description,
        assignedTo: assignedUser?.name,
        estimatedTime: (t("tasksBoard.estimatedTimeHours") as any)(
          task.estimatedTime,
        ),
        priority: t(`enums.TaskPriorityEnum.${task.priority}`),
      };
    };

    const sheets = columns.map((col) => ({
      name: col.title,
      data: col.list.map(mapTask),
      headers,
    }));

    exportToExcel([], {
      fileName: "tasks-board",
      sheets,
    });
  };

  useEffect(() => {
    const savedBoard = localStorage.getItem("tasksBoard");

    if (savedBoard) {
      const data = JSON.parse(savedBoard);

      setTodoList(data.todoList || []);
      setInProgressList(data.inProgressList || []);
      setReviewList(data.reviewList || []);
      setDoneList(data.doneList || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "tasksBoard",
      JSON.stringify({
        todoList,
        inProgressList,
        reviewList,
        doneList,
      }),
    );
  }, [todoList, inProgressList, reviewList, doneList]);

  useEffect(() => {
    setUsers(initializeUsers());
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light border-bottom">
        <div className="container-fluid">
          <div className="navbar-nav w-100 d-flex justify-content-end gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <div className="d-flex gap-2 justify-content-center">
                <FaFilter className="mt-1" /> {t("expenseTracker.filter")}
              </div>
            </button>
            <button
              className="btn btn-outline-success"
              disabled={
                !todoList?.length &&
                !inProgressList?.length &&
                !reviewList?.length &&
                !doneList?.length
              }
              onClick={handleExport}
            >
              <div className="d-flex gap-2 justify-content-center">
                <FaFileExcel className="mt-1" /> {t("tasksBoard.export")}
              </div>
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setIsModalOpen(true)}
            >
              {t("tasksBoard.addNewTask")}
            </button>
          </div>
        </div>
      </nav>

      <h2 className="text-center mt-3">{t("tasksBoard.title")}</h2>
      <div className="row gap-3 w-100 p-4 mt-4 vh-100">
        {columns.map((col) => (
          <div
            key={col.id}
            className={`col text-center d-flex flex-column border border-2 rounded p-0 gap-2`}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.id)}
            style={{
              transition: "background-color 0.2s ease, border-color 0.2s ease",
              backgroundColor:
                dragOverColumn == col.id
                  ? "rgba(13, 110, 253, 0.08)"
                  : "transparent",
              borderColor: dragOverColumn == col.id ? "#0d6efd" : undefined,
              borderStyle: dragOverColumn == col.id ? "dashed" : undefined,
              minHeight: "200px",
            }}
          >
            <div className={`${col.color} p-3 fw-bold`}>{col.title}</div>
            <div className="p-2">
              {col.list.length == 0 && !hasFilters ? (
                <p className="text-muted">{t("tasksBoard.noTasks")}</p>
              ) : col.list.length == 0 && hasFilters ? (
                <p className="text-muted">
                  {t("tasksBoard.noTasksWithFilter")}
                </p>
              ) : (
                col.list.map((task: any) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    currentStage={col.id}
                    onMoveNext={handleMoveNext}
                    onDelete={handleDelete}
                    onEdit={() => {
                      setIsEditMode(true);
                      setTask(task);
                      setIsModalOpen(true);
                    }}
                    headerColor={col.color}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create/ Edit Modal */}
      {isModalOpen && (
        <>
          <FormModal
            closeModal={closeModal}
            task={task}
            setTask={setTask}
            onSubmit={handleSubmit}
            onEdit={handleEdit}
            isEditMode={isEditMode}
            users={users}
          />
        </>
      )}
      {/* Notification Messages */}
      {showToast && (
        <ToastContainer position="top-center" closeOnClick autoClose={1500} />
      )}

      {isFilterModalOpen && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          closeModal={() => setIsFilterModalOpen(false)}
          users={users}
        />
      )}
    </div>
  );
};

export default TasksBoard;
