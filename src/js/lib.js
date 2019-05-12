export class Film {
    constructor(title, tags, done) {
        this.title = title;
        this.tags = tags;
        this.done = false;
    }
}

export class MarkerFilmsList { //закладки
    constructor() {
        const savedItems = JSON.parse(localStorage.getItem('MarkerList'));
        if (savedItems !== null) {
            this.items = savedItems;
        } else {
            this.items = [];
        }
    }

    add(item) { //добавление элемента в начало списка
        this.items.unshift(item);
        this.save();
    }

    remove(item) {  //удаление элемента
        const index = this.items.indexOf(item);

        if (index !== -1) {
            this.items.splice(index, 1);
            this.save();
        }
    }

    save() {
        localStorage.setItem('MarkerList', JSON.stringify(this.items));
    }
}