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
        this.#id = Trip.getHotelIdCount();
        this.#title = title;
        this.#date = date;
        this.#timeStart = timeStart;
        this.#duration = duration;
        this.#location = location
        this.#slots = slots
        this.#taken = taken;
        this.#price = price;
        this.#meta = meta;
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
    getPrice() {
        return this.#price;
    }
    getMeta() {
        return this.#meta;
    }
    toString() {
        return `Title: ${this.getTitle()} Date: ${this.getDate()} Starts: ${this.getTimeStart()} Duration: ${this.getDuration()} Location: ${this.getLocation()} Price: ${this.getPrice()} `
    }

    static getHotelIdCount(){
        return Trip.count;
    }
}

Trip.count = 1;

