import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFilter } from "react-icons/fa";
import type { TTodoFilter } from "../../../domain/meta/i-types";

type props = {
  filter: TTodoFilter;
  setFilter: React.Dispatch<React.SetStateAction<TTodoFilter>>;
};

const Filter = ({ filter, setFilter }: props) => {
  const { t } = useTranslation();

  const [taskText, setTaskText] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [done, setDone] = useState("all");
  const [taskDate, setTaskDate] = useState("");

  const handleFilter = () => {
    setFilter({ ...filter, sort, taskText, done, taskDate });
  };
  const resetFilter = () => {
    const resetValues = {
      sort: "asc",
      taskText: "",
      done: "all",
      taskDate: "",
    };

    setTaskText("");
    setDone("all");
    setTaskDate("");
    setSort("asc");

    setFilter(resetValues);
  };

  return (
    <>
      <div className=" d-flex gap-2  mb-2">
        <FaFilter className="mt-1" /> {t("todo.filter")}
      </div>

      <div className="d-flex gap-2 justify-content-between">
        {/* taskText */}
        <div className="mb-3">
          <input
            type="text"
            placeholder={t("todo.searchByText")}
            className="form-control"
            id="taskText"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
        </div>
        {/* done */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {done == "all"
              ? t("todo.all")
              : done == "done"
                ? t("todo.done")
                : t("todo.notDone")}
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" onClick={() => setDone("all")}>
                {t("todo.all")}
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={() => setDone("done")}>
                {t("todo.done")}
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={() => setDone("notDone")}>
                {t("todo.notDone")}
              </a>
            </li>
          </ul>
        </div>
        {/* taskDate */}
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            id="taskDate"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
        </div>
        {/* sort */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {sort == "asc"
              ? t("todo.asc")
              : sort == "desc"
                ? t("todo.desc")
                : t("todo.sort")}
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" onClick={() => setSort("asc")}>
                {t("todo.asc")}
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={() => setSort("desc")}>
                {t("todo.desc")}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex justify-content-end w-100 gap-2">
        <button
          className="btn btn-outline-primary "
          onClick={() => resetFilter()}
        >
          {t("todo.resetFilter")}
        </button>
        <button className="btn btn-primary " onClick={() => handleFilter()}>
          {t("todo.applyFilter")}
        </button>
      </div>
    </>
  );
};

export default Filter;
