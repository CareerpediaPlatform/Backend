import { Watch } from "react-loader-spinner";

const Fallback = () => {
  return (
    <div>
      <Watch
        radius="48"
        color="#0557A2"
        ariaLabel="watch-loading"
        wrapperStyle={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        visible={true}
      />
    </div>
  );
};

export default Fallback;
