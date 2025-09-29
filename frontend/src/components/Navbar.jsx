import React from "react";
import "../styles/Navbar.css";
import {ReactComponent as Logo} from "../assets/rast-mobile-logo.svg";
import { FaYoutube, FaBehance, FaLinkedin, FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
  <a href="https://rastmobile.com/" target="_blank" rel="noopener noreferrer">
    <Logo className="logo-svg"/>
  </a>
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
        <a href="https://www.youtube.com/channel/UC9zhWu89h4AqolHrVspLkVw" target="_blank" rel="noreferrer"><FaYoutube /></a>
        <a href="https://www.behance.net/rastmobile?locale=tr_TR" target="_blank" rel="noreferrer"><FaBehance /></a>
        <a href="https://www.linkedin.com/company/rastmobile/posts/?feedView=all" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        <a href="https://www.instagram.com/mobilerast/" target="_blank" rel="noreferrer"><FaInstagram /></a>
      </div>
    </nav>
  );
};

export default Navbar;
