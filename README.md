# Electronics E-commerce Website

This workspace contains a complete e-commerce project with:
- React frontend
- Node.js + Express backend
- Product catalog and cart API
- User authentication (register/login)
- Stripe payment integration

## Setup

### Installation rapide (tout en une commande)
```bash
npm run install-all
```

### Installation manuelle
1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Lancement

### Mode développement (frontend + backend simultanément)
```bash
npm run dev
```

### Lancer uniquement le backend
```bash
npm run start-backend
```

### Lancer uniquement le frontend
```bash
npm run start-frontend
```

### Build frontend pour production
```bash
npm run build-frontend
```

### Mode production (frontend + backend)
```bash
npm run prod
```

## Scripts disponibles

### Root package.json
- `npm run install-all` - Installe toutes les dépendances
- `npm run dev` - Lance backend et frontend en développement
- `npm run start-backend` - Lance uniquement le backend
- `npm run start-frontend` - Lance uniquement le frontend
- `npm run build-frontend` - Build le frontend pour production
- `npm run prod` - Lance l'app en production

### Backend scripts
- `npm start` - Lance le serveur (production)
- `npm run dev` - Lance avec nodemon (développement)
- `npm run debug` - Lance en mode debug (port 9229)
- `npm run prod` - Lance en mode production avec NODE_ENV=production

### Frontend scripts
- `npm start` - Lance le dev server
- `npm run build` - Build pour production
- `npm run serve` - Sert le build de production
- `npm test` - Lance les tests

## Notes

- The backend uses in-memory data storage for demo purposes.
- Replace Stripe keys in `backend/.env` and `frontend/.env` with real values before production use.
- The app uses local storage for user session persistence.
# test-vs
ntm yeah man !