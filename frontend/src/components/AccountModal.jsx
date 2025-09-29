import React, { useState } from "react";
import { createAccount, updateAccount } from "../services/accountService";
import "../styles/AccountModal.css";

const AccountModal = ({ account, onClose, onSave }) => {
  const [link, setLink] = useState(account ? account.link : "");
  const [name, setName] = useState(account ? account.name : "");
  const [description, setDescription] = useState(account ? account.description : "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!link || !name) {
      setError("Link ve Ad zorunludur.");
      return;
    }
    const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
    if (!regex.test(link)) {
      setError("Geçerli bir link giriniz.");
      return;
    }


    try {
      
      setError("");

      if (account) {
        // Düzenleme
        await updateAccount(account.id, { link, name, description });
      } else {
        // Yeni ekleme
        await createAccount({ link, name, description });
      }

      if (onSave) onSave(); // tabloyu güncellemek için callback
      onClose();
    } catch (err) {
      setError("Bir hata oluştu.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{account ? "Hesap Düzenle" : "Yeni Hesap Ekle"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          
          <label>Sosyal Medya Linki*</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />

          <label>Sosyal Medya Adı*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Açıklama</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="modal-buttons">
            <button type="submit" className="save-btn">
              {account ? "Güncelle" : "Kaydet"}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountModal;
