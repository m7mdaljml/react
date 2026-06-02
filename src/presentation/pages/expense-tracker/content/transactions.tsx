import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFilter } from "react-icons/fa";
import { Transaction } from "../../../../domain/def/transaction";
import { useConfig } from "../../../../context/context";

// Components
import FilterModal from "../../../components/expense-tracker/filter-modal";
import Modal from "../../../components/expense-tracker/form-modal";
import Table from "../../../components/expense-tracker/table";
import NoData from "../../../components/common/no-data";
import Loading from "../../../components/common/loading";

const ExpenseTransactions = () => {
  const config = useConfig();

  const { t } = useTranslation();

  const [transaction, setTransaction] = useState(new Transaction());
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filters, setFilters] = useState({});
  const [uiState, setUiState] = useState({ isBusy: false });

  const hasFilters = Object.values(filters).some((v) => v !== "" && v != null);

  const resetTransaction = () => {
    setTransaction(new Transaction());
  };

  const closeModal = () => {
    resetTransaction();
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const handleSubmit = async (id?: string) => {
    try {
      setUiState({ isBusy: true });
      if (isEdit) {
        await axios.put(`${config.baseUrl}/edit-transaction.php`, {
          id,
          ...transaction,
        });
      } else {
        await axios.post(`${config.baseUrl}/add-transaction.php`, {
          ...transaction,
        });
      }

      closeModal();
      await fetchTransactions();
    } catch (err) {
      console.error(err);
    } finally {
      setUiState({ isBusy: false });
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      setUiState({ isBusy: true });
      await axios.post(`${config.baseUrl}/delete-transaction.php`, {
        id,
      });

      await fetchTransactions();
    } catch (err) {
      console.error(err);
    } finally {
      setUiState({ isBusy: false });
    }
  };

  const fetchTransactions = async () => {
    try {
      setUiState({ isBusy: true });
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "" && v != null),
      );
      const res = await axios.get(`${config.baseUrl}/list-transactions.php`, {
        params: { ...cleanFilters },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setUiState({ isBusy: false });
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  return (
    <div className="w-100">
      {/* Nav Bar */}
      <nav className="navbar navbar-expand-lg bg-light border-bottom">
        <div className="container-fluid">
          <div className="navbar-nav w-100 d-flex justify-content-end gap-2">
            {(transactions?.length > 0 || hasFilters) && (
              <button
                className="btn btn-outline-primary"
                onClick={() => setIsFilterModalOpen(true)}
              >
                <div className="d-flex gap-2 justify-content-center">
                  <FaFilter className="mt-1" /> {t("expenseTracker.filter")}
                </div>
              </button>
            )}
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setIsModalOpen(true)}
            >
              {t("expenseTracker.createNewTransaction")}
            </button>
          </div>
        </div>
      </nav>

      {/* Table */}
      {uiState.isBusy && <Loading />}

      {!uiState.isBusy && (
        <>
          {!transactions?.length ? (
            hasFilters ? (
              <NoData
                message={t("expenseTracker.noTransactionsWithFilter")}
                subMessage={t("expenseTracker.noTransactionsWithFilterSub")}
              />
            ) : (
              <NoData
                message={t("expenseTracker.noTransactions")}
                subMessage={t("expenseTracker.noTransactionsSub")}
              />
            )
          ) : (
            <Table
              transactions={transactions}
              handleDelete={deleteTransaction}
              setTransaction={setTransaction}
              setIsEdit={setIsEdit}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </>
      )}

      {/* Create/ Edit Modal */}
      {isModalOpen && (
        <Modal
          handleSubmit={handleSubmit}
          transaction={transaction}
          setTransaction={setTransaction}
          closeModal={closeModal}
          isEdit={isEdit}
        />
      )}

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          closeModal={() => setIsFilterModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ExpenseTransactions;
