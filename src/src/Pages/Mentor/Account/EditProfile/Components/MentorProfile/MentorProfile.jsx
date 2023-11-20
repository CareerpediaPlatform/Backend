import "./MentorProfile.scss";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

//Image
import profileIcon from "../../../Assets/Img.png";

const MentorProfile = () => {
  const [data, setData] = useState();
  //
  // const dispatch=useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Display the selected image
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };
  return (
    <div className="college-img">
      <div className="college-img-top">
        <div className={selectedImage ? "logo-image selected" : "logo-image"}>
          <img
            src={selectedImage || profileIcon}
            alt="Static"
            className={selectedImage ? "img-selected" : "img-default"}
            onClick={() => document.getElementById("fileInput").click()}
          />
          <TextField
            variant="standard"
            id="fileInput"
            name="profilePic"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="text">
          <p>Upload Your Image</p>
        </div>
      </div>

      <div className="college-img-description">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  );
};

export default MentorProfile;
