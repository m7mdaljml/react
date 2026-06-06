import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { Task } from "../../../domain/def/task";

// Components
import FormModal from "../../components/tasks-board/form-modal";
import TaskCard from "../../components/tasks-board/task-card";

const TasksBoard = () => {
  const { t } = useTranslation();

  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const [task, setTask] = useState(new Task());

  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { id: 1, title: t("tasksBoard.todo"), color: "bg-info", list: todoList },
    {
      id: 2,
      title: t("tasksBoard.inProgress"),
      color: "bg-warning",
      list: inProgressList,
    },
    {
      id: 3,
      title: t("tasksBoard.review"),
      color: "bg-primary",
      list: reviewList,
    },
    { id: 4, title: t("tasksBoard.done"), color: "bg-success", list: doneList },
  ];

  const colsMap: any = {
    1: [todoList, setTodoList],
    2: [inProgressList, setInProgressList],
    3: [reviewList, setReviewList],
    4: [doneList, setDoneList],
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setTodoList([...todoList, task]);
    setTask(new Task());
    closeModal();
    setShowToast(true);
    toast.success(`${t("tasksBoard.taskAddedSuccessfully")}`);
  };

  const handleMoveNext = (task: any, currentStage: number) => {
    if (currentStage == 4) return;
    const [currentList, setCurrentList] = colsMap[currentStage];
    const [nextList, setNextList] = colsMap[currentStage + 1];
    setCurrentList(currentList.filter((t: any) => t.id !== task.id));
    setNextList([...nextList, task]);
    toast.success(t("tasksBoard.taskMovedSuccessfully"));
  };

  const handleDelete = (task: any, currentStage: number) => {
    const [currentList, setCurrentList] = colsMap[currentStage];
    setCurrentList(currentList.filter((t: any) => t.id !== task.id));
    toast.success(t("tasksBoard.taskDeletedSuccessfully"));
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

  return (
    <div>
      <h2 className="text-center mt-3">{t("tasksBoard.title")}</h2>

      <div className="row gap-3 w-100 p-4 mt-4 vh-100">
        {columns.map((col) => (
          <div
            key={col.id}
            className="col text-center d-flex flex-column border border-2 rounded p-0 gap-2"
          >
            <div className={`${col.color} p-3 fw-bold`}>{col.title}</div>
            <div className="p-2">
              {col.list.length == 0 ? (
                <p className="text-muted">{t("tasksBoard.noTasks")}</p>
              ) : (
                col.list.map((task: any) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    currentStage={col.id}
                    onMoveNext={handleMoveNext}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>

            {col.id == 1 && (
              <button
                className="w-50 mx-auto btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                {t("tasksBoard.addNewTask")}
              </button>
            )}
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
          />
        </>
      )}
      {/* Success Message */}
      {showToast && (
        <ToastContainer position="top-center" closeOnClick autoClose={1500} />
      )}
    </div>
  );
};

export default TasksBoard;
