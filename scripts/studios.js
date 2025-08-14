const studios = [
    {
        nom: "Lilac",
        logo: "img/studios/lilac/Lilac 0_Logo.png",
        jeux: [
            { nom: "Lilac 0", img: "img/studios/lilac/Lilac0_MainCapsule_1232x706.png", steam: "" }
        ]
    },
    {
        nom: "Sleepy Giant Creations",
        logo: "https://placehold.co/80x80?text=SG",
        jeux: [
            { nom: "Chill Fishing", img: "https://placehold.co/600x400?text=Chill Fishing", steam: "https://store.steampowered.com/app/4" },
            { nom: "Amato", img: "https://placehold.co/600x400?text=Amato", steam: "https://store.steampowered.com/app/4" }
        ]
    },
    {
        nom: "Empty",
        logo: "https://placehold.co/80x80?text=E",
        jeux: [
            { nom: "Jeu A", img: "https://placehold.co/600x400?text=Jeu+A", steam: "https://store.steampowered.com/app/4" }
        ]
    },
    {
        nom: "Empty",
        logo: "https://placehold.co/80x80?text=E",
        jeux: [
            { nom: "Jeu A", img: "https://placehold.co/600x400?text=Jeu+A", steam: "https://store.steampowered.com/app/4" },
            { nom: "Jeu B", img: "https://placehold.co/600x400?text=Jeu+B", steam: "https://store.steampowered.com/app/4" }
        ]
    }
];

const container = document.getElementById("studios-container");
const carousels = [];

studios.forEach(studio => {
    const studioDiv = document.createElement("div");
    studioDiv.classList.add("studio");

    // Logo
    const logo = document.createElement("img");
    logo.classList.add("studio-logo");
    logo.src = studio.logo || "https://placehold.co/80x80?text=LOGO";
    logo.alt = `Logo de ${studio.nom}`;
    studioDiv.appendChild(logo);

    // Nom du studio
    const title = document.createElement("h2");
    title.textContent = studio.nom;
    studioDiv.appendChild(title);

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
        jeuLink.href = studio.jeux[0].steam;
        jeuLink.target = "_blank";
        jeuLink.textContent = studio.jeux[0].nom;
        jeuLink.classList.add("jeu-link");
        studioDiv.appendChild(jeuLink);

        let position = 0;
        const totalSlides = studio.jeux.length;

        function updateNomJeu() {
            const index = position % totalSlides;
            jeuLink.textContent = studio.jeux[index].nom;
            jeuLink.href = studio.jeux[index].steam;
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
        jeuLink.href = studio.jeux[0].steam;
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
