import LeftSideMenu from "../../components/expense-tracker/left-side-menu";
import { Outlet } from "react-router-dom";

const ExpenseTracker = () => {
  return (
    <div className="d-flex">
      <LeftSideMenu />
      <Outlet />
    </div>
  );
};
export default ExpenseTracker;
