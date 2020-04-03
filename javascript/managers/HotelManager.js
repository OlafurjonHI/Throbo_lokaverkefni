class HotelManager {
    #hotels = [];

    constructor(n){
        this.#hotels = this._getHotelsFromData(n);
    }
    _getHotelsFromData(n){
        let hotels = [];
        let nouns = getNouns();
        let adjectives = getAdjectives();
        let postnumer = getPostNumer();
        let hotelMeta = getHotelMetaData();
        for(let i = 0; i < n ; i++) {
            let name = "";
            if(nextInt(1) > 0)
                name += "The ";
            name+= adjectives[nextInt(adjectives.length -1)]+" ";
            name += nouns[nextInt(nouns.length-1)];
            name = capitalize(name);
            let address = postnumer[nextInt(postnumer.length-1)];
            let stars = 2 + nextInt(3);
            let rating =  nextDouble(3,2)
            if (rating > 4.5)
                rating = 5.0;
            let meta = [];
            for(let j = 0; j < nextInt(10)+2; j++){
                let m = hotelMeta[nextInt(hotelMeta.length-1)]
                while(meta.includes(m))
                    m = hotelMeta[nextInt(hotelMeta.length-1)]
                meta.push(m)
            }
            let price = Math.round(nextDouble(8,2)*100)
            let maxSmallRooms = 100 + nextInt(100)
            let maxBigRooms = Math.round(maxSmallRooms/2 + nextInt(maxSmallRooms))
            hotels.push(new Hotel(name,address,stars,rating,maxSmallRooms,maxBigRooms,meta,price))
        }
        return hotels;
    }
    getHotels() {
        return this.#hotels;
    }
}

