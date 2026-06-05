import { useTranslation } from "react-i18next";

const TasksBoard = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-center mt-3">{t("tasksBoard.title")}</h2>

      <div className="mt-4 w-100 p-4">
        <div className="row gap-3">
          <div className="col text-center d-flex flex-column border  border-2 rounded p-0 gap-2">
            <div className="bg-info p-3">{t("tasksBoard.todo")}</div>
            {/* here should be add list of tasks */}
          </div>
          <div className="col text-center d-flex flex-column border  border-2 rounded p-0 gap-2">
            <div className="bg-warning p-3">{t("tasksBoard.inProgress")}</div>
            {/* here should be add list of tasks */}
          </div>
          <div className="col text-center d-flex flex-column border  border-2 rounded p-0 gap-2">
            <div className="bg-primary p-3">{t("tasksBoard.review")}</div>
            {/* here should be add list of tasks */}
          </div>
          <div className="col text-center d-flex flex-column border  border-2 rounded p-0 gap-2">
            <div className="bg-success p-3">{t("tasksBoard.done")}</div>
            {/* here should be add list of tasks */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksBoard;
