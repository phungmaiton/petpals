import Geocode from "react-geocode";

Geocode.setApiKey("YOUR_GOOGLE_MAPS_API_KEY"); // Replace with your Google Maps API key

// Function to fetch latitude and longitude using Geocode API for a given meetup
const fetchMeetupLocation = async (meetup) => {
  const { street_address, city, state, country } = meetup;
  const meetupAddress = `${street_address}, ${city}, ${state}, ${country}`;

  try {
    const response = await Geocode.fromAddress(meetupAddress);
    const { lat, lng } = response.results[0].geometry.location;
    return { ...meetup, latitude: lat, longitude: lng };
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Function to calculate latitude and longitude for all meetups in the list
export const CalculateLatLongForMeetups = async (meetups) => {
  const updatedMeetups = await Promise.all(meetups.map(fetchMeetupLocation));
  return updatedMeetups.filter((meetup) => meetup !== null);
};
