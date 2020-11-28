// USEEFFECT TO FETCH NEARBY RESTAURANTS
  useEffect(() => {
    async function fetchRestaurants(lat,lng,radius) {
        let apiPlaceSearchUrl = placesSearchApiEndpoint + "&location=" + lat + "," + lng + "&radius=" + radius;
      const response = await fetch(apiPlaceSearchUrl);
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
    center.lat,
    center.lng,
    firstRating,
    secondRating
  ]);