class Hotel {
    #hotelId = null;
    #name = null;
    #address = null;
    #stars = null;
    #rating = null;
    #maxSmallRooms = null;
    #maxBigRooms = null;
    #freeSmallRoomsPerDate = new Map();
    #freeBigRoomsPerDate = new Map();
    #meta = [];
    #price = null;
    constructor(name,address,stars,rating,maxSmallRooms,maxBigRooms,hMeta,price){
        this.#hotelId = Hotel.getHotelIdCount();
        this.#name = name;
        this.#address = address;
        this.#stars = stars;
        this.#rating = rating;
        this.#maxSmallRooms = maxSmallRooms;
        this.#maxBigRooms = maxBigRooms;
        this._initializeRooms(maxBigRooms,maxSmallRooms);
        this.#meta = hMeta;
        this.#price = price

        Hotel.count++;
    }

    _initializeRooms(maxBig,maxSmall){
        let date = getTodayDateNoClock()
        let d = new Date();
       
        console.log(date)
        for (let i = 0; i < 365; i++) {
            let r = nextInt(maxBig-10)+10;
            let r2 = nextInt(maxSmall-10)+10;
            this.getFreeBigRoomsPerDate().set(date.valueOf(),maxBig-r);
            this.getFreeSmallRoomsPerDate().set(date.valueOf(),maxSmall-r2);
            date = date.addDays(1);

        }
    }

    getName(){
        return this.#name
    }
    getAddress(){
        return this.#address;
    }
    getStars(){
        return this.#stars;
    }
    getRating() {
        return this.#rating;
    }
    getMaxBigRooms() {
        return this.#maxBigRooms;
    }
    getMaxSmallRooms() {
        return this.#maxSmallRooms;
    }
    getTotalFreeBigRoomsByDate(date){
        return this.#freeBigRoomsPerDate.get(date.valueOf());
    }
    getTotalFreeSmallRoomsByDate(date){
        let val = this.#freeSmallRoomsPerDate.get(date.valueOf());
        if(!isNaN(parseInt(val)))
            return val
        return 0;
    }
    getFreeSmallRoomsPerDate(){
        return this.#freeSmallRoomsPerDate;
    }
    getFreeBigRoomsPerDate(){
        return this.#freeBigRoomsPerDate;
    }
    getMeta(){
        return this.#meta;
    }
    getPrice() {
        return this.#price;
    }
    toString() {
        return `HotelName: ${this.getName()} address: ${this.getAddress()} TotalSmallRooms: ${this.getMaxSmallRooms()} FreeSmallRoomsToday: ${this.getTotalFreeSmallRoomsByDate(getTodayDateNoClock())} Price: ${this.getPrice()}$ `
    }

    static getHotelIdCount(){
        return Hotel.count;
    }
}
Hotel.count = 1

