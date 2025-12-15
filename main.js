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
        img.src = 'img/logo.png';
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


// Fix Category
loadBestMovie();
loadBestCategory();
loadCategory("mystery", "mystery")
loadCategory("action", "biography")

// Other Menu
otherCategory('category_choice', 'autre_1', 'Animation');
otherCategory('category_choice_2', 'autre_2', 'Sport');