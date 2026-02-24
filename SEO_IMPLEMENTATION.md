# SEO, structured data & tracking – résumé de l’implémentation

## 1. Métadonnées (Metadata API App Router)

- **`src/lib/seo.ts`**  
  Config centralisée : `BASE_URL`, `defaultMetadata`, `buildCanonical()`, helpers JSON-LD.

- **Layout principal `(site)/layout.tsx`**  
  Export de `metadata` basé sur `defaultMetadata` (metadataBase, title template, description, keywords, openGraph, twitter, robots, verification).

- **Pages mises à jour**  
  Chaque page définit des métadonnées cohérentes (sans doublon avec le layout) :
  - **title** : court, le template du layout ajoute ` | Janitorial Appointments`.
  - **description** : unique et orientée SEO.
  - **alternates.canonical** : via `buildCanonical(path)`.
  - **openGraph** : title, description, type, url.
  - **twitter** : card, title, description.
  - **robots** : `noindex` pour `/account` et 404, `index, follow` ailleurs.

Pages concernées : `page.tsx` (home), `about`, `contact`, `pricing`, `faqs`, `blog`, `commercial-cleaning-leads`, `commercial-cleaning-leads/[state]`, `commercial-cleaning-leads/[state]/[leadId]`, `account`, `[slug]` (article), `not-found`.

---

## 2. Données structurées (JSON-LD)

- **Layout (site)**  
  - **Organization** : nom, url, description, adresse (Brooklyn), contact, sameAs (Facebook).  
  - **WebSite** : nom, url, description, publisher.

- **Articles `[slug]`**  
  - **BlogPosting** : headline, description, image, datePublished/dateModified, author, publisher, url.  
  - **BreadcrumbList** : Accueil → Blog → titre de l’article.

- **Pages état `commercial-cleaning-leads/[state]`**  
  - **Service** : nom, description, url, areaServed (State).  
  - **BreadcrumbList** : Accueil → Commercial Cleaning Leads → nom de l’état.

- **Pages lead `commercial-cleaning-leads/[state]/[leadId]`**  
  - **Place** (existant) : nom, adresse, description, url, publisher.  
  - **BreadcrumbList** : Accueil → Commercial Cleaning Leads → état → titre du lead.

---

## 3. SEO technique

- **`src/app/sitemap.ts`**  
  Sitemap dynamique :
  - URLs statiques : `/`, `/contact`, `/pricing`, `/about`, `/faqs`, `/blog`, `/commercial-cleaning-leads`.
  - États : `/commercial-cleaning-leads/[state]`.
  - Articles (DB) : `/[slug]`.
  - Leads (DB, max 5000) : `/commercial-cleaning-leads/[state]/[leadId]`.  
  Utilise `BASE_URL` depuis `@/lib/seo`.

- **`src/app/robots.ts`**  
  Génération de `robots.txt` :
  - `allow: /`
  - `disallow`: `/account`, `/dashboard/`, `/signin`, `/signup`, `/forgot-password`, `/reset-password/`, `/unauthorized`
  - `sitemap`: `{BASE_URL}/sitemap.xml`
  - `host`: `BASE_URL`

---

## 4. Google Tag Manager (GTM)

- **Layout `(site)/layout.tsx`**  
  - Script GTM chargé via `next/script` avec `strategy="afterInteractive"`.  
  - Balise `noscript` avec iframe vers `googletagmanager.com/ns.html`.  
  - ID lu depuis `process.env.NEXT_PUBLIC_GTM_ID` ; si absent, rien n’est injecté.

---

## 5. Google Search Console

- **Vérification**  
  Gérée par la Metadata API dans `defaultMetadata` (`src/lib/seo.ts`) :  
  `verification: { google: process.env.GOOGLE_SITE_VERIFICATION }`.  
  Aucun code de vérification en dur.

- **Compatibilité**  
  `sitemap.xml` et `robots.txt` pointent correctement vers le site et le sitemap.

---

## 6. Qualité / conventions

- Pas de balises `<head>` manuelles pour les meta : tout passe par la Metadata API.
- Canonicals et BASE_URL centralisés dans `@/lib/seo`.
- Structure et conventions du projet conservées ; pas de changement de layout/UI.

---

## Entrées manuelles à prévoir

1. **`NEXT_PUBLIC_GTM_ID`**  
   Dans `.env` ou `.env.local` : ID du conteneur GTM (ex. `GTM-XXXXXXX`) pour activer le script et le noscript sur tout le site public.

2. **`GOOGLE_SITE_VERIFICATION`**  
   Dans `.env` (ou `.env.local`) : uniquement la valeur du contenu de la meta tag de vérification fournie par Search Console (pas la balise complète).

3. **`NEXT_PUBLIC_SITE_URL`** (recommandé)  
   URL canonique du site (ex. `https://janitorialappointments.com`). Si non défini, la valeur par défaut dans `src/lib/seo.ts` est utilisée.

Un fichier **`.env.example`** a été ajouté avec ces variables en commentaire pour servir de référence.

---

## Fichiers créés ou modifiés

| Fichier | Action |
|--------|--------|
| `src/lib/seo.ts` | **Créé** – config SEO et helpers JSON-LD |
| `src/app/(site)/layout.tsx` | **Modifié** – metadata, GTM, JSON-LD Organization + WebSite |
| `src/app/robots.ts` | **Créé** – génération de robots.txt |
| `src/app/sitemap.ts` | **Modifié** – BASE_URL centralisé, blog + leads dans le sitemap |
| `src/app/(site)/page.tsx` | **Modifié** – canonical, OG, Twitter |
| `src/app/(site)/about/page.tsx` | **Modifié** – idem |
| `src/app/(site)/contact/page.tsx` | **Modifié** – idem |
| `src/app/(site)/pricing/page.tsx` | **Modifié** – idem |
| `src/app/(site)/faqs/page.tsx` | **Modifié** – idem |
| `src/app/(site)/blog/page.tsx` | **Modifié** – idem + description / blog title |
| `src/app/(site)/commercial-cleaning-leads/page.tsx` | **Modifié** – canonical, OG, Twitter, SITE_NAME |
| `src/app/(site)/commercial-cleaning-leads/[state]/page.tsx` | **Modifié** – metadata via buildCanonical, Service + Breadcrumb JSON-LD |
| `src/app/(site)/commercial-cleaning-leads/[state]/[leadId]/page.tsx` | **Modifié** – buildCanonical, Breadcrumb JSON-LD |
| `src/app/(site)/[slug]/page.tsx` | **Modifié** – generateMetadata complète, Article + Breadcrumb JSON-LD |
| `src/app/(site)/account/page.tsx` | **Modifié** – canonical, robots noindex |
| `src/app/(site)/not-found.tsx` | **Modifié** – title/description, robots noindex |
| `.env.example` | **Créé** – variables optionnelles GTM, vérification, SITE_URL |
