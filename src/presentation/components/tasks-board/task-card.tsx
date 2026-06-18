import { useTranslation } from "react-i18next";
import { TaskPriorityEnum } from "../../../domain/meta/enums/tasks-board/priority";
import type { IUser } from "../../../domain/meta/i-user";

const TaskCard = ({
  task,
  currentStage,
  onMoveNext,
  onDelete,
  onEdit,
  headerColor,
}) => {
  const { t } = useTranslation();

  const handleDragStart = (e: any) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("sourceStage", String(currentStage));
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e: any) => (e.currentTarget.style.opacity = "1");
  const storedUsers = localStorage.getItem("users");

  const assignedUser = JSON.parse(storedUsers || "[]")?.find(
    (user: IUser) => user.id === task.assignedTo,
  );

  return (
    <div
      className="card shadow rounded-4 mb-3"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ cursor: "grab", overflow: "hidden", height: "200px" }}
    >
      <div className={headerColor} style={{ height: "15px" }}></div>
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6
              className="fw-bold mb-1"
              style={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {task.title}
            </h6>

            <p
              className="text-muted mb-2 small"
              style={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              {task.description}
            </p>
          </div>

          <div className="d-flex align-items-start gap-2">
            <span
              className={`badge ${
                task.priority == TaskPriorityEnum.High
                  ? "bg-danger"
                  : task.priority == TaskPriorityEnum.Medium
                    ? "bg-warning text-dark"
                    : "bg-success"
              }`}
            >
              {t(`enums.TaskPriorityEnum.${task.priority}`)}
            </span>

            <div className="dropdown">
              <button
                className="btn btn-sm btn-light border-0"
                type="button"
                data-bs-toggle="dropdown"
              >
                &#8942;
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                {currentStage != 4 && (
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => onMoveNext(task, currentStage)}
                    >
                      {t("tasksBoard.moveToNextStep")}
                    </button>
                  </li>
                )}

                {currentStage == 1 && (
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => onEdit(task, currentStage)}
                    >
                      {t("tasksBoard.edit")}
                    </button>
                  </li>
                )}

                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => onDelete(task, currentStage)}
                  >
                    {t("delete")}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-3" />

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            {assignedUser?.image ? (
              <img
                src={assignedUser?.image}
                alt={assignedUser?.name}
                className="rounded-circle border border-2 border-light"
                style={{
                  width: "42px",
                  height: "42px",
                }}
              />
            ) : (
              <div
                className="rounded-circle bg-primary text-white fw-bold d-flex justify-content-center align-items-center flex-shrink-0"
                style={{
                  width: "42px",
                  height: "42px",
                  fontSize: "14px",
                }}
              >
                {assignedUser?.name?.substring(0, 2).toUpperCase()}
              </div>
            )}

            <div className="d-flex flex-column">
              <div className="fw-semibold">{assignedUser?.name}</div>
              <div className="text-muted">{assignedUser?.jobTitle}</div>
            </div>
          </div>

          <div className="text-end">
            <div className="fw-semibold">
              {(t("tasksBoard.estimatedTimeHours") as any)(task.estimatedTime)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
