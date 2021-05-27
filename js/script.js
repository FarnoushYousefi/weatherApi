var button = document.querySelector('.buttonSubmit');
var inputValue = document.querySelector('.inputvalue');
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var userFormEl = document.querySelector('#formSubmit');

// button.addEventListener('click', function () {
//   fetch(
//     'https://api.openweathermap.org/data/2.5/forecast?q=' +
//       inputValue.value +
//       '& appid=08dff11d3547ffd95ff0b6c1c1070466'
//   )
//     .then((response) => response.json())
//     .then((data) => console.log(data))

//     .catch((err) => alert('wrong city name'));
// });

var getUserRepos = function (user) {
  // format the github api url
  var apiUrl =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    inputValue.value +
    '&appid=08dff11d3547ffd95ff0b6c1c1070466';
  console.log(apiUrl);
  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          var nameValue = data['name'];
          var temp = data['main']['temp'];
          var descValue = data['weather'][0]['description'];
          name.innerHTMl = nameValue;
          temp.innerHTMl = tempValue;
          desc.innerHTML = descValue;
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert('Erong city name');
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
  console.log(event);
};
userFormEl.addEventListener('submit', formSubmitHandler);
