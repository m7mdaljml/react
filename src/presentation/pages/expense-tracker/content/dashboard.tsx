import axios from "axios";
import { useEffect, useState } from "react";
import { useConfig } from "../../../../context/context";
import { useTranslation } from "react-i18next";
import { FaMoneyBillTrendUp, FaMoneyBillTransfer } from "react-icons/fa6";

const ExpenseDashboard = () => {
  const config = useConfig();
  const { t } = useTranslation();

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const fetchOverview = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/overview.php`);
      setTotalExpense(res.data.totalExpense);
      setTotalIncome(res.data.totalIncome);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className="w-100 p-3">
      <div className="row">
        <div className="col-6">
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

        <div className="col-6">
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
    </div>
  );
};

export default ExpenseDashboard;
