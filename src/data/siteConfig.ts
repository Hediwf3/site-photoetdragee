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
            "/portfolio/Mariage Lucy Romain HD-564.jpg", // Image 1 (top-left) - confirmed portrait in prev checks
            "/portfolio/Fanny Ben HD-575.jpg",           // Image 2 (bottom-left) - confirmed portrait closely
            "/portfolio/Anais et sam full res-3.jpg",    // Image 3 (top-center) 
            "/portfolio/Assia Jeremy Mariage HD-156.jpg",// Image 4 (bottom-center-right)
            "/portfolio/Mathilde Celim-664.jpg",             // Image 5 (right)
        ],

        // ---- General Site Images ----
        aboutImage: "/portfolio/Fanny Ben HD-575.jpg",
        contactHeaderImage: "/portfolio/Anais et sam full res-109.jpg",

        // ---- Portfolio Full Gallery ----
        // This feeds the /projets page masonry gallery
        portfolioGallery: [
            "/portfolio/Mariage Lucy Romain HD-564.jpg",
            "/portfolio/Fanny Ben HD-575.jpg",
            "/portfolio/Anais et sam full res-139.jpg",
            "/portfolio/Assia Jeremy Mariage HD-156.jpg",
            "/portfolio/Mathilde Celim-664.jpg",
            "/portfolio/Anais et sam full res-109.jpg",
            "/portfolio/Anais et sam full res-135.jpg",
            "/portfolio/Magalie Stevens HD-190.jpg",
            "/portfolio/Mariage Lucy Romain HD-598.jpg",
        ]
    },

    // ---- Social Links ----
    socials: {
        instagram: "https://www.instagram.com/",
    }
};
