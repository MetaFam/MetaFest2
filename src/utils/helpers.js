import axios from 'axios';
import { DateTime, Duration } from 'luxon';

// const calUrl = "https://www.googleapis.com/calendar/v3/calendars/ssf7cmml1qqodddh2vkqgmsu8c@group.calendar.google.com/events?key=AIzaSyAVXOGbvAmgOPi7G2dcqjtrSQccUwHj5Gs";
const calUrl = "https://www.googleapis.com/calendar/v3/calendars/85ftetvc3cdl0qop7a36iguacc@group.calendar.google.com/events?key=AIzaSyDo07MSotIB3Q4ETlx_7yxVUB2YKU3MySs";
export const getSpeakers = async (num) => {
  const today = DateTime.now();
  const aBitEarlierThanNow = Duration.fromObject({ minutes: 30 }).negate();
  const next2Days = Duration.fromObject({ days: 3 });
  try {
    const res = await axios.get(calUrl, {
      params: {
        maxResults: num,
        timeMin: today.toISO(),
        timeMax: today.plus(next2Days).toISO(),
        singleEvents: true,
        orderBy: "startTime",
        status: "confirmed",
        fields: "items(description,end,start,summary,htmlLink,location, status)",
      }
    });
    if (res.status === 200) {
      return res.data.items.length > 0 ? res.data.items : null;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error fetching calendar', error);
  }
};