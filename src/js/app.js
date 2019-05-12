import {Data} from "./Data.js";
import {Film, MarkerFilmsList} from "./lib.js";
import {checkLink} from "./valid.js";

const tagsData = new Data('jsons/tags.json');
const filmsData = new Data('jsons/films.json');
const tagsList = document.querySelector('.tags');
const filmsList = document.querySelector('#list-1');
const markerList = document.querySelector('#list-2');

const markerFilmsList = new MarkerFilmsList();

loadData();
rebuildMarkerList(markerFilmsList, markerList);

async function loadData() {                                         //загрузка данных с json
    try {
        const response = await tagsData.get();
        let tags = await response.json();
        if (tags == null) {
            tags = []
        }
        rebuildTagsList(tags, tagsList);

        const response2 = await filmsData.get();
        let films = await response2.json();
        if (films == null) {
            films = []
        }
        rebuildFilmsList(films, filmsList);
    } catch (e) {
        // e -> ошибка
        console.log('error');
        alert('Ошибка загрузки данных');
    } finally {
        console.log('Данные загружены');
    }
}

function rebuildTagsList(tags, tagsList) {                          //создается список тегов
    for (const item of tags) {
        const inputEl = document.createElement('input');
        inputEl.type = 'button';
        inputEl.id = 'tag-name';
        inputEl.value = item;
        tagsList.appendChild(inputEl);
    }
}
function rebuildFilmsList(films, filmsList) {                       //создается список фильмов
    for (const item of films) {
        const liEl = document.createElement('li');
        liEl.innerHTML = `
        <span>${item.title}</span><img class="marker empty" src="img/star-black.png">
        `;

        // if(films.item == markerFilmsList.item) {
            // console.log("aaa");
            // films.item.classList.add("full");
            // films.item.classList.remove("empty");
        // }

        filmsList.appendChild(liEl);

        const film = new Film(item.title, item.tags);
        const markerEl = liEl.querySelector('.marker');
        // rebuildMarkerList(film, markerFilmsList, markerEl, markerList);

        markerEl.addEventListener('click', (evt) => {      //событие на иконке
            evt.target.classList.add("full");
            evt.target.classList.remove("empty");

            if (checkLink(item.title, markerFilmsList) > 0) {           //валидация есть ли фильм в закладках
                console.log('Данная ссылка уже есть в списке.');
            } else {
                markerFilmsList.add(film);                              //добавление фильма в закладки(local storage)
            }
            rebuildMarkerList(markerFilmsList, markerList);
        });

    }
}
function rebuildMarkerList(markerFilmsList, markerList) {               //создается список фильмов в закладках
    markerList.innerHTML= "";
    for (const item of markerFilmsList.items) {
        const liEl = document.createElement('li');
        liEl.innerHTML = `
        <span>${item.title}</span><img class="marker full" src="img/star-black.png">
        `;

        markerList.appendChild(liEl);

        const markerEl = liEl.querySelector('.marker');
        markerEl.addEventListener('click', (evt) => {           //событие на иконке
            markerFilmsList.remove(item);
            rebuildMarkerList(markerFilmsList, markerList);
        });
        }
}




