import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DataImport from "./pages/DataImport";
import TravelPlan from "./pages/TravelPlan";
import TravelPreviewPage from "./pages/TravelPreviewPage";
import NotFound from "./pages/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tabi-jaws" element={<Home />} />
        <Route path="/tabi-jaws/data" element={<DataImport />} />
        <Route path="/tabi-jaws/travel" element={<TravelPlan />} />
        <Route path="/tabi-jaws/preview" element={<TravelPreviewPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
