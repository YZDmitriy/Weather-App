const wrapper = document.querySelector('.wrapper');
inputPart = document.querySelector('.input-part');
infoText = document.querySelector('.info-text');
inputField = document.querySelector('input');
searchBtn = document.querySelector('.search');
locationBtn = document.querySelector('.location');
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");

const apiKey = 'e1c339c24c4992ae5ac3b7601573ab9b';

inputField.addEventListener('keyup', (e) => {
  //Если пользователь нажал кнопку, а входное значение не пусто
  if (e.key === 'Enter' && inputField.value !== '') {
    requestApi(inputField.value);
  }
});

searchBtn.addEventListener('click', () => {
  if (inputField.value !== '') {
    requestApi(inputField.value);
  }
});

function requestApi(city) {
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  infoText.innerText = 'Getting weather details...';
  infoText.classList.add('pending');

  fetch(apiCity)
    .then((response) => response.json())
    .then((response) => weatherDetails(response));
}


locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert('Your brouser not support geolocation api');
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  // let apiLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  let apiLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  infoText.innerText = 'Getting weather details...';
  infoText.classList.add('pending');

  fetch(apiLocation)
    .then((response) => response.json())
    .then((response) => weatherDetails(response));

}

function onError(error) {
  infoText.innerText = error.message;
  infoText.classList.add('error');
}


function weatherDetails(info){
  if(info.cod === "404"){ // if user entered city name isn't valid
      infoText.classList.replace("pending", "error");
      infoText.innerText = `${inputField.value} isn't a valid city name`;
  }else{
      //getting required properties value from the whole weather information
      const city = info.name;
      const country = info.sys.country;
      const {description, id} = info.weather[0];
      const {temp, feels_like, humidity} = info.main;

      // using custom weather icon according to the id which api gives to us
      if(id === 800){
          wIcon.src = "/Weather Icons/clear.svg";
      }else if(id >= 200 && id <= 232){
          wIcon.src = "/Weather Icons/storm.svg";  
      }else if(id >= 600 && id <= 622){
          wIcon.src = "/Weather Icons/snow.svg";
      }else if(id >= 701 && id <= 781){
          wIcon.src = "/Weather Icons/haze.svg";
      }else if(id >= 801 && id <= 804){
          wIcon.src = "/Weather Icons/cloud.svg";
      }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
          wIcon.src = "/Weather Icons/rain.svg";
      }
      
      //passing a particular weather info to a particular element
      weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
      weatherPart.querySelector(".weather").innerText = description;
      weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
      weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
      weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
      infoText.classList.remove("pending", "error");
      // infoText.innerText = "";
      // inputField.value = "";
      wrapper.classList.add("active");
      console.log(info)
  }
}
