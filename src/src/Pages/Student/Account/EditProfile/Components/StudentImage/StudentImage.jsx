import './StudentImage.scss'
import { TextField } from "@mui/material";
import { useState } from 'react';

// images
import profileIcon from '../../../Assets/profileIcon.png';
import backIcon from "../../../Assets/backIcon.png"
import { Link } from 'react-router-dom';
const StudentImage = () => {
  const [data,setData]=useState()
  //
// const dispatch=useDispatch()

const handleChange=(e)=>{
const {name,value}=e.target
setData({...data,[name]:value})
  }
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
    <div className='student-img'>
       {/* back button */}
       <Link to="../profile">
          <div className="back-btn">
        <img src={backIcon} alt='backIcon'/>
      </div>
          </Link>    
          <div className="student-img-top">
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


          <div className="student-img-description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
  )
}

export default StudentImage
