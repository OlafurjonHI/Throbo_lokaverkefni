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
        let filteredFlights = [];
        let fNo = criteria[0],from = criteria[1];
        let to = criteria[2], airline = criteria[3];
        let depTime = criteria[4], arrTime = criteria[4];
        let status = criteria[5], totalSeats = criteria[6];
        let remSeats = criteria[7], price = criteria[8], meta = criteria[9]

        if(fNo !== ""){
            filteredFlights = this.#fManager.searchFlightsByFlightNo(fNo)
        }
        if(from !== ""){
            let res = this.#fManager.searchFlightsByFrom(from)
            if(res.length === 0){
                filteredFlights = [];
                return filteredFlights;
            }
            else {
                if(filteredFlights.length == 0){
                    filteredFlights = res
                }
                else
                    filteredFlights = intersection(filteredFlights,res)
            }
        }
        if(to !== ""){
            let res = this.#fManager.searchFlightsByTo(to)
            if(res.length === 0){
                filteredFlights = [];
                return filteredFlights;
            }
            else {
                if(filteredFlights.length == 0){
                    filteredFlights = res
                }
                else
                    filteredFlights = intersection(filteredFlights,res)
            }
        }
        if(airline !== ""){
            let res = this.#fManager.searchFlightsByAirline(airline)
            if(res.length === 0){
                filteredFlights = [];
                return filteredFlights;
            }
            else {
                if(filteredFlights.length == 0){
                    filteredFlights = res
                }
                else
                    filteredFlights = intersection(filteredFlights,res)
            }
        }
        if(depTime !== ""){
            let res = this.#fManager.searchFlightsByExactDateAndNewer(depTime)
            if(res.length === 0){
                filteredFlights = [];
                return filteredFlights;
            }
            else {
                if(filteredFlights.length == 0){
                    filteredFlights = res
                }
                else
                    filteredFlights = intersection(filteredFlights,res)
            }
        }
        if(status !== ""){
            let res = this.#fManager.searchFlighTsByStatus(status)
            if(res.length === 0){
                filteredFlights = [];
                return filteredFlights;
            }
            else {
                if(filteredFlights.length == 0){
                    filteredFlights = res
                }
                else
                    filteredFlights = intersection(filteredFlights,res)
            }
        }
        if(totalSeats !== ""){
            let res = this.#fManager.searchFlightsByTotalSeats(totalSeats)
            if(res.length === 0){
                filteredFlights = [];
                return filteredFlights;
            }
            else {
                if(filteredFlights.length == 0){
                    filteredFlights = res
                }
                else
                    filteredFlights = intersection(filteredFlights,res)
            }
        }
        
        if(remSeats !== ""){
            let res = this.#fManager.searchFlightsByAtleastXFreeSeats(remSeats)
            if(res.length === 0){
                filteredFlights = [];
                return filteredFlights;
            }
            else {
                if(filteredFlights.length == 0){
                    filteredFlights = res
                }
                else
                    filteredFlights = intersection(filteredFlights,res)
            }
        }
        if(price !== ""){
            let res = this.#fManager.searchFlightsByPriceLower(price)
            if(res.length === 0){
                filteredFlights = [];
                return filteredFlights;
            }
            else {
                if(filteredFlights.length == 0){
                    filteredFlights = res
                }
                else
                    filteredFlights = intersection(filteredFlights,res)
            }
        }
        if(meta !== ""){
            let metaarr = meta.split(',');
            let res = this.#fManager.searchFlightsByMetaIncludes(metaarr)
            if(res.length === 0){
                filteredFlights = [];
                return filteredFlights;
            }
            else {
                if(filteredFlights.length == 0){
                    filteredFlights = res
                }
                else
                    filteredFlights = intersection(filteredFlights,res)
            }

        }
        return filteredFlights;
    }

}
