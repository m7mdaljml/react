import { FaEdit, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useConfig } from "../../../context/context";
import { TransactionTypeEnum } from "../../../domain/meta/enums/expense-tracker/type";

const Table = ({
  transactions,
  handleDelete,
  setTransaction,
  setIsEdit,
  setIsModalOpen,
}) => {
  const { t, i18n } = useTranslation();
  const config = useConfig();

  const editTransaction = (transaction: any) => {
    setTransaction(transaction);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  return (
    <div className="table-responsive mt-4">
      <table className="table">
        <thead>
          <tr>
            <th>{t("expenseTracker.title")}</th>
            <th>{t("expenseTracker.category")}</th>
            <th>{t("expenseTracker.type")}</th>
            <th>{t("expenseTracker.amount")}</th>
            <th>{t("expenseTracker.date")}</th>
            <th>{t("expenseTracker.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction, i) => (
            <tr key={i}>
              <td>{transaction.title}</td>
              <td>
                {t(`enums.TransactionCategoryEnum.${transaction.category}`)}
              </td>
              <td
                className={`fw-bold ${
                  transaction.type === TransactionTypeEnum.Expense
                    ? " text-danger"
                    : " text-success"
                }`}
              >
                {t(`enums.TransactionTypeEnum.${transaction.type}`)}
              </td>
              <td
                className={`fw-bold ${
                  transaction.type === TransactionTypeEnum.Expense
                    ? " text-danger"
                    : " text-success"
                }`}
              >
                {transaction.type === TransactionTypeEnum.Expense ? "-" : "+"}
                {(t("expenseTracker.amountWithCurrency") as any)(
                  transaction.amount,
                  config.currency[i18n.language],
                )}
              </td>
              <td>{transaction.date}</td>
              <td>
                {/* TODO: implement edit & delete functionality */}
                <div className=" d-flex gap-1">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm d-flex align-items-center"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <FaTrash style={{ fontSize: "12px" }} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm d-flex align-items-center"
                    onClick={() => editTransaction(transaction)}
                  >
                    <FaEdit style={{ fontSize: "12px" }} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
