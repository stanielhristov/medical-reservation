package com.reservation.medical_reservation.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateFormatterUtil {
    
    private static final DateTimeFormatter DATE_TIME_FORMATTER = 
            DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy 'at' h:mm a");
    
    private static final DateTimeFormatter DATE_FORMATTER = 
            DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy");
    
    private static final DateTimeFormatter TIME_FORMATTER = 
            DateTimeFormatter.ofPattern("h:mm a");
    
    /**
     * Formats a LocalDateTime to a user-friendly format for notifications
     * Example: "Monday, September 25, 2024 at 2:30 PM"
     */
    public static String formatForNotification(LocalDateTime dateTime) {
        if (dateTime == null) {
            return "Unknown date";
        }
        return dateTime.format(DATE_TIME_FORMATTER);
    }
    
    /**
     * Formats only the date part for notifications
     * Example: "Monday, September 25, 2024"
     */
    public static String formatDateForNotification(LocalDateTime dateTime) {
        if (dateTime == null) {
            return "Unknown date";
        }
        return dateTime.format(DATE_FORMATTER);
    }
    
    /**
     * Formats only the time part for notifications
     * Example: "2:30 PM"
     */
    public static String formatTimeForNotification(LocalDateTime dateTime) {
        if (dateTime == null) {
            return "Unknown time";
        }
        return dateTime.format(TIME_FORMATTER);
    }
}
