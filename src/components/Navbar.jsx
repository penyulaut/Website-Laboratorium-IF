import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar py-7 flex justify-between items-center ${active ? "bg-white shadow-md" : ""}`}>
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-10"/>
        <h1 className="text-3xl font-bold">Lab Informatika</h1>
      </div>
      {/* Burger menu button */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-8 h-8"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
        <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
      </button>
      {/* Menu */}
      <div className={`navbar lg:flex ${menuOpen ? "flex" : "hidden"} flex-col lg:flex-row absolute lg:static top-20 right-0 bg-zinc-900 lg:bg-transparent w-full lg:w-auto px-7 lg:px-0 py-5 lg:py-0 shadow-lg lg:shadow-none z-50`}>
        <ul className="flex flex-col lg:flex-row align-center gap-5">
          <li><a href="/" className="sm:text-lg text-base font-medium" onClick={()=>setMenuOpen(false)}>Beranda</a></li>
          <li><a href="/#tentang" className="sm:text-lg text-base font-medium" onClick={()=>setMenuOpen(false)}>Tentang</a></li>
            <li><a href="/#articles" className="sm:text-lg text-base font-medium" onClick={()=>setMenuOpen(false)}>Artikel</a></li>
          <li><a href="/#calendar" className="sm:text-lg text-base font-medium" onClick={()=>setMenuOpen(false)}>Jadwal</a></li>
          <li><a href="/#kontak" className="sm:text-lg text-base font-medium" onClick={()=>setMenuOpen(false)}>Kontak</a></li>
          <li><a href="/admin" className="sm:text-lg text-base font-medium text-violet-400 hover:text-violet-300" onClick={()=>setMenuOpen(false)}>Admin</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;