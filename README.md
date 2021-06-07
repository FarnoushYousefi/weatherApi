# weatherApi
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
---------------------------------------------------------------------------------
add a new click listener to each previous search button and don't run the error alert when the user clicks one of these buttons. Note: 'getUserRepos' should really be renamed and if it was pulled from another source, it should be refactored so that it cleanly fits with this application. Users aren't searching for repositories so the app shouldn't throw an error with this message

- render each previous search as a button immediately after the user searches for that city. Don't wait until page load before rendering these buttons. Check out this resource for adding a click listener to a dynamically-created element: 
https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript

- in the current weather content area, render the humidity, wind speed, and dynamically-styled uv index data

- in each five day forecast card, render the humidity and wind speed data for each specific day. 

I recommend labeling the various data. Instead of simply '86 F' for the temperature, render 'Temperature: 86 ˚F'
### deploy link
 https://farnoushyousefi.github.io/weatherApi/

 ## Git Hub link
 https://github.com/FarnoushYousefi/weatherApi