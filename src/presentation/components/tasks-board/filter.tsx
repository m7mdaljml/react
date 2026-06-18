import { FaFilter } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { IUser } from "../../../domain/meta/i-user";
import { TaskPriorityEnum } from "../../../domain/meta/enums/tasks-board/priority";

const FilterModal = ({ filters, setFilters, closeModal, users }) => {
  const { t } = useTranslation();
  const emptyFilter = {
    title: "",
    assignedTo: "",
    priority: "",
  };
  const [filter, setFilter] = useState(emptyFilter);

  const handleFilterApply = () => {
    setFilters(filter);
    closeModal();
  };

  const handleReset = () => {
    setFilter(emptyFilter);
  };

  useEffect(() => {
    setFilter(filters);
  }, [filters]);

  return (
    <div
      className="modal-backdrop"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="modal show d-block" role="dialog">
        <div
          className="modal-dialog modal-fullscreen-sm-down modal-dialog-top m-0"
          style={{
            maxWidth: "100%",
          }}
        >
          <div className="modal-content rounded-0 border-0">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title d-flex align-items-center gap-2">
                <FaFilter className="mt-1" />
                {t("tasksBoard.filter")}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              />
            </div>

            <div className="modal-body overflow-auto row">
              <div className="col">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder={t("tasksBoard.searchByText")}
                  value={filter.title}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col">
                <select
                  className={`form-select`}
                  value={filter.assignedTo}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      assignedTo: e.target.value,
                    })
                  }
                >
                  <option value="">{t("tasksBoard.filterByAssignee")}</option>
                  {users.map((user: IUser) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className={`form-select `}
                  value={filter.priority}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      priority: e.target.value,
                    })
                  }
                >
                  <option value="">{t("tasksBoard.filterByPriority")}</option>

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
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                {t("tasksBoard.resetFilter")}
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFilterApply}
              >
                {t("tasksBoard.applyFilter")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
