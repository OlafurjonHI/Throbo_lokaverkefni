package throbo6T.managers;

import java.util.ArrayList;
import java.util.Random;

import throbo6T.objects.Flight;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.text.DateFormat;
import java.text.ParseException;

public class FlightManager {
	/***
	 *A list of testFlights 
	 */
    private ArrayList<Flight> flights;

    /***
     * @param n: How many flights do you want
     * @throws ParseException: throw date format parse exceptions
     */
    public FlightManager(int n) throws ParseException {
        flights = getFlightsFromData(n);
    }
    
    /***
     * Getter for testFlight
     * @return testFlights ArrayList
     */
    public ArrayList<Flight> getFlights() {
        return this.flights;
    }
    
    /**
     * Goes through the flight list and picks out flights matching the parameter
     * @param airline
     * @return list of flights with the matching parameter
     */
    public ArrayList<Flight> searchFlightsByAirline(String airline){
    	ArrayList<Flight> filteredFlights = new ArrayList<Flight>();
    	for(Flight f : this.flights) {
    		if(f.getAirline().equalsIgnoreCase(airline)) {
    			filteredFlights.add(f);
    		}
    	}
    	return filteredFlights;
    }
    /**
     * Goes through the flight list and picks out flights matching the parameter
     * @param status
     * @return list of flights with the matching parameter
     */
    public ArrayList<Flight> searchFlightsStatus(String status){
    	ArrayList<Flight> filteredFlights = new ArrayList<Flight>();
    	for(Flight f : this.flights){
    		if(f.getStatus().equalsIgnoreCase(status)) {
    			filteredFlights.add(f);
    		}
    	}
    	return filteredFlights;
    }
    /**
     * Goes through the flight list and picks out flights matching the parameter
     * @param stringdate
     * @return list of flights with the matching parameter
     */
    public ArrayList<Flight> searchFlightsByDate(String stringdate) throws ParseException{
    	DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm");
    	Date dd = df.parse(stringdate);

    	ArrayList<Flight> filteredFlights = new ArrayList<Flight>();
    	for(Flight f : this.flights){
    		if(f.getArrivalTime().compareTo(dd) == 0) {
    			filteredFlights.add(f);
    		}
    	}
    	return filteredFlights;
    }
      
    /***
     * Gets flights from test randomized data
     * @param n: how many test flights
     * @return ArrayList of flights
     * @throws ParseException
     */
    private ArrayList<Flight> getFlightsFromData(int n) throws ParseException {
        ArrayList<Flight> flights = new ArrayList<Flight>();
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        
        char[] alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().toCharArray();
        char[] digits = "123456789".toUpperCase().toCharArray();
        String[] places = {"Reykjavík (REY)", "Isafjörður (ISA)", "Akureyri (AKU)"};
        String[] statuses = {"Late", "Arrived", "On Time","Bermuda Triangle"};
        String[] airlines = {"Isavia","Air Connect","Ernir", "Play-Air"};
        for(int i = 0; i < n; i++){
            String flightname = "";
            Random  r = new Random();
            for(int j = 0; j < 5; j++){
                if(j >= 3)
                    flightname += digits[r.nextInt(digits.length)];
                else
                    flightname += alphabet[r.nextInt(alphabet.length)];
            }
            String from = places[r.nextInt(places.length)];
            String to = places[r.nextInt(places.length)];
            while(to != from)
            	to = places[r.nextInt(places.length)];
            String status = statuses[r.nextInt(statuses.length)];
            int day = r.nextInt(29), month = r.nextInt(13);
            int hour = r.nextInt(24), min = r.nextInt(60);
            String depTime = ""+day+"/"+month+"/2020 " + hour +":"+min;
            int nexthour = hour + (r.nextInt(7));
            if(nexthour > 24)
            	nexthour -= hour;
            String arrTime = ""+(day+r.nextInt(3))+"/"+month+"/2020 " + nexthour +":"+ r.nextInt(60);
            String airline = airlines[r.nextInt(airlines.length)];
            double price = (r.nextInt(9)+1) * 100;
            Date dt,at;
            int seatnumber = (r.nextInt(9)+1) * 100;
            int seattaken = (r.nextInt(6)+1) * 100;
            if (seattaken > seatnumber) {
            	int temp = seattaken;
            	seattaken = seatnumber;
            	seatnumber = temp;
            }
            try {
            	dt = df.parse(depTime);
            	at = df.parse(arrTime);
            } catch(Exception e) {
            	System.out.println("Error parsing the Date");
            	dt = at = df.parse("01/01/1990 12:00");
            }
            flights.add(new Flight(flightname,from,to,airline,dt,at,status,price,seatnumber, seattaken,new String[] {""} 
            		));
        }
        return flights;
    }
    
    public static void main(String args[]) throws ParseException {
    	FlightManager fm = new FlightManager(100);
    	for(Flight f : fm.getFlights()) {
    		System.out.println(f.toString());
    	}
    }

}