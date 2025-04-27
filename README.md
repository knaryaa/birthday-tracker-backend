# 🎂 Birthday Tracker

> Kullanıcıların arkadaşlarının doğum günlerini kolayca takip edebildiği fullstack bir web uygulaması.

---

## 🚀 Proje Özellikleri

- Kullanıcı kayıt ve giriş işlemleri (JWT Authentication).
- Arkadaş ekleme, listeleme, güncelleme ve silme.
- Yaklaşan doğum günlerinin vurgulanması.
- İsim veya kategoriye göre arkadaş arama.
- Modern ve responsive frontend arayüz (React + Vite).
- Backend NestJS ile geliştirilmiş RESTful API.
- SQLite kullanılarak hızlı ve hafif veri yönetimi.
- Tam entegre E2E (End-to-End) testler.
- Loglama, Validation ve Exception Handling özellikleri.
- Production ortamı için hazır yapılandırma (CORS, Throttle Guard, Interceptor).

---

## 🛠️ Kullanılan Teknolojiler

| Katman | Teknolojiler |
|:--|:--|
| Backend | NestJS, TypeORM, SQLite, JWT, Swagger |
| Frontend | React (Vite + TypeScript), Fetch API, React Router |
| Deployment | Render.com (Backend) + Netlify (Frontend) |

---

## ⚙️ Kurulum ve Çalıştırma

### Backend (Server)

```bash
cd birthday-tracker
npm install
npm run start:dev
```

> Sunucu: `http://localhost:3000`  
> API Dokümantasyonu: `http://localhost:3000/api`

### Frontend (Client)

```bash
cd birthday-tracker-frontend
npm install
npm run dev
```

> Frontend: `http://localhost:5173`

---

## 🔐 API Endpointleri

| Yöntem | URL | Açıklama |
|:--|:--|:--|
| POST | `/users/register` | Kullanıcı kaydı |
| POST | `/users/login` | Kullanıcı girişi |
| GET | `/friends` | Tüm arkadaşları getirir |
| POST | `/friends` | Yeni arkadaş ekler |
| PUT | `/friends/:id` | Arkadaşı günceller |
| DELETE | `/friends/:id` | Arkadaşı siler |
| GET | `/friends/upcoming` | Yaklaşan doğum günlerini listeler |
| GET | `/friends/search?name=...&category=...` | İsim ve kategoriye göre arama yapar |

---

## ✨ Ekstra Özellikler

- **Global Validation:** DTO seviyesinde validation, hatalı isteklerde detaylı hata mesajları.
- **Global Exception Filter:** Merkezî hata yönetimi ve özel hata yanıtları.
- **API Response Helper:** Başarılı dönüşler için standart JSON formatı.
- **Global Logging:** Her istek ve hata detaylı olarak loglanır.
- **JWT Authorization:** Bearer Token kullanımı ve Swagger entegrasyonu.
- **Throttle Guard:** Brute force saldırılarına karşı rate limiting koruması.
- **Swagger API Dokümantasyonu:** Swagger UI ile tüm endpointleri test edebilme.
- **SPA Routing (Netlify history fallback):** Sayfa yenilendiğinde 404 hatası engellenmiştir.

---

## 📈 Kullanım Akışı

1. `/register` sayfasından kullanıcı kaydı yapılır.
2. `/login` ile giriş yapılır.
3. Dashboard ekranında:
   - Arkadaşlar eklenir, listelenir, güncellenir, silinir.
   - Yaklaşan doğum günleri ayrı bir sekmede vurgulanır.
   - İsim veya kategoriye göre arama yapılır.
4. Çıkış butonu ile oturum sonlandırılır.

---

## 🧪 E2E (End-to-End) Testler

Testler **Jest + Supertest** kullanılarak yazıldı.

> Test Komutu:

```bash
npm run test:e2e
```

**Test Edilenler:**
- Kullanıcı kaydı.
- Kullanıcı girişi.
- Arkadaş ekleme.
- Arkadaş listeleme.
- Arkadaş güncelleme.
- Arkadaş silme.

**Test Sonucu:**

```bash
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

✅ Başarıyla tüm işlemler testten geçmektedir.

---

## 📦 Deployment

| Katman | URL |
|:--|:--|
| Backend | [https://birthday-tracker-backend.onrender.com](https://birthday-tracker-backend.onrender.com) |
| Frontend | [https://birthday-tracker-frontend.netlify.app](https://birthday-tracker-frontend.netlify.app) |

> Frontend ile Backend arasındaki iletişim CORS ayarları ile güvenli şekilde sağlanmaktadır.

---

## 📄 Swagger API Kullanımı

- Swagger UI adresi: `https://birthday-tracker-backend.onrender.com/api`
- Tüm endpointler test edilebilir.
- Bearer Auth ile JWT token girilerek yetkili işlemler yapılabilir.

---