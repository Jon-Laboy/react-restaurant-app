getApiData = (lat, lng, radius) => {
    // Reset state of "isLoading", "apiData" and "restaurantsList" to avoid duplicated components
    this.setState({
      isLoading: true,
      apiData: [],
      restaurantsList: [],
    });
    let apiPlaceSearchUrl =
      placesSearchApiEndpoint +
      "&location=" +
      lat +
      "," +
      lng +
      "&radius=" +
      radius;
    let apiPlacesData = [];
    // Fetch data from Places Search API
    fetch(apiPlaceSearchUrl)
      .then((response) =>
        response.ok
          ? response.json()
          : console.log("Fetch Place Search API data failed")
      )
      .then((data) => {
        for (let result of data.results) {
          let apiPlaceDetailsUrl = placesDetailsApiEndpoint + result.place_id;
          // Fetch data from Places Details API
          fetch(apiPlaceDetailsUrl)
            .then((response) =>
              response.ok
                ? response.json()
                : console.log("Fetch Place Details API data failed")
            )
            .then((data) => {
              // Add restaurant's data to an array and update the "restaurantsList"
              apiPlacesData.push(data);
              this.getRestaurantsList(
                this.state.minRating,
                this.state.maxRating,
                this.state.bounds
              );
            })
            .catch((err) =>
              console.log("Error when fetching Place Details API", err)
            );
        }
      })
      .then(() => {
        // Once all data is fetched, set state of "apiData" and "isLoading"
        if (apiPlacesData != null) {
          this.setState({
            apiData: apiPlacesData,
            isLoading: false,
          });
        }
      })
      .catch((err) => console.log("Error when fetching Place Search API", err));
  };
