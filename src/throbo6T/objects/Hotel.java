package throbo6T.objects;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.Random;

public class Hotel {
	public static int id = 1;
	private String name;
	private String address;
	private int stars;
	private double rating;
	private int maxSmallRooms;
	private int maxBigRooms;
	private HashMap<Date, Integer> freeSmallRoomsPerDate = new HashMap<Date,Integer>();
	private HashMap<Date, Integer> freeBigRoomsPerDate = new HashMap<Date,Integer>();

	private ArrayList<String> hotelMeta = new ArrayList<String>();
    private double price;
	
    public Hotel(String name, String address, int stars,double rating,
    		int maxSmall, int maxBig,String[] hMeta, double price) throws ParseException {
    	
    	this.name = name;
    	this.address = address;
    	this.stars = stars;
    	this.rating = rating;
    	initializeSmallRooms(maxSmall);
    	initializeBigRooms(maxBig);
    	this.price = price;
    	for(String m : hMeta) {
    		this.hotelMeta.add(m);
    	}
    	id++;
    }
    
    
	
	private void initializeBigRooms(int maxBig) throws ParseException {
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        Calendar cal = Calendar.getInstance();
		int month = cal.get(Calendar.MONTH)+1;
		String stringdate = "07/"+month+"/2020";
		cal.setTime(df.parse(stringdate));
		for(int i = 0; i < 365; i++) {
			Random r = new Random();
			int taken = r.nextInt(maxBig-10)+10;
			this.freeBigRoomsPerDate.put(cal.getTime(), maxBig - taken);
			cal.add(Calendar.DATE, 1);
		}	
	}



	private void initializeSmallRooms(int maxSmall) throws ParseException {
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        Calendar cal = Calendar.getInstance();
		int month = cal.get(Calendar.MONTH)+1;
		String stringdate = "07/"+month+"/2020";
		cal.setTime(df.parse(stringdate));
		for(int i = 0; i < 365; i++) {
			Random r = new Random();
			int taken = r.nextInt(maxSmall-10)+10;
			this.freeSmallRoomsPerDate.put(cal.getTime(), maxSmall - taken);
			cal.add(Calendar.DATE, 1);
		}
		
		
	}



	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}
	/**
	 * @return the rating
	 */
	public double getRating() {
		return rating;
	}

	/**
	 * @return the stars
	 */
	public int getStars() {
		return stars;
	}
	
	public int getTotalFreeSmallRooms(Date d) {
		return this.freeSmallRoomsPerDate.get(d);
	}
	
	public int getTotalFreeBigRooms(Date d) {
		return this.freeBigRoomsPerDate.get(d);
	}
	public ArrayList<Date> getDatesWhereSmallRoomsAvailable(int groupsize) {
		ArrayList<Date> Dates = new ArrayList<Date>();
		for(Entry<Date, Integer> entry : this.freeSmallRoomsPerDate.entrySet()) {
			int totalppl = entry.getValue()*2;
			if(totalppl >= groupsize)
				Dates.add(entry.getKey());
		}
		return Dates;
	}
	
	public ArrayList<Date> getDatesWhereBigRoomsAvailable(int groupsize) {
		ArrayList<Date> Dates = new ArrayList<Date>();
		for(Entry<Date, Integer> entry : this.freeBigRoomsPerDate.entrySet()) {
			int totalppl = entry.getValue()*4;
			if(totalppl >= groupsize)
				Dates.add(entry.getKey());
		}
		return Dates;
	}
	
	public int getTotalRoomCount() {
		return this.maxBigRooms + this.maxSmallRooms;
	}



	/**
	 * @return the price
	 */
	public double getPrice() {
		return price;
	}



	/**
	 * @return the maxSmallRooms
	 */
	public int getMaxSmallRooms() {
		return maxSmallRooms;
	}



	/**
	 * @return the maxBigRooms
	 */
	public int getMaxBigRooms() {
		return maxBigRooms;
	}
	
    /**
     * toString Method to display essential information if needed in a generalized format
     */
    @Override
    public String toString() {
        return new String("Hotel Name: " + this.getName() + " Location: " + this.getAddress() + " Stars: " + this.getStars()
                +" Total Rooms: "+ this.getTotalRoomCount() +" Rating: " + this.getRating() + " Price: " + this.getPrice()+"$");
    }
}
