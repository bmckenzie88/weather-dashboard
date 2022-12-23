const APIKEY = "204bd286eabd1f59f4f067afe811e72f";

const todayCard = document.getElementById("today");
const tomorrowCard = document.getElementById("tomorrow");
const day3Card = document.getElementById("day3");
const day4Card = document.getElementById("day4");
const day5Card = document.getElementById("day5");

const dayCards = [todayCard, tomorrowCard, day3Card, day4Card, day5Card];
const dayImages = [todayImage,tomorrowImage,day3Image,day4Image,day5Image]
let searches = [];


const search = document.getElementById("search-addon");

search.addEventListener("click", function search(e) {
  e.preventDefault();

  const city = document.getElementById("searchBar").value;
  checkTheWeather(city);
});


async function checkTheWeather(city) {
  const apiURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKEY +
    "&units=imperial";
  try {
    const data = await fetch(apiURL);

    const refinedData = await data.json();

    function getImage(day) {
        switch (day.weather[0].main) {
            case 'Clouds':
                if (day.weather[0].description == 'overcast clouds') {
                    return 'https://www.photos-public-domain.com/wp-content/uploads/2012/04/fluffy-white-clouds.jpg'
                } else { return 'https://filipinotimes.net/wp-content/uploads/2017/05/IMG_4867.jpg' }
            case 'Rain':
                return 'https://jooinn.com/images/raining-12.jpg'
            case 'Clear':
                return 'https://wallpapercave.com/wp/wp3736920.jpg'
            case 'Thunderstorm':
                return 'https://www.severe-weather.eu/wp-content/gallery/weather-photos/04072017_Adria_Lightning_8b.jpg'
            case 'Snow':
                return 'https://media.giphy.com/media/KFUx0Rtz7p0HTzbJ7x/giphy.gif'
            case 'Drizzle':
                return 'https://jooinn.com/images/raining-12.jpg'
            default:
                return 'https://placekitten.com'
        }
    }

    console.log(refinedData);
    //set days
    const today = refinedData.list[0];
    const tomorrow = refinedData.list[8];
    const day3 = refinedData.list[16];
    const day4 = refinedData.list[24];
    const day5 = refinedData.list[32];

    const days = [today, tomorrow, day3, day4, day5];
    console.log(today);

    document.getElementById("day3Date").innerHTML = moment
      .utc(days[2].dt_txt + "+08:00")
      .format("dddd");
    document.getElementById("day4Date").innerHTML = moment
      .utc(days[3].dt_txt + "+08:00")
      .format("dddd");
    document.getElementById("day5Date").innerHTML = moment
      .utc(days[4].dt_txt + "+08:00")
      .format("dddd");

    for (let i = 0; i < days.length; i++) {
      const conditions = days[i].weather[0].description;
      const temp = days[i].main.temp;
      const humidity = days[i].main.humidity;
      const wind = days[i].wind.speed;
      const image = getImage(days[i])
      dayImages[i].setAttribute('src', getImage(days[i]))

      console.log(conditions, temp, wind, humidity);
      dayCards[i].innerHTML =
        "Condition: " +
        conditions +
        "<br>" +
        "Temp: " +
        Math.floor(temp) +
        "°F" +
        "<br>" +
        "Humidity: " +
        humidity +
        "%" +
        "<br>" +
        "Wind: " +
        Math.floor(wind) +
        "mph";
    }

    recents = JSON.parse(localStorage.getItem("searches"));

    if (recents) {
      searches = recents;
    }
    if (!searches.includes(city)) {
      searches.push(city);
    }
    console.log(searches);

    var child = recentsList.lastElementChild;
    while (child) {
      recentsList.removeChild(child);
      child = recentsList.lastElementChild;
    }

    for (let i = 0; i < searches.length; i++) {
      const listItem = document.createElement("li");
      listItem.textContent = searches[i];
      listItem.setAttribute("class", "dropdown-item");
      recentsList.appendChild(listItem);
    }
    localStorage.setItem("searches", JSON.stringify(searches));
    document.querySelectorAll('.dropdown-item').forEach(function (dropdown) {
        dropdown.addEventListener('click', function () {
            checkTheWeather(dropdown.textContent)
        });
    });
  } catch (error) {
    console.log(error);
  }
}
checkTheWeather("spokane");
