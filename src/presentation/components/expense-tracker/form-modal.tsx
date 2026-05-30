import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TransactionTypeEnum } from "../../../domain/meta/enums/expense-tracker/type";
import { TransactionCategoryEnum } from "../../../domain/meta/enums/expense-tracker/category";
import { useConfig } from "../../../context/context";

const Modal = ({
  handleSubmit,
  transaction,
  setTransaction,
  closeModal,
  isEdit,
}) => {
  const { t, i18n } = useTranslation();
  const config = useConfig();

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {} as any;

    if (!transaction.title?.trim()) newErrors.title = true;
    if (
      transaction.amount == "" ||
      transaction.amount == null ||
      transaction.amount < 0
    )
      newErrors.amount = true;
    if (!transaction.type) newErrors.type = true;
    if (!transaction.category) newErrors.category = true;
    if (!transaction.date) newErrors.date = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length == 0;
  };

  const onSubmit = async () => {
    setSubmitting(true);
    const isValid = validate();
    if (!isValid) return;

    if (isEdit) await handleSubmit(transaction.id);
    else await handleSubmit();
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
                {isEdit
                  ? t("expenseTracker.editTransaction")
                  : t("expenseTracker.createNewTransaction")}
              </h5>
            </div>

            <div className="modal-body d-flex flex-column gap-4">
              {/* title */}
              <input
                type="text"
                className={`form-control ${validationClass("title")}`}
                value={transaction.title}
                placeholder={t("expenseTracker.title")}
                onChange={(e) =>
                  setTransaction({ ...transaction, title: e.target.value })
                }
              />

              {/* amount */}
              <input
                type="number"
                className={`form-control ${validationClass("amount")} `}
                value={transaction.amount}
                min={0}
                placeholder={(t("expenseTracker.amountInCurrency") as any)(
                  config.currency[i18n.language],
                )}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setTransaction({
                    ...transaction,
                    amount: isNaN(v) ? "" : v,
                  });
                }}
              />

              {/* type */}
              <select
                className={`form-select ${validationClass("type")}`}
                value={transaction.type}
                onChange={(e) =>
                  setTransaction({ ...transaction, type: e.target.value })
                }
              >
                <option value="">{t("expenseTracker.type")}</option>
                <option value={TransactionTypeEnum.Expense}>
                  {t(
                    `enums.TransactionTypeEnum.${TransactionTypeEnum.Expense}`,
                  )}
                </option>
                <option value={TransactionTypeEnum.Income}>
                  {t(`enums.TransactionTypeEnum.${TransactionTypeEnum.Income}`)}
                </option>
              </select>

              {/* category */}
              <select
                className={`form-select ${validationClass("category")}`}
                value={transaction.category}
                onChange={(e) =>
                  setTransaction({ ...transaction, category: e.target.value })
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

              {/* date */}
              <input
                type="date"
                className={`form-control ${validationClass("date")}`}
                value={transaction.date}
                onChange={(e) =>
                  setTransaction({ ...transaction, date: e.target.value })
                }
              />

              {Object.keys(errors).length > 0 && (
                <b className="text-danger text-center">
                  {t("expenseTracker.AllFieldsAreRequired")}
                </b>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => closeModal()}
              >
                {t("expenseTracker.close")}
              </button>

              <button className="btn btn-primary" onClick={onSubmit}>
                {isEdit ? t("expenseTracker.save") : t("expenseTracker.create")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
