import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import type { TTask } from "../../../domain/meta/i-types";

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
  const handleAddTask = () => {
    if (newTask.text.trim() !== "") {
      setTasks([newTask, ...tasks]);
      setNewTask({ text: "", done: false, date: new Date().toISOString() });
      setInputValidity(true);
    } else {
      setInputValidity(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <h1 className="d-flex justify-content-center">TODO List</h1>
      <div className="card mt-4 w-50 mx-auto">
        <div className="card-body">
          {/* Input Area */}
          <div className="d-flex gap-2 ">
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
              className={`form-control ${!inputValidity ? "border border-danger" : ""}`}
              placeholder={t("todo.addNewTask")}
            />
            <button
              className="btn btn-primary d-flex gap-2 align-items-center"
              onClick={handleAddTask}
            >
              <FaPlus /> {t("todo.add")}
            </button>
          </div>
          {!inputValidity && (
            <p className="text-danger mt-1">{t("todo.inputErorr")}</p>
          )}
          {/* list */}
          <div className="list-group mt-4">
            {/* if there are any task appear list */}
            {tasks.length ? (
              tasks.map((task, index) => (
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
                              i === index ? { ...t, done: !t.done } : t,
                            ),
                          )
                        }
                      >
                        <FaCheck />
                      </button>
                    ) : // if the task is done dont appear any button
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
              <span className="text-muted mx-auto">{t("todo.noTasks")}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TODO;
