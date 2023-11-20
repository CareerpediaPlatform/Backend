import { useState } from 'react';
import './PlayerNavbar.scss'
import searchIcon from "../../../../Assets/searchIcon.png"
const PlayerNavbar = (props) => {
  const [navbar,setNavbar]=useState(null)

  // dropdown active 
const [isActive, setIsActive] = useState(false);
const [selected, setIsSelected] = useState("Choose one");

  return (
    <div className='player-navbar'>
      {/*  */}
  <div className="dropdown" style={{background:"#000"}}>
        <div
          onClick={(e) => {
            setIsActive(!isActive);
          }}
          className="dropdown-btn"
        >
          {selected}
          <span
            className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
          />
        </div>
        <div
          className="dropdown-content"
          style={{ display: isActive ? "block" : "none" }}
        >
          <div
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
            className="item"
          >
            One
          </div>
          <div
            className="item"
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
          >
            Two
          </div>
          <div
            className="item"
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
          >
            Three
          </div>
        </div>
      </div>
{/*  */}
      <div className="player-navbar-search">
        <input type='text' placeholder='Try searching Topics' style={{ outline: 'none' }}/>
          <img src={searchIcon} alt='searchIcon'/> 
      </div>
    </div>
  )
}

export default PlayerNavbar
