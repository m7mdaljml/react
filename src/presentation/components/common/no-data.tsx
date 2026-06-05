import empty from "../../../assets/images/no-data.png";

type NoDataProps = {
  message: string;
  subMessage?: string;
};

const NoData = ({ message, subMessage }: NoDataProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column h-75">
      <img src={empty} style={{ width: "400px" }} />
      <b>{message}</b>
      {!!subMessage && <p>{subMessage}</p>}
    </div>
  );
};

export default NoData;
