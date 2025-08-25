import React from "react";

const Footer = () => {
    return (
        <footer className="text-gray-300 py-6 mt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                    <span className="font-semibold text-lg">Laboratorium Informatika</span>
                    <span className="ml-2 text-sm">&copy; {new Date().getFullYear()} All rights reserved.</span>
                </div>
                <div className="flex space-x-4 items-center">
                    <a href="/" className="hover:text-white transition">Home</a>
                    <a href="/#tentang" className="hover:text-white transition">About</a>
                    <a href="/#admin" className="hover:text-white transition hidden">Admin (legacy)</a>
                    <a href="/#kontak" className="hover:text-white transition">Contact</a>
                    <a href="/admin" className="hover:text-white transition font-semibold border border-violet-600 px-3 py-1 rounded hover:bg-violet-600 hover:text-white">Admin</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;