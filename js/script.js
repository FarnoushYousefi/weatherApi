var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');

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
    '& appid=08dff11d3547ffd95ff0b6c1c1070466';
  console.log(apiUrl);
  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          //   displayRepos(data, user);
        });
      } else {
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert('Unable to connect to GitHub');
    });
};

var formSubmitHandler = function (event) {
  event.preventDefault();

  // get value from input element
  var username = inputValue.value.trim();
  console.log(username);
  if (username) {
    getUserRepos(username);
    nameInputEl.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
  console.log(event);
};
button.addEventListener('submit', formSubmitHandler);
