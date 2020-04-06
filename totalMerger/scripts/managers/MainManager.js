class MainManager {
    #tManager = [];
    #hManager = [];
    #fManager = [];
    constructor(n) {
        this.#tManager = new TripManager(n);
        this.#hManager = new HotelManager(n);
        this.#fManager = new FlightManager(n);
    }
    getAllFlights() {
        return this.#fManager.getFlights();
    }
    getAllHotels() {
        return this.#hManager.getHotels();
    }
    getAllTrips() {
        return this.#tManager.getTrips();
    }
    getFilteredFlights(criteria){
        let nulls = 0;
        for(let c of criteria){
            if(c === ""){
                nulls++
            }
        }
        if(nulls === criteria.length){
            return this.getAllFlights();
        }
        let filteredData = [];
        let fNo = criteria[0],from = criteria[1];
        let to = criteria[2], airline = criteria[3];
        let depTime = criteria[4], arrTime = criteria[4];
        let status = criteria[5], totalSeats = criteria[6];
        let remSeats = criteria[7], price = criteria[8], meta = criteria[9]

        if(fNo !== ""){
            filteredData = this.#fManager.searchFlightsByFlightNo(fNo)
        }
        if(from !== ""){
            let res = this.#fManager.searchFlightsByFrom(from)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(to !== ""){
            let res = this.#fManager.searchFlightsByTo(to)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(airline !== ""){
            let res = this.#fManager.searchFlightsByAirline(airline)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(depTime !== ""){
            let res = this.#fManager.searchFlightsByExactDateAndNewer(depTime)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(status !== ""){
            let res = this.#fManager.searchFlighTsByStatus(status)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(totalSeats !== ""){
            let res = this.#fManager.searchFlightsByTotalSeats(totalSeats)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        
        if(remSeats !== ""){
            let res = this.#fManager.searchFlightsByAtleastXFreeSeats(remSeats)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(price !== ""){
            let res = this.#fManager.searchFlightsByPriceLower(price)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(meta !== ""){
            let metaarr = meta.split(',');
            let res = this.#fManager.searchFlightsByMetaIncludes(metaarr)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }

        }
        return filteredData;
    }
    getFilteredHotels(criteria){
        let nulls = 0;
        for(let c of criteria){
            if(c === ""){
                nulls++
            }
        }
        if(nulls === criteria.length){
            return this.getAllHotels();
        }
        let filteredData = [];
        let name = criteria[0],address = criteria[1];
        let stars = criteria[2], rating = criteria[3];
        let smallRooms = criteria[4], bigRooms = criteria[5];
        let price = criteria[6], meta = criteria[7];

        if(name !== ""){
            filteredData = this.#hManager.searchHotelsByName(name)
        }
        if(address !== ""){
            let res = this.#hManager.searchHotelsByAddress(address)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(stars !== ""){
            let res = this.#hManager.searchHotelsByMoreStars(stars)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(rating !== ""){
            let res = this.#hManager.searchHotelsByHigherRating(rating)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(smallRooms !== ""){
            let res = this.#hManager.searchHotelsByMoreSmallRooms(smallRooms)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(bigRooms !== ""){
            let res = this.#hManager.searchHotelsByMoreBigRooms(bigRooms)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        
        if(price !== ""){
            console.log(price)
            let res = this.#hManager.searchHotelsByPriceLess(price)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(meta !== ""){
            let metaarr = meta.split(',');
            let res = this.#hManager.searchHotelsByMetaIncludes(metaarr)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }

        }
        return filteredData;
    }
    getFilteredTrips(criteria){
        let nulls = 0;
        for(let c of criteria){
            if(c === ""){
                nulls++
            }
        }
        if(nulls === criteria.length){
            return this.getAllTrips();
        }
        let filteredData = [];
        let title = criteria[0],date = criteria[1];
        let timeStart = criteria[2], duration = criteria[3];
        let location = criteria[4], slots = criteria[5];
        let taken = criteria[6], price = criteria[7], meta = criteria[8]

        if(title !== ""){
            filteredData = this.#tManager.searchTripsByTitle(title)
        }
        if(date !== ""){
            let res = this.#tManager.searchTripsByDate(date)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(timeStart !== ""){
            let res = this.#tManager.searchTripsByDurationLessAnd(timeStart)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(duration !== ""){
            let res = this.#tManager.searchTripsByDurationLessAnd(duration)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(location !== ""){
            let res = this.#tManager.searchTripsByLocation(location)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(slots !== ""){
            let res = this.#tManager.searchTripsBySlots(slots)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(taken !== ""){
            let res = this.#tManager.searchTripsByTaken(taken)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        
        if(price !== ""){
            console.log(price)
            let res = this.#tManager.searchTripsByPriceLowerAnd(price)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }
        }
        if(meta !== ""){
            let metaarr = meta.split(',');
            let res = this.#tManager.searchTripsByMetaIncludes(metaarr)
            if(res.length === 0){
                filteredData = [];
                return filteredData;
            }
            else {
                if(filteredData.length == 0){
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData,res)
            }

        }
        return filteredData;
    }
}
