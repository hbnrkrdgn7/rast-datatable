import React from "react";
import AccountsTable from "./components/AccountsTable"; 
import Navbar from "./components/Navbar"; // Navbar'ı ekledik
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Üst Menü (Navbar) */}
      <Navbar />

      {/* Hesaplar Tablosu */}
      <div className="content">
        <AccountsTable />
      </div>
    </div>
  );
}

export default App;
