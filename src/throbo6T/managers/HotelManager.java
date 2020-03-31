package throbo6T.managers;

import java.io.File;
import java.io.FileNotFoundException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.Random;
import throbo6T.objects.Hotel;

public class HotelManager {
	
	private ArrayList<Hotel> hotels;
	
	public HotelManager(int n) throws FileNotFoundException, ParseException {
		hotels = getHotelsFromData(n);
		
	}
	public static void main(String[] args) throws FileNotFoundException, ParseException {
		HotelManager hman = new HotelManager(10);
		for(Hotel h : hman.getHotels()) {
			System.out.println(h.toString());
		}
	}

	@SuppressWarnings("resource")
	private ArrayList<Hotel> getHotelsFromData(int n) throws FileNotFoundException, ParseException {
		ArrayList<Hotel> hotellist = new ArrayList<Hotel>(); 
		File f = new File("src/extras/adjectives.txt");
		System.out.println(f.getAbsolutePath());
		Scanner scanner = new Scanner(f);
		ArrayList<String> adjectives = new ArrayList<String>();
		ArrayList<String> nouns = new ArrayList<String>();
		ArrayList<String> addresses = new ArrayList<String>();
		ArrayList<String> hotelmeta = new ArrayList<String>();

		while(scanner.hasNext()) {
			adjectives.add(scanner.next());
		}
		scanner.close();
		f = new File("src/extras/nouns.txt");
		scanner = new Scanner(f);
		while(scanner.hasNext()) {
			nouns.add(scanner.next());
		}
		scanner.close();
		f = new File("src/extras/postnumer.txt");
		scanner = new Scanner(f,"UTF-8").useDelimiter(";");
		while(scanner.hasNext()) {
			String text = scanner.next().replace(",", " ").strip();
			//System.out.println(text);
			addresses.add(text);
		}
		scanner.close();
		f = new File("src/extras/hotelmetadata.txt");
		scanner = new Scanner(f);
		while(scanner.hasNext()) {
			hotelmeta.add(scanner.next());
		}
		scanner.close();
		Random r = new Random();
		for(int i = 0; i < n; i++) {
			String name = "";
			if(r.nextInt(2) > 0)
				name += "The ";
			String adj = adjectives.get(r.nextInt(adjectives.size()));
			name += capitalize(adj);
			String noun = nouns.get(r.nextInt(nouns.size()));
			name += " "+ capitalize(noun);
			String address = addresses.get(r.nextInt(addresses.size()));
			int stars = r.nextInt(3)+3;
			double rating = ((r.nextDouble()*3)+2);
			rating =  Double.parseDouble(String.format("%.2f", rating));
			String[] meta = new String[r.nextInt(10)+2];
			for(int j = 0; j < meta.length;j++) {
				meta[j] = "None";
			}
			for(@SuppressWarnings("unused") String m : meta) {
				String potmet = hotelmeta.get(r.nextInt(hotelmeta.size()));
				while(contains(meta,potmet))
					potmet = hotelmeta.get(r.nextInt(hotelmeta.size()));
				m = potmet;
			}
			
			double price = (r.nextDouble()+10)*100;
			price = Double.parseDouble(String.format("%.2f", price));
			
			hotellist.add(new Hotel (
					name,address,stars,rating,100,50,meta,price
					));
		}
		
		return hotellist;
	}
	
	public static String capitalize(String str)
	{
	    if(str == null) return str;
	    return str.substring(0, 1).toUpperCase() + str.substring(1);
	}
	
	public static boolean contains(String[] arr, String val) {
		for(String s : arr)
			if (s.equalsIgnoreCase(val))
				return true;
		return false;
	}

	/**
	 * @return the hotels
	 */
	public ArrayList<Hotel> getHotels() {
		return hotels;
	}
}
