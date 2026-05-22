const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

// FUNCTIE 1: DATA OPHALEN
async function fetchShows() {

    const query = searchInput.value.trim();

    // oude resultaten leegmaken
    results.innerHTML = "";

    // controle lege input
    if (query.length === 0) {
        results.innerHTML = `<p class="message">Geef een serienaam in.</p>`;
        return;
    }

    try {

        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);

        // controle of fetch werkt
        if (!response.ok) {
            throw new Error("Fout bij ophalen van data");
        }

        const data = await response.json();

        // niets gevonden
        if (data.length === 0) {
            results.innerHTML = `<p class="message">Geen resultaten gevonden.</p>`;
            return;
        }

        // tweede functie oproepen
        displayShows(data);

    } catch (error) {

        console.log(error);

        results.innerHTML = `
            <p class="message">
                Er ging iets mis bij het ophalen van de data.
            </p>
        `;
    }
}

// FUNCTIE 2: RESULTATEN TONEN
function displayShows(shows) {

    // oude resultaten leegmaken
    results.innerHTML = "";

    // loop door alle resultaten
    shows.forEach(item => {

        const show = item.show;

        // kaartje maken
        const card = document.createElement("div");
        card.classList.add("card");

        // titel
        const title = document.createElement("h2");
        title.textContent = show.name;

        // genre
        const genre = document.createElement("p");
        genre.textContent = `Genre: ${show.genres.join(", ") || "Geen genre"}`;

        // afbeelding
        const image = document.createElement("img");

        // controle of afbeelding bestaat
        if (show.image) {
            image.src = show.image.medium;
        } else {
            image.src = "https://via.placeholder.com/210x295?text=No+Image";
        }

        image.alt = show.name;

        // elementen toevoegen aan kaart
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(genre);

        // kaart toevoegen aan pagina
        results.appendChild(card);
    });
}

// knop eventlistener
searchBtn.addEventListener("click", fetchShows);

// enter-toets laten werken
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        fetchShows();
    }
});