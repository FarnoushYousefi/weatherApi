var button = document.querySelector('.buttonSubmit');
var inputValue = document.querySelector('.inputvalue');
var nameEl = document.querySelector('.name');
var descEl = document.querySelector('.desc');
var tempEl = document.querySelector('.temp');
var forcastEl = document.querySelector('.forcast');
var userFormEl = document.querySelector('#formSubmit');
var task = [];
if (localStorage.getItem('cities')) {
  task = JSON.parse(localStorage.getItem('cities'));
  for (var i = 0; i < task.length; i++) {
    $('#weatherButton').append(
      '<button class="btn btn-info btn-lg mt-2 mb-2 w-100 p-2" onClick="searchWeather(event)"> ' +
        task[i] +
        '</button>'
    );
  }
}
function searchWeather(event) {
  event.stopPropagation();
  var cityText = event.target.innerHTML;
  var apiUrl =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    cityText +
    '&appid=08dff11d3547ffd95ff0b6c1c1070466&units=imperial';
  console.log(apiUrl);
  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          //   console.log(data);

          display(data);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert('Erong city name');
    });
}

var getUserRepos = function (user) {
  // format the github api url
  var apiUrl =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    inputValue.value +
    '&appid=08dff11d3547ffd95ff0b6c1c1070466&units=imperial';
  console.log(apiUrl);
  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          //   console.log(data);

          display(data);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert('Wrong city name');
    });
};

var formSubmitHandler = function (event) {
  event.preventDefault();

  // get value from input element
  var username = inputValue.value.trim();
  console.log(username);
  if (username) {
    getUserRepos(username);
    username.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
};

var display = function (res) {
  console.log(res);
  $('.display').html('');
  $('.forcast').html('');
  $('.display').append(`<div id=firstDisplay></div>`);
  var nameValue = res.city.name;
  var tempValue = res.list[0].main.temp;
  var descValue = res.list[0].weather[0].description;
  var dateValue = res.list[0].dt_txt;
  var icon = res.list[0].weather[0].icon;
  $('#firstDisplay').append(`<p id=cityName>${nameValue}</p>`);
  $('#firstDisplay').append(`<p id=tempValue>${tempValue} F</p>`);
  $('#firstDisplay').append(`<p id=descValue>${descValue}</p>`);
  $('#firstDisplay').append(`<p id=dateValue>${dateValue}</p>`);
  $('#firstDisplay').append(
    `<img src="http://openweathermap.org/img/wn/${icon}.png"></img>`
  );
  $('<div>').addClass('container');
  for (var i = 0, j = 0; i < 5; i++) {
    $('.forcast').append(`<div class=col id=day` + i + `></div>`);

    $('#day' + i).append(`<p id=forcastDate` + i + `></p>`);

    // var dateValue = res.list[0].dt_text;
    $('#forcastDate' + i).text(res.list[j].dt_txt);
    $('#day' + i).append('<p id=forcastTemp' + i + '></p>');
    $('#forcastTemp' + i).text(res.list[j].main.temp + 'F');
    $('#day' + i).append(
      `<img src="http://openweathermap.org/img/wn/${res.list[j].weather[0].icon}.png"></img>`
    );
    j = j + 8;
  }
  if (task.indexOf(nameValue) == -1) {
    task.push(nameValue);
  }

  localStorage.setItem('cities', JSON.stringify(task));
};

userFormEl.addEventListener('submit', formSubmitHandler);
