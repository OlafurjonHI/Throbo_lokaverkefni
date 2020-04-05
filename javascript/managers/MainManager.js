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
        let filteredFlights = [];
        let fNo = criteria[0],from = criteria[1];
        let to = criteria[2], airline = criteria[3];
        let depTime = criteria[4], arrTime = criteria[5];
        let status = criteria[6], totalSeats = criteria[7];
        let remSeats = criteria[8], price = criteria[9];

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
            
        return filteredFlights;
    }

}
