import React from "react";
import "../styles/Navbar.css";
import {ReactComponent as Logo} from "../assets/rast-mobile-logo.svg";
import { FaYoutube, FaBehance, FaLinkedin, FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
         <Logo className="logo-svg"/>
      </div>


      {/* Menü Linkleri */}
      <ul className="navbar-links">
        <li><a href="#about">Hakkımızda</a></li>
        <li><a href="#jury">Jüri - Yarışma Yazılımı</a></li>
        <li><a href="#word-ninja">Word Ninja</a></li>
        <li><a href="#word-pyramids">Word Pyramids</a></li>
      </ul>

      {/* Sosyal Medya İkonları */}
      <div className="navbar-icons">
        <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
        <a href="https://behance.net" target="_blank" rel="noreferrer"><FaBehance /></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        <a href="https://instagram.https://www.instagram.com/mobilerast/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noreferrer"><FaInstagram /></a>
      </div>
    </nav>
  );
};

export default Navbar;
