import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyC4sA4uLg_WujB2UtUayCeHDRSXu8dmGjc");

Geocode.setLanguage("en");

Geocode.setRegion("us");

Geocode.setLocationType("ROOFTOP");

const fetchCoordinates = async (location) => {
    const response = await Geocode.fromAddress(location);
    const { lat, lng } = response.results[0].geometry.location;
    return { lat, lng };
};

export { fetchCoordinates };