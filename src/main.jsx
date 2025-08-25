import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'remixicon/fonts/remixicon.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div className="container mx-auto px-9">
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>
);
