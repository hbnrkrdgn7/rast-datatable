Hesap Yönetim Tablosu Uygulaması

Bu proje, React (frontend) ve Node.js + Express (backend) kullanılarak geliştirilmiş bir hesap yönetim tablosu uygulamasıdır.
Kullanıcılar yeni hesap ekleyebilir, mevcut hesapları düzenleyebilir, silebilir ve tablo üzerinde arama, filtreleme, sıralama, sayfalama işlemleri yapabilir. Ayrıca Postman ile API testleri yapılabilir.

Özellikler
Hesap listesi görüntüleme
Yeni hesap ekleme / düzenleme / silme (CRUD)
Arama (Search bar)
Filtreleme ve sıralama (ASC / DESC)
Sayfalama (Pagination)
Detay modal (hesap bilgilerini gösterme)
Postman ile test edilebilir REST API

Teknolojiler

Frontend: React, React Hooks, React Icons, CSS
Backend: Node.js, Express.js, CORS
Database: SQLite / PostgreSQL / MySQL (istediğin veritabanı)
API Testleri: Postman

Gerekli Araçlar ve Sürümler

Node.js >= 18.x
npm >= 9.x
Veritabanı (SQLite / PostgreSQL / MySQL)
Git

Kurulum
Backend

Backend dizinine geç:
cd backend

Gerekli paketleri yükle:
npm install

.env dosyasını oluştur ve örneğini ekle:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=accounts_db
CORS_ORIGIN=http://localhost:3000


Not: CORS_ORIGIN frontend’in çalıştığı portu belirtir.
Veritabanı kurulum / migration / seed adımları:
Veritabanı oluştur: accounts_db
Migration veya seed script varsa çalıştır:
node db/migrate.js
node db/seed.js

Backend’i başlat:

npm run dev
Çalıştırma: http://localhost:5000

Frontend

Frontend dizinine geç:
cd frontend

Gerekli paketleri yükle:
npm install

Frontend’i başlat:

npm start
Çalıştırma: http://localhost:3000

Geliştirme ve Prod Build Komutları
Geliştirme modu:

npm start

Üretim (production) build:

npm run build

Build klasörü frontend/build altında oluşturulur.

Backend API Endpointleri
Metod  	Endpoint	           Açıklama
GET 	  /api/accounts	     Tüm hesapları getirir
GET 	  /api/accounts/:id	 Tek bir hesabı getirir
POST	  /api/accounts	     Yeni hesap ekler
PUT	    /api/accounts/:id	 Hesap günceller
DELETE	/api/accounts/:id	 Hesap siler

Postman Kullanımı

Postman aç
Yeni bir koleksiyon oluştur
Aşağıdaki istekleri ekle:

Tüm hesapları getir
GET http://localhost:5000/api/accounts

Tek hesap getir
GET http://localhost:5000/api/accounts/1

Yeni hesap ekle
POST http://localhost:5000/api/accounts
Content-Type: application/json

Body:

{
  "name": "Instagram",
  "link": "https://instagram.com/test",
  "description": "Kişisel hesap"
}

Hesap güncelle
PUT http://localhost:5000/api/accounts/1
Content-Type: application/json

Body:

{
  "name": "Instagram (Güncel)",
  "link": "https://instagram.com/updated",
  "description": "Güncellenmiş hesap"
}

Hesap sil
DELETE http://localhost:5000/api/accounts/1

CORS Yapılandırma Notu

Backend’de CORS kullanımı:

const cors = require("cors");

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
