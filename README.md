---

## 📂 API Endpoints

All routes are prefixed with `/api/auth`.

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register a new user + send welcome email | No |
| POST | `/login` | Log in an existing user | No |
| POST | `/logout` | Log out the current user | No |
| POST | `/send-verify-otp` | Send an email verification OTP | Yes |
| POST | `/verify-account` | Verify account using OTP | Yes |
| GET | `/is-auth` | Check if the current user is authenticated | Yes |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/ShieldLogin.git
cd ShieldLogin
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```dotenv
PORT=4000
NODE_ENV=development

MONGODB_URI=
JWT_SECRET=

SMTP_USER=
SMTP_PASS=
SENDER_EMAIL=
```

Start the backend server:

```bash
npm run server
```

The backend runs on `http://localhost:4000` (or whichever `PORT` you set).

### 3. Set up the frontend

```bash
cd ../client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` (default Vite port).

> ⚠️ Never commit your `.env` file — it's already excluded via `.gitignore`.

---

## 🔐 Security Notes

- Passwords are hashed with **bcrypt** before being stored — plain-text passwords are never saved.
- Auth tokens are stored in **httpOnly cookies**, reducing exposure to XSS attacks.
- OTPs expire automatically after a set time window.
- CORS is configured with `credentials: true` to safely support cookie-based auth across frontend and backend origins.

---

## 📌 Roadmap

- [ ] Forgot password / reset password flow
- [ ] Rate limiting on auth routes
- [ ] Refresh token support

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built as a full-stack authentication learning project — feedback and contributions welcome!* 🚀