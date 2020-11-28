import React, {Component} from 'react'
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

const placesSearchApiEndpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=restaurant&keyword=restaurant&key=" + API_KEY;
// APP COMPONENT

class App extends Component {
    constructor() {
        super();
        this.state = {
            center: {
                lat:0,
                lng:0
            },
            bounds: {},
            map: null,
            radius: "6047",
            newPlace: [],
            nearbyRestaurants: [],
            selectedRestaurants: null,
            firstRating: 0,
            secondRating: 5,
            query: "",
            infoWindowName: "",
        }
    }

    
    render () {
        
        const reviewsArray = [
            `"Food/service was great!"`,
            `"This place was pretty good"`,
            `"We had an okay experience"`,
            `"Did not have a great experience"`
          ];
        
        return (

        )
    }

}