# TechBoutik — Boutique e-commerce Dropshipping IT

Application e-commerce **full-stack** de dropshipping électronique et high-tech, construite avec **Next.js 16**, App Router, Server Actions et une architecture pensée pour la production.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 16.2 — App Router + Server Actions |
| UI | React 19, Tailwind CSS 4 |
| Langue | TypeScript strict |
| Auth | next-auth v4 (credentials + extensible OAuth) |
| ORM | Prisma (en mode démo : store mémoire sans DB) |
| Validation | Zod v4 |
| Polices | IBM Plex Sans, Space Grotesk (via `next/font`) |

---

## Fonctionnalités actuelles

### Storefront public
- **Slideshow hero** automatique et configurable depuis l'administration
- **Catalogue produits** avec fiche produit détaillée et ajout au panier
- **Catégories** filtrables
- **Panier** avec modification des quantités et suppression
- **Checkout** avec récapitulatif et confirmation de commande simulée
- **Suivi de commandes** — timeline progressive (En préparation → Expédiée → Livrée)
- **Mode clair/sombre automatique** selon l'heure (clair 7h–19h, sombre 19h–7h)

### Administration
- **Dashboard** avec statistiques (produits, commandes, clients)
- **Gestion des produits** — création, modification, suppression avec upload d'image
- **Gestion des commandes** — vue admin avec statut
- **Gestion des clients**
- **Paramètres boutique** — nom, slogan, localisation, logo, bannières hero, vitesse du slideshow (tout configurable sans base de données)

### Pages légales et informations
- Mentions légales
- Conditions Générales de Vente
- Politique de confidentialité
- Retours et remboursements
- FAQ / Support
- Société
- Partenaires

---

## Mode démonstration

L'application fonctionne **sans base de données** grâce à un store mémoire (`lib/mock-store.ts`) et une configuration boutique persistée localement en JSON (`data/storefront.json`).

**Comptes de test :**

| Rôle | Email | Mot de passe |
|---|---|---|
| Administrateur | `admin@demo.local` | `Admin123!` |
| Client | `client@demo.local` | `Client123!` |

Les uploads (logo, bannières, images produits) sont enregistrés dans `public/uploads/`.

---

## Structure du projet

```
app/
├── (shop)/          # Storefront public (catalogue, panier, commandes)
├── (auth)/          # Connexion et inscription
├── admin/           # Back-office (produits, commandes, parametres)
├── api/auth/        # Route handler next-auth
└── globals.css      # Theme Tailwind + tokens adaptatifs light/dark

components/
├── auth/            # Formulaires login et register
├── admin/           # Formulaires produit et configuration boutique
└── storefront/      # Hero slideshow, footer

lib/
├── mock-store.ts         # Store memoire (catalogue, panier, commandes)
├── storefront-config.ts  # Lecture/ecriture de data/storefront.json
├── catalog.ts            # Fonctions de lecture catalogue avec cache Next.js
└── auth-guards.ts        # Helpers requireUser / requireRole

actions/             # Server Actions (auth, produits, panier, commandes, admin)
validators/          # Schemas Zod (auth, produits)
data/
└── storefront.json  # Configuration boutique persistee localement
public/uploads/      # Assets uploades depuis l'administration
```

---

## Lancer le projet

```bash
# Installer les dependances
npm install

# Lancer en developpement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

L'administration est accessible à [http://localhost:3000/admin](http://localhost:3000/admin) — connexion admin requise.

---

## Variables d'environnement

Copier `.env.example` vers `.env` et renseigner les valeurs :

```env
# Session
AUTH_SECRET=<secret-aleatoire-long>
AUTH_URL=http://localhost:3000

# Base de donnees (requis pour passer hors mode demo)
DATABASE_URL=postgresql://user:password@host:5432/techboutik

# Optionnel — Paiement Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Optionnel — Emails Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Optionnel — Images Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Optionnel — Auth Google
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

---

## Prochaines etapes (production)

1. Connecter PostgreSQL + Supabase et activer les migrations Prisma
2. Integrer Stripe Checkout (webhook pour mise a jour du statut de commande)
3. Integrer Resend pour les emails de confirmation
4. Uploader les assets vers Cloudinary plutot que le dossier local
5. Deployer sur Vercel + base de donnees Supabase

---

## Partenaires dropshipping

AliExpress · Temu · Amazon Supplier · Fournisseurs prives
