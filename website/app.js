/* Global Variables */
const apiKey = "db7719bf98220e1ea879ff8deb468f2a&units=imperial";

// Create a new date instance dynamically with JS
var months = ["Jan", "Feb", "Mar", "Aprl", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov", "Dec"];
let d = new Date();
let newDate = months[d.getMonth()] + " / " + d.getDate() + " / " + d.getFullYear();

document.getElementById("generate").addEventListener("click", preformAction);

function preformAction() {
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
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=${apiKey}`
  );

  try {
    const coordinates = await response.json();
    document.getElementById('city').textContent = coordinates.name;
    return coordinates;
  } catch (error) {
    console.log(error);
  }
};

const getDataByCoordinates = async (coordinates) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`
  );

  try {
    const weatherInfo = await response.json();

    const content = document.getElementById("feelings").value;
    const temp = weatherInfo.main.temp;
    document.getElementById('weather-degree').textContent = `${temp}°`

    const weartherIcon = document.getElementById('weather-icon');
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
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const result = await response.json();
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
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML ='Temperature: ' +
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = 'Feeling: ' + allData.content;
    document.getElementById("date").innerHTML = 'Date: ' + allData.date;
  } catch (error) {
    console.log("error", error);
  }
};
