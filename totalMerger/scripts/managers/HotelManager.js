class HotelManager {
    #hotels = [];

    constructor(n){
        this.#hotels = this._getHotelsFromData(n);
    }
    getHotels() {
        return this.#hotels;
    }
    getHotelById(id){
        for(const h of this.getHotels())
            if(h.getId() == id)
                return h;
    }
    searchHotelsByName(substring) {
        let filteredHotels = []
        for(const h of this.getHotels()){
            if(h.getName().toLowerCase().includes(substring.toLowerCase()))
                filteredHotels.push(h);
        }
        return filteredHotels;
    }
    searchHotelsByAddress(substring) {
        let filteredHotels = []
        for(const h of this.getHotels()){
            if(h.getAddress().toLowerCase().includes(substring.toLowerCase()))
                filteredHotels.push(h);
        }
        return filteredHotels;
    }
    searchHotelsByExactStars(stars) {
        let filteredHotels = []
        for(const h of this.getHotels()){
            if(parseInt(h.getStars()) === parseInt(stars))
                filteredHotels.push(h);
        }
        return filteredHotels;
    }
    searchHotelsByMoreStars(stars) {
        let filteredHotels = []
        for(const h of this.getHotels()){
            if(parseInt(h.getStars()) >= parseInt(stars))
                filteredHotels.push(h);
        }
        return filteredHotels;
    }
    searchHotelsByMoreSmallRooms(rooms) {
        let filteredHotels = []
        for(const h of this.getHotels()){
            if(parseInt(h.getMaxSmallRooms()) >= parseInt(rooms))
                filteredHotels.push(h);
        }
        return filteredHotels;
    }
    searchHotelsByMoreBigRooms(rooms) {
        let filteredHotels = []
        for(const h of this.getHotels()){
            if(parseInt(h.getMaxBigRooms()) >= parseInt(rooms))
                filteredHotels.push(h);
        }
        return filteredHotels;
    }
    searchHotelsByLessStars(stars) {
        let filteredHotels = []
        for(const h of this.getHotels()){
            if(parseInt(h.getStars()) <= parseInt(stars))
                filteredHotels.push(h);
        }
        return filteredHotels;
    }
    searchHotelsByHigherRating(rating) {
        let filteredHotels = []
        for(const h of this.getHotels()){
            if(h.getRating() >= rating)
                filteredHotels.push(h);
        }
        return filteredHotels;
    }
    searchHotelsByLowerRating(rating) {
        let filteredHotels = []
        for(const h of this.getHotels()){
            if(h.getRating() <= rating)
                filteredHotels.push(h);
        }
        return filteredHotels;
    }
    searchHotelsWithAvailableRoomsForDate(size,date){
        let filteredHotels = []
        for(const h of this.getHotels()){
            let totalSmallRoomCapacity  = h.getTotalFreeSmallRoomsByDate(date) * 2;
            let totalBigRoomCapacity = h.getTotalFreeBigRoomsByDate(date) * 4;
            if((totalSmallRoomCapacity + totalBigRoomCapacity) >= size)
                filteredHotels.push(h);
        }
        return filteredHotels;
    }
    searchHotelsDatesFromGroupSize(size){
        let filteredHotels = []
        for(const h of this.getHotels()){
            let totalSmallRoomCapacity  = h.getTotalFreeSmallRoomsByDate(date) * 2;
            let totalBigRoomCapacity = h.getTotalFreeBigRoomsByDate(date) * 4;
            if((totalSmallRoomCapacity + totalBigRoomCapacity) >= size)
                filteredHotels.push(h);
        }
        return filteredHotels;
    }
    searchHotelsByMetaIncludes(mm){
        let filteredHotels = [];
        for (const h of this.getHotels()) {
            for(let meta of h.getMeta()){
                let expected = mm.length
                let actual = 0;
                for(let m of mm) {
                    if(meta.toLowerCase().includes(m.toLowerCase())){
                        actual++
                    }
                }
                if(expected === actual)
                    filteredHotels.push(h);    
            }
        }
        return filteredHotels;
    }
    searchHotelsByPriceLess(p) {
        let filteredHotels = []
        for(const h of this.getHotels()){
            if(parseInt(h.getPrice()) <= parseInt(p))
                filteredHotels.push(h);
        }
        return filteredHotels;
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
            let price = Math.round(nextDouble(8,2)*1000)
            let maxSmallRooms = 100 + nextInt(100)
            let maxBigRooms = Math.round(maxSmallRooms/2 + nextInt(maxSmallRooms))
            hotels.push(new Hotel(name,address,stars,rating,maxSmallRooms,maxBigRooms,meta,price))
        }
        return hotels;
    }
    
}

