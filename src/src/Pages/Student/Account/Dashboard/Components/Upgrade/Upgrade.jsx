import React from 'react';
import "./Upgrade.scss";

import UpgradeImage from "./Assets/Group.png";

const Upgrade = () => {
  return (
    <div className='Upgrade'>
      <h4>Careerpedia</h4>
      <img src={UpgradeImage} alt=""/>
      <button className="Upgrade-button">Upgrade</button>
    </div>
  )
}

export default Upgrade