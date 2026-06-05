import axios from "axios";
import { useEffect, useState } from "react";
import { useConfig } from "../../../../context/context";
import { useTranslation } from "react-i18next";
import {
  FaMoneyBillTrendUp,
  FaMoneyBillTransfer,
  FaScaleBalanced,
} from "react-icons/fa6";
import { TransactionTypeEnum } from "../../../../domain/meta/enums/expense-tracker/type";

import Loading from "../../../components/common/loading";
import ExpenseChart from "../../../components/expense-tracker/expense-chart";
import IncomeChart from "../../../components/expense-tracker/income-chart";
import OverviewChart from "../../../components/expense-tracker/overview-chart";
import NoData from "../../../components/common/no-data";

const ExpenseDashboard = () => {
  const config = useConfig();
  const { t } = useTranslation();

  const [uiState, setUiState] = useState({ isBusy: false });
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [incomeByCategory, setIncomeByCategory] = useState([]);
  const [expenseByCategory, setExpenseByCategory] = useState([]);
  const [monthOverview, setMonthOverview] = useState([]);

  const fetchOverview = async () => {
    try {
      setUiState({ isBusy: true });
      const res = await axios.get(`${config.baseUrl}/overview.php`);
      setTotalExpense(res.data.totalExpense);
      setTotalIncome(res.data.totalIncome);
    } catch (err) {
      console.error(err);
    } finally {
      setUiState({ isBusy: false });
    }
  };

  const fetchTotalTypeByCategory = async (type: TransactionTypeEnum) => {
    try {
      setUiState({ isBusy: true });
      const res = await axios.get(
        `${config.baseUrl}/total-type-by-category.php`,
        {
          params: {
            type,
          },
        },
      );
      if (type == TransactionTypeEnum.Income) setIncomeByCategory(res.data);
      else setExpenseByCategory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setUiState({ isBusy: false });
    }
  };

  const fetchMonthOverview = async () => {
    try {
      setUiState({ isBusy: true });
      const res = await axios.get(`${config.baseUrl}/month-overview.php`);
      setMonthOverview(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setUiState({ isBusy: false });
    }
  };

  const init = async () => {
    await fetchOverview();
    await fetchTotalTypeByCategory(TransactionTypeEnum.Income);
    await fetchTotalTypeByCategory(TransactionTypeEnum.Expense);
    await fetchMonthOverview();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="w-100">
      {uiState.isBusy && <Loading />}

      {!uiState.isBusy && (
        <div className="p-3">
          <div className="row">
            <div className="col-4">
              <div className="p-4 rounded-4 shadow-sm border-0 bg-gradient bg-primary text-white">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="opacity-75 mb-2">
                      {t("expenseTracker.balance")}
                    </h6>
                    <h2 className="fw-bold mb-0">
                      {totalIncome - totalExpense}
                    </h2>
                  </div>

                  <div className="fs-1">
                    <FaScaleBalanced />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="p-4 rounded-4 shadow-sm border-0 bg-gradient bg-success text-white">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="opacity-75 mb-2">
                      {t("expenseTracker.totalIncome")}
                    </h6>
                    <h2 className="fw-bold mb-0">+{totalIncome}</h2>
                  </div>

                  <div className="fs-1">
                    <FaMoneyBillTrendUp />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="p-4 rounded-4 shadow-sm border-0 bg-gradient bg-danger text-white">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="opacity-75 mb-2">
                      {t("expenseTracker.totalExpense")}
                    </h6>
                    <h2 className="fw-bold mb-0">-{totalExpense}</h2>
                  </div>

                  <div className="fs-1">
                    <FaMoneyBillTransfer />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!monthOverview.length ? (
            <NoData message={t("expenseTracker.noDateToDisplay")} />
          ) : (
            <div className="mt-2">
              <OverviewChart data={monthOverview} />
            </div>
          )}

          <div className="row g-3 mt-2">
            <div className="col-6 d-flex flex-column gap-3">
              <div className="fw-bold fs-5">
                {t("expenseTracker.incomeByCategory")}
              </div>
              {!incomeByCategory.length ? (
                <NoData message={t("expenseTracker.noDateToDisplay")} />
              ) : (
                <IncomeChart data={incomeByCategory} />
              )}
            </div>
            <div className="col-6 d-flex flex-column gap-3">
              <div className="fw-bold fs-5">
                {t("expenseTracker.expenseByCategory")}
              </div>
              {!expenseByCategory.length ? (
                <NoData message={t("expenseTracker.noDateToDisplay")} />
              ) : (
                <ExpenseChart data={expenseByCategory} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDashboard;
