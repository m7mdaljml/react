import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TaskPriorityEnum } from "../../../domain/meta/enums/tasks-board/priority";

const FormModal = ({
  closeModal,
  task,
  setTask,
  onSubmit,
  onEdit,
  isEditMode = false,
}) => {
  const { t } = useTranslation();

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: any = {};

    if (!task.title?.trim()) newErrors.title = true;
    if (!task.description?.trim()) newErrors.description = true;
    if (!task.assignedTo?.trim()) newErrors.assignedTo = true;

    if (
      task.estimatedTime == "" ||
      task.estimatedTime == null ||
      task.estimatedTime <= 0
    )
      newErrors.estimatedTime = true;

    if (task.priority == null) newErrors.priority = true;

    setErrors(newErrors);

    return Object.keys(newErrors).length == 0;
  };

  const handleFormSubmit = async () => {
    setSubmitting(true);

    const isValid = validate();

    if (!isValid) {
      setSubmitting(false);
      return;
    }

    await onSubmit();
    setSubmitting(false);
  };

  const validationClass = (field: string) =>
    errors[field]
      ? "is-invalid border border-2 border-danger"
      : submitting
        ? "is-valid border border-2 border-success"
        : "";

  return (
    <div
      className="modal-backdrop"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="modal show d-block" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header gap-2">
              <h5 className="modal-title">
                {isEditMode
                  ? t("tasksBoard.editTask")
                  : t("tasksBoard.addNewTask")}
              </h5>
            </div>

            <div className="modal-body d-flex flex-column gap-4">
              <input
                type="text"
                className={`form-control ${validationClass("title")}`}
                placeholder={t("tasksBoard.taskTitle")}
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />

              <input
                type="text"
                className={`form-control ${validationClass("description")}`}
                placeholder={t("tasksBoard.taskDescription")}
                value={task.description}
                onChange={(e) =>
                  setTask({
                    ...task,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="text"
                className={`form-control ${validationClass("assignedTo")}`}
                placeholder={t("tasksBoard.assignedTo")}
                value={task.assignedTo}
                onChange={(e) =>
                  setTask({
                    ...task,
                    assignedTo: e.target.value,
                  })
                }
              />

              <input
                type="number"
                className={`form-control ${validationClass("estimatedTime")}`}
                placeholder={t("tasksBoard.estimatedTime")}
                min={0}
                value={task.estimatedTime}
                onChange={(e) => {
                  const v = Number(e.target.value);

                  setTask({
                    ...task,
                    estimatedTime: isNaN(v) ? "" : v,
                  });
                }}
              />

              <select
                className={`form-select ${validationClass("priority")}`}
                value={task.priority}
                onChange={(e) =>
                  setTask({
                    ...task,
                    priority: +e.target.value,
                  })
                }
              >
                <option value="">{t("tasksBoard.priority")}</option>

                <option value={TaskPriorityEnum.Low}>
                  {t(`enums.TaskPriorityEnum.${TaskPriorityEnum.Low}`)}
                </option>

                <option value={TaskPriorityEnum.Medium}>
                  {t(`enums.TaskPriorityEnum.${TaskPriorityEnum.Medium}`)}
                </option>

                <option value={TaskPriorityEnum.High}>
                  {t(`enums.TaskPriorityEnum.${TaskPriorityEnum.High}`)}
                </option>
              </select>

              {Object.keys(errors).length > 0 && (
                <b className="text-danger text-center">
                  {t("expenseTracker.AllFieldsAreRequired")}
                </b>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                {t("expenseTracker.close")}
              </button>

              <button
                className="btn btn-primary"
                onClick={isEditMode ? onEdit : handleFormSubmit}
              >
                {isEditMode ? t("tasksBoard.save") : t("tasksBoard.add")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
