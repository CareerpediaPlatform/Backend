import "./MobileScreen.scss";

import img from "./Assets/mobile.png";

const MobileScreen = () => {
  return (
    <div className="mobile-screen">
      <img src={img} alt="" />
      <div className="text">
        <h2>Desktop Experience Recommended</h2>
        <p>Enhanced performance awaits on laptops and desktops.</p>
      </div>
    </div>
  );
};

export default MobileScreen;
