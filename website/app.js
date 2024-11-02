/* Global Variables */
const apiKey = "db7719bf98220e1ea879ff8deb468f2a&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

document.getElementById("generate").addEventListener("click", preformAction);

function preformAction() {
  console.log("CLICKED");
  getCoordinatesByZipCode().then(function (coordinates) {
    getDataByCoordinates(coordinates).then(function (data) {
      postData("/add", data).then(function () {
        retrieveDataAndUpdateUI();
      });
    });
  });
}

const getCoordinatesByZipCode = async () => {
  const zipcode = document.getElementById("zip").value;
  console.log("ZIP: " + zipcode);
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=${apiKey}`
  );

  try {
    const coordinates = await response.json();
    console.log(coordinates);
    document.getElementById('city').textContent = coordinates.name;
    return coordinates;
  } catch (error) {
    console.log(error);
  }
};

const getDataByCoordinates = async (coordinates) => {
  console.log("LAT: " + coordinates.lat);
  console.log("LON: " + coordinates.lon);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`
  );

  try {
    const weatherInfo = await response.json();
    console.log(weatherInfo);
    console.log(weatherInfo.main);
    const content = document.getElementById("feelings").value;
    const temp = weatherInfo.main.temp;
    document.getElementById('weather-degree').textContent = `${temp}°`

    const weartherIcon = document.getElementById('weather-icon');
    console.log(weartherIcon);
    weartherIcon.classList = [];
    weartherIcon.classList.add('fa-solid') 
    if(+temp > 25){
      weartherIcon.classList.add('fa-sun')
    }
    else if(+temp > 16 && +temp <= 25){
      weartherIcon.classList.add('fa-cloud')
    }
    else if(+temp <= 16){
      weartherIcon.classList.add('fa-cloud-rain')
    }


    return { temp: temp, date: newDate, content: content };
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url, data) => {
  console.log("POSTED DATA: " + data);
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    console.log("HERE");
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const retrieveDataAndUpdateUI = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML ='Temperature: ' +
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = 'Feeling: ' + allData.content;
    document.getElementById("date").innerHTML = 'Date: ' + allData.date;
  } catch (error) {
    console.log("error", error);
  }
};
