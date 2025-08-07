---

### ✅ `README.md` para o SkateSpotter

````markdown
# 🛹 SkateSpotter

SkateSpotter is a full-stack web application that allows users to find, rate, and report skate spots across different cities. Built with **Spring Boot** (Java) in the backend and **React + Vite + Tailwind CSS** in the frontend.

---

## 🚀 Features

- 🔐 User authentication (register, login, email verification)
- 📍 Create and browse skate spots
- 🖼️ Upload and crop spot images
- ⭐ Rate and review spots
- 🚨 Report inappropriate or unsafe locations
- 🧠 Filter by difficulty, surface, location, type, and security
- 🎨 Dark mode UI with responsive design

---

## 🛠️ Technologies Used

### Backend
- Java 17
- Spring Boot
- Spring Security
- MySQL
- JWT authentication
- Cloudinary API (for image uploads)

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- react-easy-crop
- Axios

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mOITA94/SkateSpotter.git
cd SkateSpotter

# Install dependencies for frontend
cd Frontend
npm install
npm run dev

# Configure backend
cd ../Backend
# Configure application.properties (DB, email, etc.)
./mvnw spring-boot:run
````

---

## ⚙️ Configuration

* Update database credentials and mail config in:
  `Backend/src/main/resources/application.properties`

* To use Cloudinary for image uploads, configure the Cloudinary credentials.

---

## ✅ Usage

1. Register a new user
2. Verify email through link or code
3. Login
4. Add new skate spots with cropped images
5. Filter, view, and rate existing spots
6. Admins can moderate reports

---

## 👨‍💻 Developer

* **Pedro Ferraz**
  [GitHub](https://github.com/mOITA94)

---

## 📝 License

This project is for academic purposes and not licensed for commercial use.

````

---