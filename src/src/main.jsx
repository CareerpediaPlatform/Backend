import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
//Router
import { BrowserRouter } from "react-router-dom";

//Context
import SidebarContext from "./Context/SidebarContext";

// Redux
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <SidebarContext>
        <App />
      </SidebarContext>
    </Provider>
  </BrowserRouter>
);
