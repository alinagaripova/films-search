export function checkLink(itemTitle, markerFilmsList) {        //валидация есть ли фильм в закладках
    let count = 0;
    for (const item of markerFilmsList.items) {
        if (itemTitle === item.title) {
            count++
        }
    }
    return count;
}