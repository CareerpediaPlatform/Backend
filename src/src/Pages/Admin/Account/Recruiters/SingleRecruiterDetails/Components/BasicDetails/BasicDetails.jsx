import "./BasicDetails.scss";
import user from "../../../Assets/user.png";

const PersonalData = {
  CompanyName: "Lorem",
  FounderName: "Ipsum",
  Website: "loremipsum.com",
  EmailId: "loremipsum@gmail.com",
  MobileNumber: 9988776661,
  LinkedInProfile:
    "https://www.linkedin.com/pulse/easy-share-link-generator-social-media-networks-raul-colon/",
};

const BasicDetails = () => {
  return (
    <div className="mentor-details">
      <div className="mentor-heading">
        <h2>Basic Details</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum
        </p>
      </div>
      <div className="personal-list">
        <div className="personal-data">
          <div className="image-logo">
            <img src={user} alt="Static" className="img-default" />
          </div>

          <div className="keys">
            <h3>Company name</h3>
            <h3>Founder name</h3>
            <h3>Website</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{PersonalData.CompanyName}</p>
            <p>{PersonalData.FounderName}</p>
            <p>{PersonalData.Website}</p>
          </div>
        </div>

        <div className="personal-data">
          <div className="keys">
            <h3>Email ID</h3>
            <h3>Mobile number</h3>
            <h3>Linkedin profile</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{PersonalData.EmailId}</p>
            <p>{PersonalData.MobileNumber}</p>
            <p id="linkedIn">{PersonalData.LinkedInProfile}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
