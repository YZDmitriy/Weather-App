const wrapper = document.querySelector('.wrapper');
inputPart = document.querySelector('.input-part');
infoText = document.querySelector('.info-text');
inputField = document.querySelector('input');
searchBtn = document.querySelector('.search');
locationBtn = document.querySelector('.location');

const apyKey = 'e1c339c24c4992ae5ac3b7601573ab9b';

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
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apyKey}`;
  infoText.innerText = 'Getting weather details...';
  infoText.classList.add('pending');

  fetch(api)
    .then((response) => response.json())
    .then((response) => weatherDetails(response));
}

function weatherDetails(info) {
  console.log(info);
}

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert('Your brouser not support geolocation api');
  }
});


function onSuccess(position) {
  console.log(position)
}

function onError(error) {
  console.log(error)
}
