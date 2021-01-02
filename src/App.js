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
import { v4 as uuidv4 } from 'uuid';
import personIcon from './img/person-icon.png'
import restaurantIcon from './img/restaurant-icon.png'

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

const placesSearchApiEndpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=restaurant&keyword=restaurant&key=" + API_KEY;
// APP COMPONENT
export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries
  });


  const [center, setCenter]= useState({lat:0,lng:0})

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPosition, setNewPosition] = useState(null);

  const [bounds, setBounds]= useState({})
  const [map, setMap] = useState(null)

  const radius = 3047;

  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState(null);

  const [firstRating, setFirstRating] = useState(0);
  const [secondRating, setSecondRating] = useState(5);

  const [query, setQuery] = useState("");
  const [infoWindowName, setInfoWindowName] = useState("");


  const reviewsArray = [
    `"Food/service was great!"`,
    `"This place was pretty good"`,
    `"We had an okay experience"`,
    `"Did not have a great experience"`
  ];

  // SET NEW PLACES/MARKERS ON MAPCLICK
  const onMapClick = (e) => {
    setNewPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
    setShowAddModal(true);
  };

// ONMAP LOAD GET MAPBOUNDS
    const onLoad = (map) => {
      let bounds = map.getBounds()
      setMap(map)
      setBounds(bounds)
    };

    const closeAddModal = () => {
      setShowAddModal(false);
      setNewPosition(null);
    };

// ON IDLE FETCH NEW RESTAURANTS WITHIN THE BOUNDS
    const handleMapIdle = () => {
      const bounds = map.getBounds();
      const center = map.getCenter();
      fetchRestaurants(center.lat(), center.lng(), radius)

    }


 //  FETCH NEARBY RESTAURANTS DATA FUNCTION
    async function fetchRestaurants(lat,lng,radius) {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      let apiPlaceSearchUrl = placesSearchApiEndpoint + "&location=" + lat + "," + lng + "&radius=" + radius;
      const response = await fetch(proxyurl + apiPlaceSearchUrl);
      const data = await response.json();

      const filteredRatings =
        data.results &&
        data.results.filter((place) =>
          place.rating >= firstRating && place.rating <= secondRating
            ? place
            : null
        );

      setNearbyRestaurants((current) => ([
              ...current,
              ...filteredRatings
            ]
        ));
    }
      
  //UseEffect Function to fetch the restaurants when the ratings immediately change
      useEffect(() => {
        async function restaurantsByRating(lat,lng,radius) {
          const proxyurl = "https://cors-anywhere.herokuapp.com/";
          let apiPlaceSearchUrl = placesSearchApiEndpoint + "&location=" + lat + "," + lng + "&radius=" + radius;
          const response = await fetch(proxyurl + apiPlaceSearchUrl);
          const data = await response.json();

          const filteredRatings =
            data.results &&
            data.results.filter((place) =>
              place.rating >= firstRating && place.rating <= secondRating
                ? place
                : null
            );
            setNearbyRestaurants(filteredRatings)
            }
            restaurantsByRating(center.lat, center.lng, radius)
      }, [firstRating, secondRating])


  // SHOW USER'S GEO-LOCATION
  function showCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter((prevState) => ({

            ...prevState,
            lat: position.coords.latitude,
            lng: position.coords.longitude

        }));
      });
    } else {
      console.log("error loading map");
    }
  }
  showCurrentLocation();

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
        onIdle={handleMapIdle}

      >
        {/* PERSON-USER ICON */}
        <Marker
          position={{
            lat: center.lat,
            lng: center.lng
          }}
          icon={{
            url: personIcon,
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />

        {/* NEW RESTARUANTS MARKERS AND INFOWINDOW */}
        {
          newPosition &&
          <AddNewModal
              visible={showAddModal}
              newPlaceLat={newPosition.lat}
              newPlaceLng={newPosition.lng}
              onAddRestaurant={(res) => {
                setNearbyRestaurants([res, ...nearbyRestaurants]);

                // console.log(nearbyRestaurants);
                closeAddModal();
              }}
              closeModal={() => {
                closeAddModal();
              }}
          />
        }

        {/* NEARBY RESTAURANT MARKERS AND INFOWINDOWS */}
        {nearbyRestaurants.map((place) => (
          <Marker
            key={uuidv4()}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng
            }}
            onClick={() => {
              setSelectedRestaurants(place);
            }}
            icon={{
              url: restaurantIcon,
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
          key= {uuidv4()}
          nearbyRestaurants={nearbyRestaurants}
          setQuery={setQuery}
          setInfoWindowName={setInfoWindowName}
        />
      </GoogleMap>
    </div>
  );
}
