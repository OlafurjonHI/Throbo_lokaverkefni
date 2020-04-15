class MainManager {
    #tManager = [];
    #hManager = [];
    #fManager = [];
    #packageInfo = new Array(4);
    constructor(n) {
        this.#tManager = new TripManager(400);
        this.#hManager = new HotelManager(n);
        this.#fManager = new FlightManager(n);
        this.#packageInfo[3] = []
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
    addFlightToPackage(id) {
        this.#packageInfo[0] = this.#fManager.getFlightById(id)
    }
    addFlightBackToPackage(id) {
        this.#packageInfo[1] = this.#fManager.getFlightById(id);
    }
    addTripToPackage(id) {
        this.#packageInfo[3].push(this.#tManager.getTripsById(id));
    }
    removeTripFromPackage(id){
        let newtrips = []
        for(let t of this.#packageInfo[3]){
            if((t.getInfoAsObject()).id != id)
                newtrips.push(t)
        }
        this.#packageInfo[3] = newtrips
    }
    getTripPackageContains(id){
        return this.#packageInfo[3].includes(this.#tManager.getTripsById(id));
    }
    addHotelToPackage(id) {
        this.#packageInfo[2] = this.#hManager.getHotelById(id);
    }
    getPackageInfo() {
        return this.#packageInfo;
    }
    getTotalPackagePrice(a=1,c=0,r=1){
        let totalPrice = 0
        for(let i = 0; i < this.#packageInfo.length-1;i++){
            let item = (this.#packageInfo)[i]
            if(item){
                if(i == 2)
                    totalPrice += parseInt(item.getInfoAsObject().price)*r;
                else
                    totalPrice += parseInt(item.getInfoAsObject().price)*(a+c);
            }
                
        }
        for(let t of this.#packageInfo[3]){
            totalPrice += parseInt(t.getInfoAsObject().price)*(a+c)
        }
        return totalPrice;

    }
    getFilteredFlights(criteria,sortVal = 0) {
        sortVal = parseInt(sortVal)
        let nulls = 0;
        for (let c of criteria) {
            if (c === "") {
                nulls++
            }
        }
        if (nulls === criteria.length) {
            return this.getAllFlights();
        }
        let filteredData = [];
        let fNo = criteria[0], from = criteria[1];
        let to = criteria[2], airline = criteria[3];
        let depTime = criteria[4], arrTime = criteria[4];
        let status = criteria[5], totalSeats = criteria[6];
        let remSeats = criteria[7], price = criteria[8], meta = criteria[9]

        if (fNo !== "") {
            filteredData = this.#fManager.searchFlightsByFlightNo(fNo)
        }
        if (from !== "") {
            let res = this.#fManager.searchFlightsByFrom(from)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (to !== "") {
            let res = this.#fManager.searchFlightsByTo(to)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (airline !== "") {
            let res = this.#fManager.searchFlightsByAirline(airline)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (depTime !== "") {
            let res = this.#fManager.searchFlightsByExactDateAndNewer(depTime)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (status !== "") {
            let res = this.#fManager.searchFlighTsByStatus(status)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (totalSeats !== "") {
            let res = this.#fManager.searchFlightsByTotalSeats(totalSeats)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }

        if (remSeats !== "") {
            let res = this.#fManager.searchFlightsByAtleastXFreeSeats(remSeats)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (price !== "") {
            let res = this.#fManager.searchFlightsByPriceLower(price)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (meta.length > 0) {
            let res = this.#fManager.searchFlightsByMetaIncludes(meta)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }

        }
        if(sortVal === 1)
            sortArrByPriceLowestFirst(filteredData)
        if(sortVal === 2)
            sortArrByPriceHighestFirst(filteredData)

        return filteredData;
    }
    getFilteredHotels(criteria,sortVal = 0) {
        sortVal = parseInt(sortVal)
        let nulls = 0;
        for (let c of criteria) {
            if (c === "") {
                nulls++
            }
        }
        if (nulls === criteria.length) {
            return this.getAllHotels();
        }
        let filteredData = [];
        let name = criteria[0], address = criteria[1];
        let stars = criteria[2], rating = criteria[3];
        let smallRooms = criteria[4], bigRooms = criteria[5];
        let price = criteria[6], meta = criteria[7];

        if (name !== "") {
            filteredData = this.#hManager.searchHotelsByName(name)
        }
        if (address !== "") {
            let res = this.#hManager.searchHotelsByAddress(address)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (stars !== "") {
            let res = this.#hManager.searchHotelsByMoreStars(stars)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (rating !== "") {
            let res = this.#hManager.searchHotelsByHigherRating(rating)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (smallRooms !== "") {
            let res = this.#hManager.searchHotelsByMoreSmallRooms(smallRooms)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (bigRooms !== "") {
            let res = this.#hManager.searchHotelsByMoreBigRooms(bigRooms)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }

        if (price !== "") {
            let res = this.#hManager.searchHotelsByPriceLess(price)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (meta.length > 0) {
            let res = this.#hManager.searchHotelsByMetaIncludes(meta)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }

        }
        if(sortVal === 1)
            sortArrByPriceLowestFirst(filteredData)
        if(sortVal === 2)
            sortArrByPriceHighestFirst(filteredData)
        if(sortVal === 4)
            sortArrByStarsLowestFirst(filteredData)
        if(sortVal === 3)
            sortArrByStarsHighestFirst(filteredData)
        if(sortVal === 6)
            sortArrByRatingLowestFirst(filteredData)
        if(sortVal === 5)
            sortArrByRatingHighestFirst(filteredData)
        
        return filteredData;
    }
    getFilteredTrips(criteria,sortVal = 0) {
        sortVal = parseInt(sortVal)
        let nulls = 0;
        for (let c of criteria) {
            if (c === "") {
                nulls++
            }
        }
        if (nulls === criteria.length) {
            return this.getAllTrips();
        }
        let filteredData = [];
        let title = criteria[0], dates = criteria[1].split('$');
        let timeStart = criteria[2], duration = criteria[3];
        let location = criteria[4], slots = criteria[5];
        let taken = criteria[6], price = criteria[7], meta = criteria[8]

        if (title !== "") {
            filteredData = this.#tManager.searchTripsByTitle(title)
        }
        if (dates !== "") {
            let res = this.#tManager.searchTripsByDatesBetween(dates[0], dates[1])
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (timeStart !== "") {
            let res = this.#tManager.searchTripsByDurationLessAnd(timeStart)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (duration !== "") {
            let res = this.#tManager.searchTripsByDurationLessAnd(duration)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (location !== "") {
            let res = this.#tManager.searchTripsByLocation(location)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (slots !== "") {
            let res = this.#tManager.searchTripsBySlots(slots)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (taken !== "") {
            let res = this.#tManager.searchTripsByTaken(taken)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }

        if (price !== "") {
            let res = this.#tManager.searchTripsByPriceLowerAnd(price)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }
        }
        if (meta.length > 0) {
            let res = this.#tManager.searchTripsByMetaIncludes(meta)
            if (res.length === 0) {
                filteredData = [];
                return filteredData;
            }
            else {
                if (filteredData.length == 0) {
                    filteredData = res
                }
                else
                    filteredData = intersection(filteredData, res)
            }

        }
        if(sortVal === 1)
            sortArrByPriceLowestFirst(filteredData)
        if(sortVal === 2)
            sortArrByPriceHighestFirst(filteredData)
        if(sortVal === 3)
            sortArrByDurationHighestFirst(filteredData)
        if(sortVal === 4)
            sortArrByDurationLowestFirst(filteredData)
        if(sortVal === 5)
            sortArrByDateLowestFirst(filteredData)


        return filteredData;
    }
}


