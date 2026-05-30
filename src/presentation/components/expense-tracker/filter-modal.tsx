import { FaFilter } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { TransactionTypeEnum } from "../../../domain/meta/enums/expense-tracker/type";
import { TransactionCategoryEnum } from "../../../domain/meta/enums/expense-tracker/category";
import { useEffect, useState } from "react";

const FilterModal = ({ filters, setFilters, closeModal }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState({
    title: "",
    type: "",
    category: "",
  } as any);

  const handleFilterApply = () => {
    setFilters(filter);
    closeModal();
  };

  const handleReset = () => {
    const empty = {
      title: "",
      type: "",
      category: "",
    };

    setFilter(empty);
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
                {t("expenseTracker.filter")}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              />
            </div>

            <div className="modal-body overflow-auto row">
              {/* title */}
              <div className="form-group col-4">
                <label className="form-label">
                  {t("expenseTracker.title")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={filter.title}
                  placeholder={t("expenseTracker.title")}
                  onChange={(e) =>
                    setFilter({ ...filter, title: e.target.value })
                  }
                />
              </div>

              {/* type */}
              <div className="form-group col-4">
                <label className="form-label">{t("expenseTracker.type")}</label>
                <select
                  className="form-select"
                  value={filter.type}
                  onChange={(e) =>
                    setFilter({ ...filter, type: e.target.value })
                  }
                >
                  <option value="">{t("expenseTracker.type")}</option>
                  <option value={TransactionTypeEnum.Expense}>
                    {t(
                      `enums.TransactionTypeEnum.${TransactionTypeEnum.Expense}`,
                    )}
                  </option>
                  <option value={TransactionTypeEnum.Income}>
                    {t(
                      `enums.TransactionTypeEnum.${TransactionTypeEnum.Income}`,
                    )}
                  </option>
                </select>
              </div>

              {/* category */}
              <div className="form-group col-4">
                <label className="form-label">
                  {t("expenseTracker.category")}
                </label>
                <select
                  className="form-select"
                  value={filter.category}
                  onChange={(e) =>
                    setFilter({ ...filter, category: e.target.value })
                  }
                >
                  <option value="">{t("expenseTracker.category")}</option>
                  <option value={TransactionCategoryEnum.Food}>
                    {t(
                      `enums.TransactionCategoryEnum.${TransactionCategoryEnum.Food}`,
                    )}
                  </option>
                  <option value={TransactionCategoryEnum.Transportation}>
                    {t(
                      `enums.TransactionCategoryEnum.${TransactionCategoryEnum.Transportation}`,
                    )}
                  </option>
                  <option value={TransactionCategoryEnum.Housing}>
                    {t(
                      `enums.TransactionCategoryEnum.${TransactionCategoryEnum.Housing}`,
                    )}
                  </option>
                  <option value={TransactionCategoryEnum.Utilities}>
                    {t(
                      `enums.TransactionCategoryEnum.${TransactionCategoryEnum.Utilities}`,
                    )}
                  </option>
                  <option value={TransactionCategoryEnum.Salaries}>
                    {t(
                      `enums.TransactionCategoryEnum.${TransactionCategoryEnum.Salaries}`,
                    )}
                  </option>
                  <option value={TransactionCategoryEnum.Investments}>
                    {t(
                      `enums.TransactionCategoryEnum.${TransactionCategoryEnum.Investments}`,
                    )}
                  </option>
                  <option value={TransactionCategoryEnum.Shopping}>
                    {t(
                      `enums.TransactionCategoryEnum.${TransactionCategoryEnum.Shopping}`,
                    )}
                  </option>
                  <option value={TransactionCategoryEnum.Entertainment}>
                    {t(
                      `enums.TransactionCategoryEnum.${TransactionCategoryEnum.Entertainment}`,
                    )}
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
                {t("expenseTracker.reset")}
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFilterApply}
              >
                {t("expenseTracker.apply")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
