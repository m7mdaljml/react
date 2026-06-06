import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import type { TTask } from "../../../domain/meta/i-types";
// components
import Filter from "../../components/todo-app/filter";

const TODO = () => {
  const [newTask, setNewTask] = useState({
    text: "",
    done: false,
    date: new Date().toISOString(),
  });

  const [tasks, setTasks] = useState<TTask[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const { t } = useTranslation();

  const [inputValidity, setInputValidity] = useState<boolean>(true);
  const [taskValidity, setTaskValidity] = useState<boolean>(true);
  const [filter, setFilter] = useState({
    sort: "asc",
    done: "all",
    taskText: "",
    taskDate: "",
  });
  const handleAddTask = () => {
    const trimmedText = newTask.text.trim();

    setInputValidity(true);
    setTaskValidity(true);

    if (!trimmedText) {
      setInputValidity(false);
      return;
    }

    const taskExists = tasks.some(
      (t) => t.text == trimmedText && t.done == false,
    );
    if (taskExists) {
      setTaskValidity(false);
      return;
    }

    setTasks([
      {
        ...newTask,
        text: trimmedText,
      },
      ...tasks,
    ]);

    setNewTask({
      text: "",
      done: false,
      date: new Date().toISOString(),
    });
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = [...tasks]
    .filter((task) => {
      if (filter.done == "done") return task.done;
      if (filter.done == "notDone") return !task.done;
      return true;
    })
    .filter((task) => {
      if (!filter.taskText) return true;
      return task.text.toLowerCase().includes(filter.taskText.toLowerCase());
    })
    .filter((task) => {
      if (!filter.taskDate) return true;

      const taskDate = new Date(task.date).toDateString();
      const filterDate = new Date(filter.taskDate).toDateString();

      return taskDate == filterDate;
    })
    .sort((a, b) => {
      if (filter.sort == "asc")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      else return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  return (
    <>
      <h1 className="d-flex justify-content-center py-4">TODO List</h1>
      {!!tasks.length && (
        <div className="card w-50 mx-auto mt-4">
          <div className="card-body">
            <Filter filter={filter} setFilter={setFilter} />
          </div>
        </div>
      )}

      <div className="card mt-4 w-50 mx-auto">
        <div className="card-body">
          {/* Header Area */}
          <div className="d-flex justify content between">
            <input
              value={newTask.text}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  text: e.target.value,
                  date: new Date().toISOString(),
                })
              }
              type="text"
              className={`form-control w-50 mr-2 ${!inputValidity || !taskValidity ? "border border-danger" : ""}`}
              placeholder={t("todo.addNewTask")}
            />
            <div className="d-flex w-50 justify-content-end gap-2">
              <button
                className="btn btn-primary d-flex gap-2 align-items-center"
                disabled={!newTask.text.trim()}
                onClick={handleAddTask}
              >
                <FaPlus /> {t("todo.add")}
              </button>
            </div>
          </div>
          {!inputValidity && (
            <p className="text-danger mt-1">{t("todo.inputError")}</p>
          )}
          {!taskValidity && (
            <p className="text-danger mt-1">{t("todo.taskExistsError")}</p>
          )}
          {/* list */}
          <div className="list-group mt-4">
            {/* if there are any task appear list */}
            {filteredTasks.length ? (
              [...filteredTasks].map((task, index) => (
                <div
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    className={
                      task.done
                        ? "text-decoration-line-through  text-success"
                        : ""
                    }
                  >
                    {task.text} -
                    <small className="text-muted m-1">
                      {new Date(task.date).toLocaleString()}
                    </small>
                  </span>
                  <div className="d-flex gap-2">
                    {/* if the task is not done appear this button to mark it as done */}
                    {!task.done ? (
                      <button
                        className="btn btn-outline-success border-0 d-flex align-items-center"
                        onClick={() =>
                          setTasks(
                            tasks.map((t, i) =>
                              i == index ? { ...t, done: !t.done } : t,
                            ),
                          )
                        }
                      >
                        <FaCheck />
                      </button>
                    ) : // if the task is done don't appear any button
                    null}
                    <button
                      className="btn btn-outline-danger border-0 d-flex align-items-center"
                      onClick={() =>
                        setTasks(tasks.filter((_item, i) => i !== index))
                      }
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              // if there is no task appear this message
              <span className="text-muted mx-auto">
                {tasks.length ? t("todo.noTasksWithFilter") : t("todo.noTasks")}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TODO;
