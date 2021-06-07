var button = document.querySelector('.buttonSubmit');
var inputValue = document.querySelector('.inputvalue');
var nameEl = document.querySelector('.name');
var descEl = document.querySelector('.desc');
var tempEl = document.querySelector('.temp');
var forcastEl = document.querySelector('.forcast');
var userFormEl = document.querySelector('#formSubmit');

var task = JSON.parse(localStorage.getItem('cities'));
console.log(task);

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
function renderHistory() {
  $('#weatherButton').empty();
  if (localStorage.getItem('cities')) {
    task = JSON.parse(localStorage.getItem('cities'));
    for (var i = 0; i < task.length; i++) {
      $('#weatherButton').append(
        '<button class="btn btn-info btn-lg mt-2 mb-2 w-100 p-2 search"> ' +
          task[i] +
          '</button>'
      );
    }
    $('.search').click(function () {
      searchWeather($(this).text());
    });
  }
}

function searchWeather(cityText) {
  var newObj = {};
  console.log(newObj);
  var apiUrl =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    cityText +
    '&appid=08dff11d3547ffd95ff0b6c1c1070466&units=imperial';
  console.log(apiUrl);
  // make a get request to url
  fetch(apiUrl).then(function (response) {
    // console.log(response);
    // request was successful
    if (response.ok) {
      response
        .json()
        .then(function (data) {
          console.log(data);
          // newObj.cityName = data.city.name;
          newObj.cityName = data.city.name;
          newObj.temperature = data.list[0].main.temp;
          newObj.description = data.list[0].weather[0].description;
          newObj.date = data.list[0].dt_txt;
          newObj.icon = data.list[0].weather[0].icon;
          newObj.humidity = data.list[0].main.humidity;
          newObj.speed = data.list[0].wind.speed;

          var lat = data.city.coord.lat;
          var lon = data.city.coord.lon;
          console.log('lat', lat);
          console.log('lon', lon);
          // display(newObj);
          return fetch(
            'https://api.openweathermap.org/data/2.5/onecall?lat=' +
              lat +
              '&lon=' +
              lon +
              '&appid=08dff11d3547ffd95ff0b6c1c1070466&timezone_offset=1'
          );
          // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          if (data.length === 0) {
            console.log('there is no data');
          } else {
            var uv = data.current.uvi;
            newObj.fiveday = data.daily;
            newObj.uv = uv;
            display(newObj);
          }
        });
    } else {
      alert(response.statusText);
    }
  });
  //     .catch(function (error) {
  //       // Notice this `.catch()` getting chained onto the end of the `.then()` method
  //       alert('wrong city name');
  //     });
}

var formSubmitHandler = function (event) {
  event.preventDefault();

  // get value from input element

  var username = inputValue.value.trim();
  console.log(username);
  if (username) {
    searchWeather(username);
    username.value = '';
  } else {
    alert('Please enter a correct City');
  }
};

var display = function (res) {
  console.log(res);
  $('.display').html('');
  $('.localstorage').empty();
  $('#weatherButton').empty();
  $('.forcast').html('');
  $('.display').append(`<div id=firstDisplay></div>`);
  var nameValue = res.cityName;
  var tempValue = res.temperature;
  var descValue = res.description;
  console.log(res.fiveday[0].dt);
  var dateValue = res.fiveday[0].dt * 1000;
  var dateObj = new Date(dateValue);
  var finalDate = dateObj.toLocaleString();

  var icon = res.icon;
  var humindtity = res.humidity;
  var uv = res.uv;
  var speed = res.speed;
  $('.display').append(`<p id =uv>${uv}</p>`);
  $('#firstDisplay').append(`<p id=cityName>${nameValue}</p>`);
  $('#firstDisplay').append(
    `<p id=tempValue>Temperature: '${tempValue} ˚F</p>`
  );
  $('#firstDisplay').append(`<p id=descValue>${descValue}</p>`);
  $('#firstDisplay').append(`<p id=dateValue>${finalDate}</p>`);
  $('#firstDisplay').append(
    `<img src="http://openweathermap.org/img/wn/${icon}.png"></img>`
  );
  $('#firstDisplay').append(`<p id=dateValue>${humindtity} Humidity</p>`);
  $('#firstDisplay').append(`<p id=dateValue>${speed} Speed</p>`);
  $('<div>').addClass('container');
  for (var i = 0; i < 5; i++) {
    var dateValue = res.fiveday[i].dt * 1000;
    var dateObj = new Date(dateValue);
    var finalDate = dateObj.toLocaleString();
    $('.forcast').append(`<div class=col id=day` + i + `></div>`);

    $('#day' + i).append(`<p id=forcastDate` + i + `></p>`);

    // var dateValue = res.list[0].dt_text;
    $('#forcastDate' + i).text(finalDate);
    $('#day' + i).append('<p id=forcastTemp' + i + '></p>');
    $('#forcastTemp' + i).text('Temperature:' + res.fiveday[i].temp.day + '˚F');
    $('#day' + i).append(
      `<img id='icon' src="http://openweathermap.org/img/wn/${res.fiveday[i].weather[0].icon}.png"></img>`
    );
    $('#day' + i).append(
      ` <p id=dateValue> humindtity${res.fiveday[i].humidity} % </p>`
    );
    $('#day' + i).append(
      ` <p id=dateValue>speed${res.fiveday[i].weather[0].wind_speed} miles/hour</p>`
    );
  }

  if (!task) {
    localStorage.setItem('cities', JSON.stringify([nameValue]));
    console.log(task);
  } else {
    console.log(task.indexOf(nameValue));
    if (task.indexOf(nameValue) == -1) {
      console.log(task);
      task.push(nameValue);

      localStorage.setItem('cities', JSON.stringify(task));
    }
  }

  renderHistory();
};

userFormEl.addEventListener('submit', formSubmitHandler);
// userFormEl.on('submit', '.buttonSubmit', formSubmitHandler);
//page the load
renderHistory();
