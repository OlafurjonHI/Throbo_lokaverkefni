class Trip {
    #id = null;
    #title = null;
    #date = null;
    #timeStart = null
    #duration = null;
    #location = null;
    #slots = null;
    #taken = null;
    #price = null;
    #meta = [];

    constructor(title,date,timeStart,duration,location,slots,taken,price,meta){
        this.#id = Trip.getTripIdCount();
        this.#title = title;
        this.#date = date;
        this.#timeStart = timeStart;
        this.#duration = duration;
        this.#location = location;
        this.#slots = slots;
        this.#taken = taken;
        this.#price = price;
        this.#meta = meta;

        Trip.count++;
    }

    getId() {
        return this.#id;
    }
    getTitle() {
        return this.#title;
    }
    getDate() {
        return this.#date;
    }
    getTimeStart() {
        return this.#timeStart;
    }
    getDuration() {
        return this.#duration;
    }
    getLocation() {
        return this.#location;
    }
    getSlots() {
        return this.#slots;
    }
    getTaken() {
        return this.#taken;
    }
    getPrice() {
        return Math.round(this.#price);
    }
    getMeta() {
        return this.#meta;
    }
    toString() {
        return `Title: ${this.getTitle()} Date: ${this.getDate()} Starts: ${this.getTimeStart()} Duration: ${this.getDuration()} Location: ${this.getLocation()} Price: ${this.getPrice()} `
    }
    getInfoAsObject() {
        let info = {
            id: this.getId(),
            title: this.getTitle(),
            date: this.getDate(),
            timeStart: this.getTimeStart(),
            duration: this.getDuration(),
            location: this.getLocation(),
            slots: this.getSlots(),
            taken: this.getTaken(),
            price: this.getPrice(),
            meta: this.getMeta()
        }
        return info;
    }
    static getTripIdCount(){
        return Trip.count;
    }
}

Trip.count = 1;

