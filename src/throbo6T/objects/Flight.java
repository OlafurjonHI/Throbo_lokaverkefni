package throbo6T.objects;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/***
 * A Flight Class to contain Flight instances
 */
public class Flight {
    public static int flightId = 1;
    private String flightNo;
    private String from;
    private String to;
    private String airline;
    private Date departureTime;
    private Date arrivalTime;
    private String status;
    private double price;
    private String[] totalSeats;
    private ArrayList<String> takenSeats = new ArrayList<String>();
    private ArrayList<String> flightMeta = new ArrayList<String>();
    
    /**
     * Constructor for Flight, takes parameters given an initializes the object with the given parameters
     * @param fNo FlightNumber of the Flight
     * @param from the point where is flown from
     * @param to the point where is flown to
     * @param airline what airline is being flown with
     * @param depTime date and time of flight
     * @param status status of the flight
     * @param fMeta metadata for further details if needed on location or events linked to the flight
     */
    public Flight(String fNo, String from, String to,String airline, Date depTime, Date arrivTime, String status, double price, int seatsTotal, int seatsTaken, String[] fMeta) {
        this.flightNo = fNo;
        this.from = from;
        this.to = to;
        this.airline = airline;
        this.departureTime = depTime;
        this.arrivalTime = arrivTime;
        this.status = status;
        this.price = price;
        this.totalSeats = new String[seatsTotal];
        initializeSeats(this.totalSeats);
        initializeTakenSeats(seatsTaken);
        for (String m : fMeta) {
            this.flightMeta.add(m);
        }
        flightId++;
    }
    /**
     * Fills the seats list with available seats
     * @param seats the list to fill of seats
     */
    private void initializeSeats(String[] seats) {
    	char[] alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().toCharArray();	
    	int N = seats.length;
    	int seatsplit = N/100;
    	for(int i = 0,j = 0,k = 0; i < N; i++,j++) {
        	String seat = "";
    		if(j % seatsplit == 0 )
    			j = 0; k++;
    		seat+= alphabet[j];
    		if(k < 10)
    			seat+="0";
    		seat+=(k+1);
    		seats[i] = seat;
    	}
    }
    /**
     * fills taken seats with available seats
     * @param taken - Number of taken seats
     */
    private void initializeTakenSeats(int taken) {
    	for(int i = 0; i < taken; i++) {
    		this.takenSeats.add(this.totalSeats[i]);
    	}
    }
    /**
     * Get only the FlightID
     * @return the flight ID number
     */
    public int getFlightId() {
        return flightId;
    }
    
    /**
     * Get only the flight number from specific flight
     * @return the flight number
     */
    public String getFlightNumber() {
        return this.flightNo;
    }
    /**
     * If needed to change the flight number, overwrites current flight number with the new one
     * @param fNo new flight number
     */
    public void SetFlightNumber(String fNo) {
        this.flightNo = fNo;
    }
    
    /**
     * Get the Airline name from the current Flight
     * @return airline 
     */
    public String getAirline() {
    	return this.airline;
    }
    
    /**
     * Get the Date and Time of the Flight
     * @return Date in  dd/MM/yyyy HH:mm format
     */
    public Date getDepartureTime() {
        return this.departureTime;
    }
    
    /**
	 * @return the arrivalTime
	 */
	public Date getArrivalTime() {
		return arrivalTime;
	}
	/**
	 * @param arrivalTime the arrivalTime to set
	 */
	public void setArrivalTime(Date arrivalTime) {
		this.arrivalTime = arrivalTime;
	}
	/**
     * Updates the Date and time of the flight if needed
     * @param newDate the date to replace the old one
     */
    public void setTimePlan(Date newDate) {
        this.departureTime = newDate;
    }
    
    /**
     * Get the status of the current flight
     * @return status
     */
    public String getStatus() {
    	return this.status;
    }
    
    /**
	 * @return the price
	 */
	public double getPrice() {
		return price;
	}
	/**
	 * @param price the price to set
	 */
	public void setPrice(double price) {
		this.price = price;
	}
	/**
     * get the Keywords in Meta 
     * @return meta keyword array
     */
    public String[] getFlightMeta() {
        String[] meta = new String[this.flightMeta.size()];
        int i = 0;
        for (String m : this.flightMeta) {
            meta[i] = m;
            i++;
        }
        return meta;
    }
    /**
     * Adds keywords to the flight metadata
     * @param metas String of keywords that get added to the Metadata
     */
    public void addFlightMeta(String[] metas) {
        for (String m : metas) {
            this.flightMeta.add(m);
        }
    }
    
    public int getTotalSeatsAvailable() {
    	return this.totalSeats.length;
    }
    
    public int getTotalTakenSeats() {
    	return this.takenSeats.size();
    }
    
    public int getTotalRemainingSeatsAvailable() {
    	return this.getTotalSeatsAvailable() - getTotalTakenSeats();
    }
    
    
    public String[] GetNewSeat(int quantity) {
    	String[] seats = new String[quantity];
    	int takenSeats = getTotalTakenSeats();
    	if(takenSeats+quantity > getTotalSeatsAvailable()) {
    		return null;
    	}
    	for(int i = takenSeats,j = 0; i < takenSeats+quantity;i++,j++) {
    		String seat = this.totalSeats[i];
    		seats[j] = seat;
    		this.takenSeats.add(seat);
    	}
    	return seats;
    }
    
    public String GetNewSeat() {
    	int takenSeats = getTotalTakenSeats();
    	if(takenSeats+1 > getTotalSeatsAvailable()) {
    		return null;
    	}
    	this.takenSeats.add(this.totalSeats[takenSeats+1]);
    	return this.totalSeats[takenSeats+1];
    }
    
    /**
     * toString Method to display essential information if needed in a generalized format
     */
    @Override
    public String toString() {
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        return new String("FlightNumber: " + this.flightNo + " Arriving from: " + this.from + " Arriving to: " + this.to
                +" Airline: "+ this.airline +" Timeplan: " + df.format(this.departureTime) + " Status: " + this.status);
    }

}