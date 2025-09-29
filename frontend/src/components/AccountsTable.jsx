import React, { useState, useEffect } from "react";
import { getAccounts, deleteAccount } from "../services/accountService";
import { FaEdit, FaTrash, FaFilter, FaSearch } from "react-icons/fa";
import "../styles/AccountsTable.css";
import AccountModal from "./AccountModal";

const AccountsTable = () => {
  // State değişkenleri
  const [accounts, setAccounts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [showModal, setShowModal] = useState(false); 
  const [selectedAccount, setSelectedAccount] = useState(null); 
  const [showDetailModal, setShowDetailModal] = useState(false); 
  const [search, setSearch] = useState(""); 
  const [rowsPerPage, setRowsPerPage] = useState(4); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState("asc");
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Component mount edildiğinde hesapları çek
  useEffect(() => { fetchAccounts(); }, []);

  // Backend'den hesapları çekme fonksiyonu
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const data = await getAccounts();
      setAccounts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Hesap düzenleme modalını aç
  const handleEdit = (acc) => {
    setSelectedAccount(acc);
    setShowModal(true);
    setShowDetailModal(false); // Detay modalı kapat
  };

  // Hesap silme fonksiyonu
  const handleDelete = async (id) => {
    if (window.confirm("Bu hesabı silmek istediğinize emin misiniz?")) {
      try {
        await deleteAccount(id);
        fetchAccounts(); // Silindikten sonra listeyi güncelle
        setShowDetailModal(false); // Detay modalı kapat
      } catch (err) { console.error(err); }
    }
  };

  // Hesapları sıralama fonksiyonu
  const handleSort = (column) => {
    const newOrder = sortBy === column ? (order === "asc" ? "desc" : "asc") : "asc";
    setSortBy(column);
    setOrder(newOrder);

    const sortedAccounts = [...accounts].sort((a, b) => {
      if (a[column] < b[column]) return newOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setAccounts(sortedAccounts);
  };

  // Arama inputuna göre hesapları filtreleme
  const filteredAccounts = accounts.filter(
    acc =>
      acc.name.toLowerCase().includes(search.toLowerCase()) ||
      acc.link.toLowerCase().includes(search.toLowerCase()) ||
      (acc.description && acc.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Sayfa sayısı ve paginasyon hesaplama
  const pageCount = Math.max(1, Math.ceil(filteredAccounts.length / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedAccounts = filteredAccounts.slice(startIndex, startIndex + rowsPerPage);

  // Sayfa değişikliklerinde currentPage kontrolü
  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
    if (filteredAccounts.length === 0) setCurrentPage(1);
  }, [filteredAccounts.length, rowsPerPage, pageCount, currentPage]);

  // Sayfa geçiş fonksiyonları
  const goToPage = (p) => setCurrentPage(p);
  const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const nextPage = () => setCurrentPage((p) => Math.min(pageCount, p + 1));

  // Yükleniyorsa göster 
  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="accounts-container">
      {/* Top bar: Arama, filtre ve yeni hesap ekleme */}
      <div className="top-bar">
        <div className="left-controls">
          {/* Arama çubuğu */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search objects..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
            <button className="search-btn"><FaSearch /></button>
          </div>

          {/* Filtre ve sıralama butonu */}
          <div className="filter-container">
            <button className="filter-btn" onClick={() => setShowSortOptions(prev => !prev)} title="Filtrele">
              <FaFilter />
            </button>
            {showSortOptions && (
              <div className="sort-dropdown">
                <button onClick={() => handleSort("name")}>Name {order === "asc" ? "↑" : "↓"}</button>
                <button onClick={() => handleSort("link")}>Link {order === "asc" ? "↑" : "↓"}</button>
              </div>
            )}
          </div>
        </div>

        {/* Yeni hesap ekleme butonu */}
        <button className="add-btn" onClick={() => { setSelectedAccount(null); setShowModal(true); }}>
          + Yeni Hesap Ekle
        </button>
      </div>

      {/* Hesap ekleme/düzenleme modalı */}
      {showModal && (
        <AccountModal
          account={selectedAccount}
          onClose={() => setShowModal(false)}
          onSave={fetchAccounts}
        />
      )}

      {/* Hesap detay modalı*/}
      {showDetailModal && selectedAccount && (
        <div className="detail-modal">
          <button className="close-btn" onClick={() => setShowDetailModal(false)}>×</button>
          <h3>Hesap Detayları</h3>
          <div className="detail-box">
            <p><strong>Link:</strong> <a href={selectedAccount.link} target="_blank" rel="noreferrer">{selectedAccount.link}</a></p>
            <p><strong>Adı:</strong> {selectedAccount.name}</p>
            <p><strong>Açıklama:</strong> {selectedAccount.description}</p>
          </div>
          <div className="modal-footer">
            {/* Düzenle butonu - renklendirme burada yapılmış */}
            <button
              className="action-btn edit-btn"
              onClick={() => handleEdit(selectedAccount)}
              style={{ backgroundColor: "#7b2ff7", color: "#fff" }}
            >
              <FaEdit /> Düzenle
            </button>

            {/* Sil butonu */}
            <button className="action-btn delete-btn" onClick={() => handleDelete(selectedAccount.id)}>
              <FaTrash /> Sil
            </button>
          </div>
        </div>
      )}

      {/* Hesap tablosu */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("link")} className="link-col">
                <div className="th-content">
                  <span>Sosyal Medya Linki</span>
                  <span className="sort-arrow">{sortBy === "link" ? (order === "asc" ? "↑" : "↓") : "↕"}</span>
                </div>
              </th>
              <th onClick={() => handleSort("name")} className="name-col">
                <div className="th-content">
                  <span>Sosyal Medya Adı</span>
                  <span className="sort-arrow">{sortBy === "name" ? (order === "asc" ? "↑" : "↓") : "↕"}</span>
                </div>
              </th>
              <th className="desc-col">Açıklama</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAccounts.length === 0 ? (
              <tr><td colSpan="3" style={{ textAlign: "center", padding: "24px" }}>Hiç kayıt bulunamadı.</td></tr>
            ) : (
              paginatedAccounts.map(acc => (
                <tr key={acc.id} onClick={() => { setSelectedAccount(acc); setShowDetailModal(true); }} style={{ cursor: "pointer" }}>
                  <td className="link-col"><a href={acc.link} target="_blank" rel="noreferrer">{acc.link}</a></td>
                  <td className="name-col">{acc.name}</td>
                  <td className="desc-col">{acc.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Sayfalama */}
      <div className="pagination">
        <div className="rows-per-page">
          <span>Show:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(parseInt(e.target.value,10)); setCurrentPage(1); }}>
            <option value={4}>4 rows</option>
            <option value={8}>8 rows</option>
            <option value={12}>12 rows</option>
          </select>
        </div>
        <div className="page-controls">
          <button className="page-btn" onClick={prevPage} disabled={currentPage === 1}>«</button>
          {Array.from({ length: pageCount }).map((_, idx) => (
            <button key={idx+1} className={`page-btn ${currentPage===idx+1?"active":""}`} onClick={() => goToPage(idx+1)}>{idx+1}</button>
          ))}
          <button className="page-btn" onClick={nextPage} disabled={currentPage===pageCount}>»</button>
        </div>
      </div>
    </div>
  );
};

export default AccountsTable;
