import { useTranslation } from "react-i18next";
import { FaFilter } from "react-icons/fa";

type props = {
  sortAsc: boolean;
  setSortAsc: React.Dispatch<React.SetStateAction<boolean>>;
};

const Filter = ({ sortAsc, setSortAsc }: props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className=" d-flex gap-2 mb-2">
        <FaFilter className="mt-1" /> {t("todo.filter")}
      </div>

      <button
        className="btn btn-secondary d-flex gap-2 align-items-center"
        onClick={() => setSortAsc((prev) => !prev)}
      >
        {sortAsc ? t("todo.oldToNew") : t("todo.newToOld")}
      </button>

      {/* TODO: implement filter by done, task text, and task date */}
    </>
  );
};

export default Filter;
