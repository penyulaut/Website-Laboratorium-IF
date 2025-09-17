import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LabStatusBar from "./components/LabStatusBar.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import ArtikelFull from "./pages/ArtikelFull.jsx";
import Reservation from "./pages/Reservation.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "remixicon/fonts/remixicon.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div className="container mx-auto px-9">
        {/* <LabStatusBar /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/artikel" element={<ArtikelFull />} />
          <Route path="/reservasi" element={<Reservation />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>
);
