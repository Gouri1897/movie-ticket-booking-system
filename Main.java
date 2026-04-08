import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        Movie m1 = new Movie("Avengers", 200);

        System.out.println("Enter number of seats:");
        int seats = sc.nextInt();

        Booking b = new Booking();
        b.seats = seats;
        b.calculate(m1.price);

        System.out.println("Total price: " + b.total);
        System.out.println("Booking Confirmed 🎉");
    }
}