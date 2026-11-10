// src/data/siteConfig.ts

// ─────────────────────────────────────────────────────────────────────────
// [OPTIM] TARIF : UNE SEULE SOURCE DE VÉRITÉ
// Avant, le prix était recopié à la main dans 12 endroits et sous 2 écritures
// ("1500 €" et "1 600 €"). Résultat : le passage à 1500 € en avait oublié 6
// (page Vienne, FAQ À propos, llms.txt), que la recherche "1600" ne voyait pas.
// Pour changer le tarif : modifier UNIQUEMENT le nombre ci-dessous, puis
// `npm run build`. Toutes les pages et les données Google suivent.
// (Seul public/llms.txt reste un fichier texte à corriger à la main : le test
//  « le tarif est le même partout » échoue tant qu'il n'est pas à jour.)
// ─────────────────────────────────────────────────────────────────────────
const PRICE_AMOUNT = 1500;
// Espace insécable (caractère n°160) : empêche le navigateur de couper le prix
// en fin de ligne ("1" d'un côté, "500 €" de l'autre). Écrit avec son numéro
// pour rester visible dans le code — un vrai espace insécable ne se voit pas.
const NBSP = String.fromCharCode(160);

export const siteConfig = {
    title: "Photo et dragée",
    description: "Photo & Dragée — Hedi, photographe de mariage à Vienne (Isère) & Lyon. Reportages de mariage éditoriaux et authentiques en Auvergne-Rhône-Alpes.",

    price: {
        // Nombre brut, pour les données structurées lues par Google ("price": "1500")
        amount: PRICE_AMOUNT,
        // Écriture compacte "1500 €" : grand affichage de l'accueil et descriptions
        compact: `${PRICE_AMOUNT}${NBSP}€`,
        // Écriture typographique "1 500 €" : dans les phrases (FAQ, page Vienne)
        text: `${String(PRICE_AMOUNT).replace(/\B(?=(\d{3})+$)/g, NBSP)}${NBSP}€`,
    },

    // Navigation
    navLinks: [
        { label: "Projets", href: "/projets/" },
        { label: "À Propos", href: "/a-propos/" },
        { label: "FAQ", href: "/a-propos/#faq" },
        { label: "Vérifier ma date", href: "/contact/" },
    ],

    // ==========================================
    // IMAGE MAPPINGS (User content)
    // ==========================================
    // Replace these values with the exact name of your photos from the 'portfolio' directory.
    // The system will automatically resize, optimize, and serve them perfectly.

    images: {
        // ---- Homepage Hero Settings ----
        // The reference site uses 5 distinct vertical/portrait images floating asymmetrically
        heroGallery: [
            "/portfolio-webp/Mariage Lucy Romain HD-467.webp", // Image 1 (top-left) 
            "/portfolio-webp/Fanny Ben HD-575.webp",           // Image 2 (bottom-left)
            "/portfolio-webp/Assia Jeremy Mariage HD-156.webp",// Image 3 (top-center) 
            "/portfolio-webp/Mariage Marion Boris F-255.webp",// Image 4 (bottom-center-right)
            "/portfolio-webp/Mathilde Celim-664.webp",             // Image 5 (right)
        ],

        // ---- General Site Images ----
        aboutImage: "/portfolio-webp/Fanny Ben HD-575.webp",
        contactHeaderImage: "/portfolio-webp/Anais et sam full res-109.webp",

        // ---- Portfolio Full Gallery ----
        // This feeds the /projets page masonry gallery
        portfolioGallery: [
            "/portfolio-webp/Mariage Lucy Romain HD-467.webp",
            "/portfolio-webp/Fanny Ben HD-575.webp",
            "/portfolio-webp/Anais et sam full res-139.webp",
            "/portfolio-webp/Assia Jeremy Mariage HD-156.webp",
            "/portfolio-webp/Mathilde Celim-664.webp",
            "/portfolio-webp/Anais et sam full res-109.webp",
            "/portfolio-webp/Anais et sam full res-135.webp",
            "/portfolio-webp/Magalie Stevens HD-190.webp",
            "/portfolio-webp/Mariage Lucy Romain HD-598.webp",
        ]
    },

    // ---- Social Links ----
    socials: {
        instagram: "https://www.instagram.com/photoetdragee/",
    }
};
