package com.rmit.sept.agme;

import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.temporal.TemporalField;
import java.util.Calendar;
import java.util.Date;

public class TimeZoneUtil {
    public static Date addTimeZone(Date date) {
        int offsetSeconds = ZoneId.systemDefault().getRules().getOffset(date.toInstant()).getTotalSeconds();

        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.SECOND, -offsetSeconds);

        return cal.getTime();
    }

    public static Date removeTimeZone(Date date){
        int offsetSeconds = ZoneId.systemDefault().getRules().getOffset(date.toInstant()).getTotalSeconds();

        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.SECOND, offsetSeconds);

        return cal.getTime();
    }
}
