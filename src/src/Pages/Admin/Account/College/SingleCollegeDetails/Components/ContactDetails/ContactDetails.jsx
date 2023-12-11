import React from 'react';
import "./ContactDetails.scss";


const ContactData = {
  AddressLine: "2326 Smithfield Avenue",
  City: "Lubbock",
  District: "Gleneden",
  State: "Texas",
  PinCode: 79401,
  Country: "United States",
};


const ContactDetails = () => {
  return (
    <div className="contact-details">
    <div className="contact-heading">
      <h2>Contact Details</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
        vulputate libero et velit interdum
      </p>
    </div>
    <div className="contact-list">
        <div className="contact-data">
          <div className="keys">
            <h3>Address line</h3>
            <h3>City</h3>
            <h3>District</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{ContactData.AddressLine}</p>
            <p>{ContactData.City}</p>
            <p>{ContactData.District}</p>
          </div>
        </div>

        <div className="contact-data">
          <div className="keys">
            <h3>State</h3>
            <h3>Pin Code</h3>
            <h3>Country</h3>
          </div>
          <div className="keys">
            <h4>:</h4>
            <h4>:</h4>
            <h4>:</h4>
          </div>
          <div className="keys">
            <p>{ContactData.State}</p>
            <p>{ContactData.PinCode}</p>
            <p>{ContactData.Country}</p>
          </div>
        </div>
    </div>
  </div>
  )
}

export default ContactDetails