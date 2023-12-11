import { useContext, useEffect, useState } from "react";
import CopyInputText from "./Components/CopyInputText/CopyInputText";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,

} from "react-share";

import "./Refer.scss";

import Sidebar from "../../../../Components/Student/Sidebar/Sidebar";
import Navbar from "../../../../Components/Student/Navbar/Navbar";

// images
import facebook from "./Assets/facebook.png";
import linkedin from "./Assets/linkedin.png";
import twitter from "./Assets/twitter.png";
import whatsapp from "./Assets/whatsapp.png";
import instagram from "./Assets/instagram.png";
import stepImage1 from "./Assets/step1-image.png";
import stepImage2 from "./Assets/step2-image.png";
import stepImage3 from "./Assets/step3-image.png";
import groupImage from "./Assets/group.png";
import cashbackImage from "./Assets/cashback.png";
import rewardImage from "./Assets/reward.png";

// context
import { SideBarContext } from "../../../../Context/SidebarContext";

const Refer = () => {
  const [currentUrl, setCurrentUrl] = useState("");

  const { close } = useContext(SideBarContext);

  useEffect(() => {
    setCurrentUrl("http://careerpedia.co");
  }, []);

  const shareText = "Join careerpedia for better career";

  const closeAttributeValue = close ? "true" : "false";


  const shareOnInstagram = () => {
    const url = encodeURIComponent('https://www.instagram.com'); 
    const caption = encodeURIComponent('Check out this link !'); 
  
    window.open(`https://www.instagram.com/?url=${url}&caption=${caption}`);
  };

  return (
    <>
      <div className="refer">
        <div className="refer-sidebar">
          <Sidebar />
        </div>
        <div className="refer-navbar">
          <Navbar type="refer" />
        </div>
        <div
          className="refer-earn-page"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
            close: closeAttributeValue,
          }}
        >
          <div className="refer-earn-background">
            <div className="refer-earn-back">
              <div className="refer-earn-para">
                <h3>Refer Talent , Earn Rewards</h3>
                <p>
                  Invite talent to sign up using your link and you'll get 10% of
                  their earnings awarded in<span></span>careerpedia for any
                  course they land on careerpedia.
                </p>
              </div>
              <div className="refer-earn-link">
                <div className="refer-input-text">
                  <CopyInputText />
                </div>
                <div className="refer-share-button">
                  <FacebookShareButton
                    url={currentUrl}
                    quote={shareText}
                    hashtag="#facebook"
                    className="share-button"
                  >
                    <img src={facebook} alt="" />
                  </FacebookShareButton>

                  <LinkedinShareButton
                    title={shareText}
                    url={currentUrl}
                    className="share-button"
                  >
                    <img src={linkedin} alt="" />
                  </LinkedinShareButton>

                  <TwitterShareButton
                    url={currentUrl}
                    title={shareText}
                    hashtag="#twitter"
                    className="share-button"
                  >
                    <img src={twitter} alt="" />
                  </TwitterShareButton>

                  <WhatsappShareButton
                    className="share-button"
                    title={shareText}
                    url={currentUrl}
                  >
                    <img src={whatsapp} alt="" />
                  </WhatsappShareButton>


                  <img src={instagram} alt="" onClick={shareOnInstagram} className="share-button"/>

                </div>
              </div>
              <div className="refer-heading">
                <h3>3 steps to earn guarented rewards</h3>
              </div>
              <div className="refer-earn-steps">
                <div className="step">
                  <img src={stepImage1} alt="" />
                  <p>
                    Share your link and invite friends to join in careerpedia
                    using your unique code
                  </p>
                </div>
                <div className="step">
                  <img src={stepImage2} alt="" />
                  <p>
                    Share your link and invite friends to join in careerpedia
                    using your unique code
                  </p>
                </div>
                <div className="step">
                  <img src={stepImage3} alt="" />
                  <p>
                    Share your link and invite friends to join in careerpedia
                    using your unique code
                  </p>
                </div>
              </div>
              <div className="refer-earn-rewards">
                <div className="reward">
                  <img src={groupImage} alt="" />
                  <p>Referrals</p>
                  <h3>15</h3>
                </div>
                <div className="reward">
                  <img src={cashbackImage} alt="" />
                  <p>Credits</p>
                  <h3>3600</h3>
                </div>
                <div className="reward">
                  <img src={rewardImage} alt="" />
                  <p>Rewards</p>
                  <h3>10</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Refer;
