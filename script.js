const wrapper = document.querySelector('.wrapper')
inputPart = document.querySelector('.input-part')
infoText = document.querySelector('.info-text')
inputField = document.querySelector('input')
searchBtn = document.querySelector('.search')

console.log(searchBtn)

inputField.addEventListener('keyup', e => {
  //Если пользователь нажал кнопку, а входное значение не пусто
  if(e.key === 'Enter'  && inputField.value !== '') {
    console.log('first')
  }
})

