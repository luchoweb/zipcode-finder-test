/**
 * Get location details
 * @param {string} zipCode
 */
function getLocationDetails(zipCode) {

    buttonLoadingState(true);
    hideContent();

    if ( zipCode !== "" && parseInt(zipCode) > 210 && parseInt(zipCode) < 99950) {
        const URL_API = `https://api.zippopotam.us/us/${zipCode}`;

        fetch(URL_API)
            .then(response => response.json())
            .then(data => {
                if ( data?.places ) {
                    // Google Maps URL
                    const MAPS_URL = `https://www.google.com/maps/@${data.places[0].latitude},${data.places[0].longitude},13z`;

                    // Location name
                    document.getElementById("location-name").innerHTML = `
                        ${data.places[0]["place name"]}
                        <span>${data.places[0]["state abbreviation"]}</span>
                    `;

                    // State name
                    document.getElementById("state-name").innerHTML = data.places[0]["state"];

                    // State SVG
                    document.getElementById("state-svg").setAttribute("src", `states/${data.places[0]["state abbreviation"]}.svg`);

                    // Google Maps to link
                    document.getElementById("map-url").setAttribute("href", MAPS_URL);

                    // Show locations details
                    document.getElementById("location-details").style.display = "block";

                } else {
                    // Show error
                    showError("An error has occurred!");
                }

                buttonLoadingState(false);
            })
            .catch(e => console.log(e));
    } else {
        showError("Please enter a valid zip code.");
        buttonLoadingState(false);
    }
}

/**
 * Show error message
 * @param {string} errorMsg 
 */
function showError(errorMsg) {
    hideContent();

    const errorMsgElem = document.getElementById("error-msg");
    errorMsgElem.style.display = "block";
    errorMsgElem.innerHTML = errorMsg;
}

/**
 * Change button state
 * @param {boolean} state 
 */
function buttonLoadingState(state) {
    const submitBtn = document.getElementById("submit-btn");

    if ( state ) {
        submitBtn.innerHTML = "Loading...";
        submitBtn.setAttribute("disabled", "disabled");
    } else {
        submitBtn.innerHTML = "Get details";
        submitBtn.removeAttribute("disabled");
    }
}

/**
 * Hide errors o previous location details
 */
function hideContent() {
    document.getElementById("location-details").style.display = "none";
    document.getElementById("error-msg").style.display = "none";
}