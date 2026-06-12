import { useTranslation } from "react-i18next";
import { TaskPriorityEnum } from "../../../domain/meta/enums/tasks-board/priority";

const TaskCard = ({
  task,
  currentStage,
  onMoveNext,
  onDelete,
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
  return (
    <div
      className="card shadow rounded-4 mb-3"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ cursor: "grab", overflow: "hidden" }}
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

        <hr className="my-2" />

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle bg-primary text-white fw-bold d-flex justify-content-center align-items-center flex-shrink-0"
              style={{
                width: "42px",
                height: "42px",
                fontSize: "14px",
              }}
            >
              {task.assignedTo.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="fw-semibold">{task.assignedTo}</div>
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
