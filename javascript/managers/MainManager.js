class MainManager {

    #hManager = null;
    #tManager = null;
    #fManager = null;

    constructor(n) {
        this.#hManager = new HotelManager(n);
        this.#tManager = new TripManager(n);
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
        let smallRooms = criteria[4], bigRooms = criteria[4];
        let price = criteria[5], meta = criteria[6];

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
}
