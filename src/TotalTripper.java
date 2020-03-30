import java.text.ParseException;
import java.util.ArrayList;
import java.util.stream.Collectors;

import throbo6T.managers.FlightManager;
import throbo6T.objects.Flight;

public class TotalTripper {
		/**
		 * Mock FlightManager Object to get Mock data from Flights
		 */
		private static FlightManager flmgr;
		
	    public static void main(String[] args) throws ParseException {  
	    	testFlightManager();
	    }
	    /**
	     * Generic self test to test if we can read from the initialized manager and if we can filter flights
	     * @throws ParseException DateParse Exception
	     */
	    public static void testFlightManager() throws ParseException {
	    	initializeManagers();
	    	printInfo(flmgr);
	    	String[] statuses = {"Late", "Arrived", "On Time","Bermuda Triangle"};
	        String[] airlines = {"ISAVIA","Air Connect","Spooky Air", "WOW Air"};
	        String[] criteria = {airlines[0],"11/05/20 11:00",statuses[0]};
	    	ArrayList<Flight> filtered = getFilteredFlights(criteria);
	    	System.out.println();
	    	printInfo(filtered);
	    }
	    
	    /**
	     * Initialized the managers
	     * @throws ParseException DateParse Exception
	     */
	    public static void initializeManagers() throws ParseException {
	    	flmgr = new FlightManager(20);
	    }
	    
	    /**
	     * returns the flightManager
	     * @return flmgr
	     */
	    public FlightManager getFlightManager() {
	    	return this.flmgr;
	    }
	    
	    /**
	     * returns the flights from the FlightManager
	     * @return flights
	     */
	    public ArrayList<Flight> getAllFlights() {
	    	return flmgr.getFlights();
	    }
	    
	    /**
	     * returns the intersection of two ArrayList objects of a generic type
	     * if list1 contains {A,B,C} and list 2 contains {B,C,D} it returns a new list 
	     * containing {B,C}
	     * @param <T> Generic identifier
	     * @param list1 Generic ArrayList
	     * @param list2 Generic ArrayList
	     * @return an intersected list from the objects of the given parameters
	     */
	    public static <T> ArrayList<T> intersection(ArrayList<T> list1, ArrayList<T> list2) {
	    	ArrayList<T> list = new ArrayList<T>();
	        for (T t : list1) {
	            if(list2.contains(t)) {
	                list.add(t);
	            }
	        }
	        return list;
	    }
	    
	    /**
	     * Returns filteredFlights from the flight list of the FlightManager depending on the criteria given
	     * if open for any the specified "slot" in the string is given a blank value
	     * @param ads airline, date, status
	     * @return list containing flights matching given criteria
	     * @throws ParseException DateParse Exception
	     */
	    public static ArrayList<Flight> getFilteredFlights(String[] ads) throws ParseException {
	    	ArrayList<Flight> filteredFlights = new ArrayList<Flight>();
	    	String airline = ads[0];
	    	String stringdate = ads[1];
	    	String status = ads[2];
	    	if (!airline.isBlank()) {
	    		ArrayList<Flight> airlineFlights = flmgr.searchFlightsByAirline(airline);
				if (airlineFlights.size() == 0) {
					filteredFlights.clear();
					return filteredFlights;
				}
	    		filteredFlights.addAll(airlineFlights);
	    	}
	    	if (!stringdate.isBlank()) {
	    		ArrayList<Flight> dateFlights = flmgr.searchFlightsByDate(stringdate);
	    		if(dateFlights.size() == 0) {
					filteredFlights.clear(); return filteredFlights;
	    		}
	    		else if(filteredFlights.size() == 0)
	    			filteredFlights.addAll(dateFlights);
	    		else
	    			filteredFlights = intersection(filteredFlights,flmgr.searchFlightsByDate(stringdate));
	    	}
	    	if(!status.isBlank()) {
	    		ArrayList<Flight> statusFlights = flmgr.searchFlightsStatus(status);
	    		if(statusFlights.size() == 0) {
	    			filteredFlights.clear(); return filteredFlights;
	    		}
	    		else if(filteredFlights.size() == 0)
	    			filteredFlights.addAll(flmgr.searchFlightsStatus(status));
	    		else
	    			filteredFlights = intersection(filteredFlights,flmgr.searchFlightsStatus(status));
	    	}
	    	filteredFlights = (ArrayList<Flight>) filteredFlights.stream().distinct().collect(Collectors.toList());
	    	return filteredFlights;
	    	
	    }
	    
	    /**
	     * prints the ToString method of the flights from given FlightManager
	     * @param flmgr FlightManager
	     */
	    public static void printInfo(FlightManager flmgr) {
	        ArrayList<Flight> flights = flmgr.getFlights();
	        System.out.println("Number of Flights: " + flights.size());
	        for (Flight f : flights) {
	            System.out.println(f.toString());
	        }
	    }
	    /**
	     * Prints the ToString method of the Flights in the given ArrayList flights
	     * @param flights list of flights
	     */
	    public static void printInfo(ArrayList<Flight> flights) {
	        System.out.println("Number of Flights: " + flights.size());
	        for (Flight f : flights) {
	            System.out.println(f.toString());
	        }
	    }
	}