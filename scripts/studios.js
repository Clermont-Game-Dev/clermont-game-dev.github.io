const studios = [
    {
        nom: "Bimi Cerika",
        logo: "img/studios/bimi_cerika/Logo_FR.png",
        jeux: [
            { nom: "1001 Vies", img: "img/studios/bimi_cerika/1001_Vies.png", link: "https://store.steampowered.com/app/4" }
        ]
    },
    {
        nom: "Camille",
        logo: "img/studios/camille/Logo_ZS001.png",
        jeux: [
            { nom: "Zoeufs Story", img: "img/studios/camille/MenuPrincipal001.png", link: "" }
        ]
    },
    {
        nom: "Digital Pourpre",
        logo: "https://placehold.co/600x400?text=Digital Pourpre Logo",
        jeux: [
            { nom: "Undead Smasher", img: "https://placehold.co/1232x706?text=Undead Smasher", link: "" },
            { nom: "Arise From Shadows", img: "https://placehold.co/1232x706?text=Arise From Shadows", link: "" }
        ]
    },
    {
        nom: "Gravenoire",
        logo: "https://placehold.co/600x400?text=Gravenoire Logo",
        jeux: [
            { nom: "Labyban", img: "https://placehold.co/1232x706?text=Labyban", link: "" },
            { nom: "Ataraxie", img: "https://placehold.co/1232x706?text=Ataraxie", link: "" }
        ]
    },
    {
        nom: "Kidness",
        logo: "img/studios/kyma/Logo-Kyma.png",
        jeux: [
            { nom: "Kyma", img: "img/studios/kyma/Capsule.png", link: "" }
        ]
    },
    {
        nom: "Nobrain Studio",
        logo: "img/studios/nobrain/nobrain-studio-logo-256.png",
        jeux: [
            { nom: "Zoo Island", img: "img/studios/nobrain/zoo_island_store_capsule_main_1232x706.png", link: "" }
        ]
    },
    {
        nom: "Nox",
        logo: "img/studios/nox/logo_carre_fond_noir.png",
        jeux: [
            { nom: "Nox Stories", img: "img/studios/nox/Visuel_rectangle.png", link: "" }
        ]
    },
    {
        nom: "Sleepy Giant Creations",
        logo: "img/studios/sleepygiant/SGlogo transparent noir@4x.png",
        jeux: [
            { nom: "Chill Fishing", img: "img/studios/sleepygiant/Goldmine.png", link: "https://store.steampowered.com/app/4" },
            { nom: "Amato", img: "img/studios/sleepygiant/HighresScreenshot00001.jpg", link: "https://store.steampowered.com/app/4" }
        ]
    },
    {
        nom: "Softail",
        logo: "img/studios/softail/Softail_Blanc.png",
        jeux: [
            { nom: "Night Lurker", img: "img/studios/softail/NightLurker.png", link: "https://store.steampowered.com/app/4" }
        ]
    },
    {
        nom: "Victor",
        logo: "img/studios/victor/Lilac 0_Logo.png",
        jeux: [
            { nom: "Lilac 0", img: "img/studios/victor/Lilac0_MainCapsule_1232x706.png", link: "" }
        ]
    }
];

const container = document.getElementById("studios-container");
const carousels = [];

studios.forEach(studio => {
    const studioDiv = document.createElement("div");
    studioDiv.classList.add("studio");

    // Nom du studio
    const title = document.createElement("h2");
    title.textContent = studio.nom;
    studioDiv.appendChild(title);
    
    // Logo
    /*
    const logo = document.createElement("img");
    logo.classList.add("studio-logo");
    logo.src = studio.logo || "https://placehold.co/80x80?text=LOGO";
    logo.alt = `Logo de ${studio.nom}`;
    studioDiv.appendChild(logo);*/

    if (studio.jeux.length > 1) {
        // Wrapper pour centrer verticalement
        const carouselWrapper = document.createElement("div");
        carouselWrapper.classList.add("carousel-wrapper");
        carouselWrapper.style.flex = "1";

        const carousel = document.createElement("div");
        carousel.classList.add("carousel");

        const track = document.createElement("div");
        track.classList.add("carousel-track");

        studio.jeux.forEach(j => {
            const img = document.createElement("img");
            img.src = j.img;
            track.appendChild(img);
        });

        // Clone pour boucle
        const firstClone = document.createElement("img");
        firstClone.src = studio.jeux[0].img;
        track.appendChild(firstClone);

        carousel.appendChild(track);
        carouselWrapper.appendChild(carousel);
        studioDiv.appendChild(carouselWrapper);

        // Nom du jeu cliquable en bas
        const jeuLink = document.createElement("a");
        jeuLink.href = studio.jeux[0].link;
        jeuLink.target = "_blank";
        jeuLink.textContent = studio.jeux[0].nom;
        jeuLink.classList.add("jeu-link");
        studioDiv.appendChild(jeuLink);

        let position = 0;
        const totalSlides = studio.jeux.length;

        function updateNomJeu() {
            const index = position % totalSlides;
            jeuLink.textContent = studio.jeux[index].nom;
            jeuLink.href = studio.jeux[index].link;
        }

        // Boutons
        const btnLeft = document.createElement("button");
        btnLeft.classList.add("carousel-btn", "left");
        btnLeft.textContent = "‹";
        btnLeft.onclick = () => {
            position = (position - 1 + totalSlides) % totalSlides;
            track.style.transition = "transform 0.4s ease-in-out";
            track.style.transform = `translateX(-${position * 100}%)`;
            updateNomJeu();
        };

        const btnRight = document.createElement("button");
        btnRight.classList.add("carousel-btn", "right");
        btnRight.textContent = "›";
        btnRight.onclick = moveNext;

        carousel.appendChild(btnLeft);
        carousel.appendChild(btnRight);

        function moveNext() {
            position++;
            track.style.transition = "transform 0.4s ease-in-out";
            track.style.transform = `translateX(-${position * 100}%)`;
            updateNomJeu();

            if (position === totalSlides) {
                setTimeout(() => {
                    track.style.transition = "none";
                    position = 0;
                    track.style.transform = `translateX(0)`;
                    updateNomJeu();
                }, 400);
            }
        }

        carousels.push({ moveNext });

    } else {
        // Un seul jeu : pas de carrousel
        const img = document.createElement("img");
        img.src = studio.jeux[0].img;
        img.style.width = "100%";
        img.style.borderRadius = "10px";
        studioDiv.appendChild(img);

        // Nom du jeu en bas
        const jeuLink = document.createElement("a");
        jeuLink.href = studio.jeux[0].link;
        jeuLink.target = "_blank";
        jeuLink.textContent = studio.jeux[0].nom;
        jeuLink.classList.add("jeu-link");
        studioDiv.appendChild(jeuLink);
    }

    container.appendChild(studioDiv);
});

// Auto-play synchronisé pour tous les carrousels
setInterval(() => {
    carousels.forEach(c => c.moveNext());
}, 3000);
