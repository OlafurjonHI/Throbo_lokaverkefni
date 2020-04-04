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

}
