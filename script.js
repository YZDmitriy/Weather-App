const wrapper = document.querySelector('.wrapper');
inputPart = document.querySelector('.input-part');
infoText = document.querySelector('.info-text');
inputField = document.querySelector('input');
searchBtn = document.querySelector('.search');


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
  fetch(api)
    .then((response) => response.json())
    .then((response) => weatherDetails(response));
}


function weatherDetails(info) {
  console.log(info)
}
