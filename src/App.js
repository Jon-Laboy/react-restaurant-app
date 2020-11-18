import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import AddNewModal from "./Components/AddNewModal";
import mapStyles from "./mapStyles";
import StarRatings from "react-star-ratings";
import FilterRatings from "./Components/FilterRatings";
import RestaurantList from "./Components/RestaurantList";

// GLOBAL VARIABLES
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const libraries = ["places"];

const mapContainerStyle = {
  height: "100vh",
  width: "100vw"
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};

// APP COMPONENT
export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries
  });

  const [userState, setUserState] = useState({
    currentLatLng: { lat: 0, lng: 0 }
  });

  const [newPlace, setNewPlace] = useState([]);

  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState(null);

  const [firstRating, setFirstRating] = useState(0);
  const [secondRating, setSecondRating] = useState(5);

  const [query, setQuery] = useState("");
  const [infoWindowName, setInfoWindowName] = useState("");


  const [map, setMap] = useState(null)


  const reviewsArray = [
    `"Food/service was great!"`,
    `"This place was pretty good"`,
    `"We had an okay experience"`,
    `"Did not have a great experience"`
  ];

  // ONLOAD FUNCTION WHERE I GET BOUNDS/////////////////////////////////////////////

  const onLoad = React.useCallback(function callback(map) {

    //NEEDED IDLE EVENT TO THEN REQUEST BOUNDS MAKING IT NOT 'UNDEFINED'/////////////////
    map.addListener('idle', function () {

      let bounds = map.getBounds();

      let ne = bounds.getNorthEast();
      let sw = bounds.getSouthWest();
      let nw = new window.google.maps.LatLng(ne.lat(), sw.lng());
      let se = new window.google.maps.LatLng(sw.lat(), ne.lng());
      // console.log(se.lat())

      //FUNCTION TO FIND AREA OF THE BOUNDS AS REFERRED FROM https://stackoverflow.com/questions/34447415/how-to-find-out-the-area-in-google-maps-api /////// 
      function getDistanceInMeters(location1, location2) {
        let lat1 = location1.lat();
        let lon1 = location1.lng();

        let lat2 = location2.lat();
        let lon2 = location2.lng();

        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1);
        let dLon = deg2rad(lon2 - lon1);
        let a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return (d * 1000);

        function deg2rad(deg) {
          return deg * (Math.PI / 180);
        }
      }

      let length = getDistanceInMeters(sw, nw);
      let breadth = getDistanceInMeters(sw, se);

      let area = length * breadth; // in square meters


      console.log(area)

    });
  }, [])


  // SET NEW PLACES/MARKERS ON MAPCLICK
  const onMapClick = React.useCallback((e) => {
    setNewPlace((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    ]);
  }, []);


  // USEEFFECT TO FETCH NEARBY RESTAURANTS
  useEffect(() => {
    async function fetchRestaurants() {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userState.currentLatLng.lat},${userState.currentLatLng.lng}&radius=6047&type=restaurant&key=${API_KEY}`
      );
      const data = await response.json();
      const filteredRatings =
        data.results &&
        data.results.filter((place) =>
          place.rating >= firstRating && place.rating <= secondRating
            ? place
            : null
        );
      setNearbyRestaurants(filteredRatings);
    }
    fetchRestaurants();
  }, [
    userState.currentLatLng.lat,
    userState.currentLatLng.lng,
    firstRating,
    secondRating
  ]);


  // SHOW USER'S GEO-LOCATION
  function showCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserState((prevState) => ({
          currentLatLng: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
      });
    } else {
      console.log("error loading map");
    }
  }
  showCurrentLocation();


  const center = {
    lat: userState.currentLatLng.lat,
    lng: userState.currentLatLng.lng
  };

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading...";

  return (
    <div className="App">
      <h1>Restaurant Review</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        options={options}
        onClick={onMapClick}
        zoom={13}
        onLoad={onLoad}

      >
        {/* PERSON-USER ICON */}
        <Marker
          position={{
            lat: userState.currentLatLng.lat,
            lng: userState.currentLatLng.lng
          }}
          icon={{
            url: "/person-icon.png",
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />

        {/* NEW RESTARUANTS MARKERS AND INFOWINDOW */}
        {newPlace.map((place) => (
          <AddNewModal
            key={`${place.lat}-${place.lng}`}
            // nearbyRestaurants={nearbyRestaurants}
            newPlaceLat={place.lat}
            newPlaceLng={place.lng}
            onAddRestaurant={(res) => {
              setNearbyRestaurants([res, ...nearbyRestaurants]);
            }}
          />
        ))}



        {/* NEARBY RESTAURANT MARKERS AND INFOWINDOWS */}
        {nearbyRestaurants.map((place) => (
          <Marker
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng
            }}
            onClick={() => {
              setSelectedRestaurants(place);
            }}
            icon={{
              url: "/restaurant-icon.png",
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
        ))}

        {/* NEARBY RESTAURANT INFOWINDOWS */}
        {selectedRestaurants ? (
          <InfoWindow
            position={{
              lat: selectedRestaurants.geometry.location.lat,
              lng: selectedRestaurants.geometry.location.lng
            }}
            onCloseClick={() => {
              setSelectedRestaurants(null);
            }}
          >
            <div>
              <h4>{selectedRestaurants.name}</h4>
              <img
                src={`https://maps.googleapis.com/maps/api/streetview?size=160x80&location=${selectedRestaurants.geometry.location.lat},${selectedRestaurants.geometry.location.lng}&fov=80&heading=70&pitch=0&key=${API_KEY}`}
                alt="restaurant-street-view"
              />
              <div style={{ color: "gold" }}>
                {selectedRestaurants.rating}{" "}
                <span>
                  {" "}
                  <StarRatings
                    rating={selectedRestaurants.rating}
                    starDimension="18px"
                    starSpacing="1px"
                    starRatedColor="gold"
                    numberOfStars={5}
                  />
                </span>
              </div>
              <div>
                <div>
                  {infoWindowName === selectedRestaurants.name
                    ? `"${query}"`
                    : null}
                </div>

                {selectedRestaurants.rating >= 4
                  ? reviewsArray[0]
                  : selectedRestaurants.rating >= 3.5
                    ? reviewsArray[1]
                    : selectedRestaurants.rating >= 3
                      ? reviewsArray[2]
                      : reviewsArray[3]}
              </div>
            </div>
          </InfoWindow>
        ) : null}

        {/* FILTER RATINGS */}
        <FilterRatings
          firstRating={firstRating}
          setFirstRating={setFirstRating}
          secondRating={secondRating}
          setSecondRating={setSecondRating}
        />

        {/* RESTAURANT LIST */}
        <RestaurantList
          key={nearbyRestaurants}
          nearbyRestaurants={nearbyRestaurants}
          setQuery={setQuery}
          setInfoWindowName={setInfoWindowName}
        />
      </GoogleMap>
    </div>
  );
}
