function getLocationDetails(zipCode) {

    hideContent();

    if ( zipCode !== "" && parseInt(zipCode) > 210 && parseInt(zipCode) < 99950) {
        const URL_API = `https://api.zippopotam.us/us/${zipCode}`;

        return fetch(URL_API)
            .then(response => response.json())
            .then(data => {
                if ( data?.places ) {
                    // Google Maps URL
                    const MAPS_URL = `https://www.google.com/maps/@${data.places[0].latitude},${data.places[0].longitude},13z`;

                    // location name
                    document.getElementById("location-name").innerHTML = data.places[0]["place name"];

                    // State name
                    document.getElementById("state-name").innerHTML = data.places[0]["state"];

                    // State SVG
                    document.getElementById("state-svg").setAttribute("src", `states/${data.places[0]["state abbreviation"]}.svg`);

                    // Google Maps to link
                    document.getElementById("map-url").setAttribute("href", MAPS_URL);

                    // Show locations details
                    document.getElementById("location-details").style.display = "block";

                } else {
                    showError("An error has occurred!");
                }
            })
            .catch(e => console.log(e));
    } else {
        showError("Please enter a valid zip code");
    }
}

function showError(errorMsg) {
    hideContent();

    const errorMsgElem = document.getElementById("error-msg");
    errorMsgElem.style.display = "block";
    errorMsgElem.innerHTML = errorMsg;
}

function buttonLoadingState() {
    const submitBtn = document.getElementById("submit-btn")

    if ( state ) {
        submitBtn.innerHTML = "Loading...";
        submitBtn.setAttribute("disabled", "disabled");
    } else {
        submitBtn.innerHTML = "Get locations details...";
        submitBtn.removeAttribute("disabled");
    }
}

function hideContent() {
    document.getElementById("location-details").style.display = "none";
    document.getElementById("error-msg").style.display = "none";
}