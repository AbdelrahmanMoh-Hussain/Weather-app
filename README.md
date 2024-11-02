# Weather-app

This project is a responsive, asynchronous web application that allows users to record and view journal entries based on weather data from the OpenWeather API. Built as part of Udacity’s Front-End Nanodegree, this project demonstrates skills in working with APIs, asynchronous JavaScript, and user interface (UI) updates in real-time. 

### Features

- **Real-Time Weather Data**: Users can enter a zip code to retrieve the current temperature for a specific location (limited to larger countries with OpenWeather support).
- **User Journal Entries**: Users can add personal notes about how they feel in the current weather, creating a mini journal entry.
- **Dynamic UI Updates**: The app’s UI updates dynamically with each new entry, showing the latest weather data and journal entry without needing a page reload.
- **API Integration**: Utilizes the OpenWeather API to fetch weather data, including temperature and location information based on the zip code.
  
### Technology Stack

- **Node.js** and **Express.js**: The backend server is built with Node.js and Express to handle routes and API requests.
- **CORS** and **HTTP Requests**: Enables cross-origin resource sharing and secure HTTP requests to external APIs.
- **Promises and Fetch API**: Implements promises for handling asynchronous API calls and data processing.
- **JavaScript ES6**: Uses modern JavaScript features like arrow functions, async/await, and template literals.
- **HTML, CSS, JavaScript**: For building a responsive and user-friendly frontend interface.

### Project Structure

- **Frontend**: Contains the HTML, CSS, and client-side JavaScript for the UI.
- **Backend**: Node.js server with Express handles API requests and routing.
- **OpenWeather API Integration**: Uses OpenWeather’s Geocoding API to fetch location coordinates based on zip code and the Weather API to retrieve current weather details.

### How It Works

1. **Get Location Data**: The user enters a zip code. The app sends a request to OpenWeather’s Geocoding API to get the latitude and longitude of the location.
2. **Fetch Weather Info**: With the location coordinates, the app makes a second API call to retrieve the current weather for that location.
3. **User Input & Journal Entry**: The user can also enter how they feel about the current weather, which will be saved along with the temperature and date.
4. **Display Data**: The UI is updated dynamically to display the latest weather data and journal entry.

### Prerequisites

- Node.js and npm (Node Package Manager) must be installed.
- API key for OpenWeather. You can get one by signing up on [OpenWeather](https://openweathermap.org/).

### Snap-shot
![Screenshot 2024-11-02 132551](https://github.com/user-attachments/assets/270a2091-59c6-46fd-a3d1-83928f410533)
