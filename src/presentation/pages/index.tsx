import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const Presentation = () => {
  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Presentation;
