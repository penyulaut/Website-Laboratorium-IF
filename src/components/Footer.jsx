import React from "react";

const Footer = () => {
    return (
        <footer className="text-gray-300 py-6 mt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                    <span className="font-semibold text-lg">Laboratorium Informatika</span>
                    <span className="ml-2 text-sm">&copy; {new Date().getFullYear()} All rights reserved.</span>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-white transition">Home</a>
                    <a href="#" className="hover:text-white transition">About</a>
                    <a href="#" className="hover:text-white transition">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;