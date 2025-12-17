const API_URL = 'http://localhost:8000/api/v1';

async function loadBestMovie() {
    try {
        const response = await fetch(API_URL + '/titles/?sort_by=-imdb_score');
        if (!response.ok) {
            throw new Error('Network error');
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
        btn.classList.add('btn-red');
        btn.textContent = 'Détails';

        btn.addEventListener('click', function() {
            openModal(fullMovie.id);
        });

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
        img.src = 'img/logo.png';
    });

    let overlay = document.createElement('div');
    overlay.classList.add('movie-overlay');

    let title = document.createElement('h3');
    title.textContent = film.title;

    let button = document.createElement('button');
    button.classList.add('details-btn');
    button.textContent = 'Détails';

    // Open Modal
    button.addEventListener('click', function() {
        openModal(film.id);
    });

    overlay.appendChild(title);
    overlay.appendChild(button);

    card.appendChild(img);
    card.appendChild(overlay);

    return card;
}

async function loadBestCategory() {
    let url = API_URL + '/titles/?page_size=7&sort_by=-imdb_score';

    try {
        let reponse = await fetch(url);
        let data = await reponse.json();
        let resultats = data.results;

        films_list = resultats.slice(1, 7);

        let container = document.getElementById('best_rank');

        for (let i = 0; i < films_list.length; i++) {
            let film = films_list[i];
            let card = createMovieCard(film);
            container.appendChild(card);
        }

    } catch (error) {
        console.log(error);
    }
}

async function loadCategory(genre, idSection) {

    let url = API_URL + '/titles/?sort_by=-imdb_score&genre=' + genre + '&page_size=10';

    try {

        let reponse = await fetch(url);
        let data = await reponse.json();
        let resultats = data.results;

        let movieToDisplay = [];
        movieToDisplay = resultats.slice(0, 6);


        let container = document.getElementById(idSection);
        container.innerHTML = '';

        for (let i = 0; i < movieToDisplay.length; i++) {
            let movie = movieToDisplay[i];
            let card = createMovieCard(movie);
            container.appendChild(card);
        }


    } catch (error) {
        console.log(error);
    }
}

async function otherCategory(idMenu, idSectionToLoad, defaultGenre){
    let url = API_URL + '/genres/?page_size=50';

    try {
        let reponse = await fetch(url);
        let data = await reponse.json();
        let menu = document.getElementById(idMenu);

        // Add each genre in menu
        let genres = data.results;

        genres.forEach(function(genre) {
            let option = document.createElement('option');
            option.value = genre.name;
            option.textContent = genre.name;
            menu.appendChild(option);
        });

        if (defaultGenre) {
            menu.value = defaultGenre;
            loadCategory(defaultGenre, idSectionToLoad);
        }

        // Change value of category
        menu.addEventListener('change', function(event) {
            let chooseGenre = event.target.value;
            loadCategory(chooseGenre, idSectionToLoad);
        });


    } catch (error) {
        console.log(error);
    }

}

// MODAL
// Open
let modal = document.getElementById('movie-modal');
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.close();
    }
});
// Close
let closeButton = document.getElementById('modal-close-btn');
closeButton.addEventListener('click', function() {
    modal.close();
});

async function openModal(idFilm) {
    let url = API_URL + '/titles/' + idFilm;

    try {
        let reponse = await fetch(url);
        let movie = await reponse.json();


        // Write element in html
        document.getElementById('modal-title').textContent = movie.title;
        document.getElementById('modal-year').textContent = movie.year;
        document.getElementById('modal-genres').textContent = movie.genres.join(', ');
        document.getElementById('modal-rated').textContent = movie.rated;
        document.getElementById('modal-duration').textContent = movie.duration;
        document.getElementById('modal-countries').textContent = movie.countries.join(' / ');
        document.getElementById('modal-imdb').textContent = movie.imdb_score;
        document.getElementById('modal-directors').textContent = movie.directors.join(', ');
        document.getElementById('modal-description').textContent = movie.long_description;
        document.getElementById('modal-actors').textContent = movie.actors.join(', ');

        // Money Make
        let recette = "No indication";
        if (movie.worldwide_gross_income !== null) {
            recette = movie.worldwide_gross_income + " $";
        }
        document.getElementById('modal-boxoffice').textContent = recette;

        // Handle img
        let imageModale = document.getElementById('modal-image');
        imageModale.src = movie.image_url;
        imageModale.alt = movie.title;
        // If img not exist
        imageModale.addEventListener('error', function() {
            imageModale.src = 'img/logo.png';
        });

        modal.showModal();

    } catch (erreur) {
        console.log(erreur);
    }
}


// Fix Category
loadBestMovie();
loadBestCategory();
loadCategory("mystery", "mystery")
loadCategory("action", "biography")

// Other Menu
otherCategory('category_choice', 'autre_1', 'Animation');
otherCategory('category_choice_2', 'autre_2', 'Sport');