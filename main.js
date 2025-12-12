const API_URL = 'http://localhost:8000/api/v1';

async function loadBestMovie() {
    try {
        const response = await fetch(API_URL + '/titles/?sort_by=-imdb_score');
        if (!response.ok) {
            throw new Error('Network error when fetching best movie');
        }
        const data = await response.json();
        const movie = data.results[0];

        const responseDetails = await fetch(API_URL + '/titles/' + movie.id);
        const fullMovie = await responseDetails.json();

        const section = document.getElementById('best_movie');

        const img = document.createElement('img');
        img.src = fullMovie.image_url;
        img.alt = fullMovie.title;

        img.addEventListener('error', function() {
            img.src = 'img/logo.png';
        });

        const divInfo = document.createElement('div');
        divInfo.classList.add('movie-info');


        const title = document.createElement('h2');
        title.textContent = fullMovie.title;


        const description = document.createElement('p');
        description.textContent = fullMovie.long_description;

        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.textContent = 'Détails';

        divInfo.appendChild(title);
        divInfo.appendChild(description);
        divInfo.appendChild(btn);

        section.appendChild(img);
        section.appendChild(divInfo);

    } catch (error) {
        console.error("Error loading movie: ", error);
    }
}

function createMovieCard(film) {
    let card = document.createElement('article');
    card.classList.add('movie-card');

    let img = document.createElement('img');
    img.src = film.image_url;
    img.alt = film.title;

    img.addEventListener('error', function() {
        img.src = 'logo.png';
    });

    let overlay = document.createElement('div');
    overlay.classList.add('movie-overlay');

    let title = document.createElement('h3');
    title.textContent = film.title;

    let btn = document.createElement('button');
    btn.classList.add('details-btn');
    btn.textContent = 'Détails';

    overlay.appendChild(title);
    overlay.appendChild(btn);

    carte.appendChild(img);
    carte.appendChild(overlay);

    return card;
}

loadBestMovie();