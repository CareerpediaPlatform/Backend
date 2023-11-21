import "./PageNotFound.scss";
import img1 from './Assets/error.png'
import { Button } from "@mui/material";
import { Link } from "react-router-dom";



const PageNotFound = () => {
  return (
    <div className="container">
      <img src={img1}/>
      <h2 className="heading">404 Page Not Found</h2>
      <div className="text-block">Sorry the page you’re looking for not found, if you think there’s something wrong please report</div>
     <Link to='/'>
      <Button class="button w-button">Go To Home</Button>
     </Link>
    </div>
  );
};

export default PageNotFound;
