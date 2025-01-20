import Loader from "react-loader-spinner";

const LoadingView = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      width: "100%",
    }}
  >
    <Loader type="ThreeDots" color="black" height={50} width={50} />
  </div>
);

export default LoadingView;
