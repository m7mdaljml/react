import empty from "../../../assets/images/no-data.png";

const NoData = ({ message, subMessage }) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column h-75">
      <img src={empty} style={{ width: "400px" }} />
      <b>{message}</b>
      <p>{subMessage}</p>
    </div>
  );
};

export default NoData;
