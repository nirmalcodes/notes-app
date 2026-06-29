# MemoPad 📝

A secure, privacy-first note-taking web application where every note is encrypted and accessible only by you.

🔗 **Live Demo:** [https://memopadlk.web.app](https://memopadlk.web.app)

---

## Features

- 🔐 **End-to-end note encryption** — notes are encrypted using `crypto-js` before being stored in Firestore; only you can read them
- 🔑 **Multiple authentication methods** — sign in with Email/Password or Google OAuth
- 📱 **Responsive masonry layout** — clean, Pinterest-style note grid that adapts to any screen size
- ⚡ **Fast and lightweight** — built with Vite for near-instant load times
- 🎨 **Accessible UI** — built with Headless UI and Tailwind CSS for a clean, accessible experience
- 🛡️ **Error boundaries** — graceful error handling to prevent full-page crashes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS, Headless UI |
| Authentication | Firebase Auth (Email/Password + Google OAuth) |
| Database | Firebase Firestore |
| Storage | Firebase Storage |
| Encryption | crypto-js |
| Routing | React Router DOM v6 |
| Date Handling | date-fns |
| Code Quality | ESLint, Prettier |
| Deployment | Firebase Hosting |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Authentication and Firestore enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/nirmalcodes/notes-app.git
cd notes-app

# Install dependencies
npm install
```

### Environment Setup

Copy the example environment file and fill in your Firebase config:

```bash
cp .env.example .env
```

Your `.env` should contain your Firebase project credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Running Locally

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Deploying to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Route-level page components
├── hooks/            # Custom React hooks
├── firebase/         # Firebase config and service helpers
├── utils/            # Utility functions (including encryption helpers)
└── main.jsx          # App entry point
```

---

## Security

- Notes are encrypted client-side using `crypto-js` before being written to Firestore
- Firebase Security Rules are configured to ensure users can only access their own data
- Environment variables are used for all Firebase credentials — never hardcoded

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Nirmal Fernando**
- Portfolio: [srnfernando.vercel.app](https://srnfernando.vercel.app)
- GitHub: [@nirmalcodes](https://github.com/nirmalcodes)
- LinkedIn: [Nirmal Fernando](https://linkedin.com/in/srnfernando)
