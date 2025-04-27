# Birthday Tracker

> Kullanıcıların arkadaşlarının doğum günlerini takip edebildiği fullstack bir web uygulamasıdır.

---

## 🚀 Proje Özellikleri

- Kullanıcı kayıt ve giriş işlemleri (JWT Authentication).
- Arkadaş ekleme, güncelleme ve silme.
- Arkadaş doğum günü takibi (yaklaşan doğum günleri vurgulama).
- İsim veya kategoriye göre arkadaş arama.
- Modern ve responsive frontend arayüz (React).
- Backend NestJS ile geliştirilmiş RESTful API.
- Swagger ile API dokümantasyonu.
- SQLite kullanılarak veri yönetimi.

---

## 🛠️ Kullanılan Teknolojiler

| Katman | Teknolojiler |
|:--|:--|
| Backend | NestJS, TypeORM, SQLite, JWT |
| Frontend | React (Vite + TypeScript), Fetch API, React Router |
| Deployment | (Deployment adımları deploy sonrası eklenecek) |

---

## ⚙️ Kurulum ve Çalıştırma

### Backend (Server)

```bash
cd birthday-tracker-backend
npm install
npm run start:dev
```

> Sunucu `localhost:3000` üzerinde çalışır.  
> Swagger API dokümantasyonu: `http://localhost:3000/api`

### Frontend (Client)

```bash
cd birthday-tracker-frontend
npm install
npm run dev
```

> Frontend `localhost:5173` portunda çalışır.

---

## 🔐 API Endpointleri

| Endpoint | Açıklama |
|:--|:--|
| POST /users/register | Kullanıcı kaydı |
| POST /users/login | Kullanıcı girişi |
| GET /friends | Tüm arkadaşları getirir |
| POST /friends | Yeni arkadaş ekler |
| PUT /friends/:id | Arkadaşı günceller |
| DELETE /friends/:id | Arkadaşı siler |
| GET /friends/upcoming | Yaklaşan doğum günlerini getirir |
| GET /friends/search | İsim/kategoriye göre arama yapar |

---

## 💻 Kullanım Senaryosu

1. Kullanıcı `/register` sayfasından kayıt olur.
2. `/login` sayfasından giriş yapar.
3. Dashboard ekranında:
    - Arkadaş ekler,
    - Arkadaşları listeler,
    - Yaklaşan doğum günlerini vurgulu görür,
    - Arkadaşlarını güncelleyebilir veya silebilir.
4. Arkadaşları isim veya kategoriye göre arayabilir.

---

## ✨Ekstra Özellikler

Global Validation:Tüm API endpointlerinde DTO yapısı kullanılarak input validation yapılmıştır. Eksik veya hatalı veri için 400 Bad Request hatası verilir.

Global Exception Filter:Bütün hatalar merkezi bir exception filter ile yakalanır ve standart hata formatında kullanıcıya dönülür.

API Response Helper:Tüm başarılı cevaplar tutarlı JSON yapısında standartlaştırılmıştır.

Global Logging:Gelen tüm istekler ve oluşan hatalar backend tarafında loglanır.

JWT Authorization:Tüm korumalı endpointlere erişim JWT token ile sağlanır. Swagger UI Bearer Auth desteği vardır.

Swagger API Dokümantasyonu:Swagger UI kullanılarak tüm API endpointleri test edilebilir.

---
## 📦 Deployment

Katman	    Platform	Link
Backend	    Render	    https://birthday-tracker-backend.onrender.com
Frontend	Netlify	    https://birthday-tracker-frontend.netlify.app

---

## 📈 Swagger API Kullanımı

- API Dökümantasyonu: `http://localhost:3000/api`
- Bearer Token ile yetkilendirme gerektirir.

---