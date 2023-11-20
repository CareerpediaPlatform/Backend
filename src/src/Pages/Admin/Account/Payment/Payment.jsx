import "./Payment.scss";
import { useContext, useState } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/Admin/Navbar/Navbar";
import Sidebar from "../../../../Components/Admin/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Component
import PaymentsList from "./PaymentsList/PaymentsList";

const Payment = () => {
  const { close } = useContext(SideBarContext);
  return (
    <div className="admin-payments">
      <Sidebar />
      <div className="admin-payment-content">
        <Navbar type="payment" />
        <div
          className="payment-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >        
          <PaymentsList />
        </div>
      </div>
    </div>
  );
};

export default Payment;
