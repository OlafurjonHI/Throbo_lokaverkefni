class TripManager {
    #trips = [];

    constructor(n) {
        this.#trips = this._getTripsFromData(n);
    }
    getTrips(){
        return this.#trips;
    }
    searchTripsByTitle(substring){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getTitle().toLowerCase().includes(substring))
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByDate(date) {
        let filteredTrips = [];
        let d = Date.parse(date);
        for(const t of this.getTrips())
            if(Date.parse(t.getDate()) === d)
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByDurationLessAnd(h){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getTimeStart() <= h)
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByDurationMoreAnd(h){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getTimeStart() >= h)
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByLocation(loc) {
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getLocation().toLowerCase().includes(loc.toLowerCase()))
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsBySlots(slots){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(parseInt(t.getSlots()) >= parseInt(slots))
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByTaken(taken) {
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(parseInt(t.getSlots()) <= parseInt(taken))
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByPriceLowerAnd(p){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getPrice() <= p)
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByPriceHigherAnd(p){
        let filteredTrips = [];
        for(const t of this.getTrips())
            if(t.getPrice() >= p)
                filteredTrips.push(t);
        return filteredTrips;
    }
    searchTripsByMetaIncludes(mm){
        let filteredTrips = [];
        for (const t of this.getTrips()) {
            for(let meta of t.getMeta()){
                for(let m of mm) {
                    if(meta.toLowerCase().includes(m.toLowerCase())){
                        filteredTrips.push(t);
                        continue;
                    }
                }
            }
        }
        return filteredTrips;
    }
    _getTripsFromData(n) {
        let activities = ['Horseback Riding', "Mountain Climbing", "Extreme Sports", "Deep Diving", "Cave Exploring", "Sightseeing", "Elf Counting","Local Life"]
        let postnumer = getPostNumer();
        let adjectives = getAdjectives();
        let metadata = getTripMetaData();
        let trips = []
        for(let i = 0; i < n; i++){
            
            let title = adjectives[nextInt(adjectives.length-1)];
            title += ` ${activities[nextInt(activities.length-1)]}`
            title = capitalize(title);
            let date = (new Date()).addDays(nextInt(70));
            let timeStart = `${nextInt(23)}:${nextInt(5)*10}`;
            let duration = nextInt(12);
            let location = postnumer[nextInt(postnumer.length-1)];
            let slots = 5 + nextInt(100);
            let taken = nextInt(slots);
            let price = nextDouble(3,2)*50;
            let meta = []
            for(let j = 0; j < nextInt(5)+2; j++){
                let m = metadata[nextInt(metadata.length-1)];
                while(meta.includes(m))
                    m = metadata[nextInt(metadata.length-1)];
                meta.push(m)
            }
            let t = new Trip(title,date,timeStart,duration,location,slots,taken,price,meta)
            trips.push(t)
        }

        return trips;
    }

}

