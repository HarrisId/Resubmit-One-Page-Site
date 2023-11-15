function reveal() {
  // Select all elements with the class "reveal"
  var reveals = document.querySelectorAll(".reveal");

  // Get the height of the window
  var windowHeight = window.innerHeight;

  // Iterate over each element with the class "reveal"
  reveals.forEach(function (element) {
    // Get the distance from the top of the element to the top of the viewport
    var elementTop = element.getBoundingClientRect().top;

    // Set the threshold for an element to be considered visible
    var elementVisible = 150;

    // Toggle the "active" class based on visibility
    element.classList.toggle(
      "active",
      elementTop < windowHeight - elementVisible
    );
  });
}
// Add a scroll event listener to trigger the 'reveal' function during scrolling
window.addEventListener("scroll", reveal);

// Call the 'reveal' function to check the scroll position on page load
reveal();

// Function to handle the click event for getting the user's current location
function handleLocationClick() {
  // Check if geolocation is supported by the browser
  if (navigator.geolocation) {
    // Call the geolocation API to get the current position
    navigator.geolocation.getCurrentPosition(success);
  } else {
    // Log a message if geolocation is not supported
    console.log("Geolocation not supported");
  }
}

// Function to handle the success callback of the geolocation API
function success(position) {
  // Get the latitude and longitude from the position object
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Log the latitude and longitude to the console
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

  // Make an API call to OpenWeatherMap using the retrieved coordinates
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c575fb12d915b7e85309eb09abff0f93&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // Log the weather data to the console
      console.log(data);

      // Check if data is available
      if (data) {
        // Display the weather card and update its content

        // Show the weather card
        document.getElementById("weather-card").style.display = "block";

        // Update city name
        document.getElementById("weather-name").innerHTML = data.name;

        // Update current date on the weather card
        document.getElementById("weather-date").innerHTML =
          new Date().toDateString();

        // Update temperature on the weather card
        document.getElementById("weather-temp").innerHTML =
          Math.floor(data.main.temp).toString() + "° C";

        // Update humidity on the weather card
        document.getElementById("weather-humidity").innerHTML =
          data.main.humidity.toString() + " %";

        // Update wind speed on the weather card
        document.getElementById("weather-wind").innerHTML =
          Math.floor(data.wind.speed).toString() + " Km/h";
      }

      // Image references from https://openweathermap.org/weather-conditions
    })
    .catch((error) => console.log("Cannot get weather at your location"));
}
