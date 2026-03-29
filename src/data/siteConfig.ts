// src/data/siteConfig.ts

export const siteConfig = {
    title: "Photo et dragée",
    description: "Photographie de mariage éditoriale. Capturer l'honnêteté de vos instants précieux.",

    // Navigation
    navLinks: [
        { label: "Projets", href: "/projets" },
        { label: "À Propos", href: "/a-propos" },
        { label: "FAQ", href: "/a-propos#faq" },
        { label: "Contact", href: "/contact" },
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
