const rest_countries=fetch("https://restcountries.com/v3.1/all")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    country(data);
  })
  .catch(function (err) {
    console.error(err);
  });

function country(data) {
  for (i = 0; i < data.length; i++) {
    elementsCreating(data[i]);
  }
}

let container = document.createElement("div");
container.classList.add("container");
container.id = "container1";
let heading = document.createElement("h1");
heading.classList.add("text-center","m-4");
heading.innerText = "Countries weather";
let row = document.createElement("div");
row.classList.add("row");
container.append(heading,row);
document.body.append(container);

function elementsCreating(data) {

  let col = document.createElement("div");
  col.classList.add("col-sm-6", "col-md-4", "col-lg-4", "col-xl-4" ,"text-center", "mb-5");
  
  let card = document.createElement("div");
  card.classList.add( "card", "h-80");
  
  let header = document.createElement("div");
  header.classList.add("card-header");
  header.innerText = data.name.common;
  
  let img = document.createElement("img");
  img.classList.add("img-fluid");
  
  let body = document.createElement("div");
  body.classList.add("card-body", "bodyList");
  img.setAttribute("src", data.flags.png);

  let capital = document.createElement("p");
  capital.innerText = "Capital : " + data.capital;

  let code = document.createElement("p");
  code.innerText = "Coutry Code : " + data.fifa;

  let region = document.createElement("p");
  region.innerText = "Region : " + data.region;
 

  let button = document.createElement("button");
  button.classList.add("btn", "mt-3", "mb-1");
  button.innerText = "Click for Weather";

  button.addEventListener("click", function () {
    getWeather(data, card, header, body, img);
  });

  body.append(capital, code, region, button);
  card.append(header, img, body);
  col.append(card);
  row.append(col);
  
}

function getWeather(countryData, card, header, body, image) {
  let key = "c0702cbb2cd9d3d270bcc1d765a18f2f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${countryData.capital}&appid=${key}`;
     console.log(url);
  fetch(url)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      showWeather(data, card, header, body, image);
    })
    .catch((err) => {
      console.error(err);
    });
}

function showWeather(data, card, header, body, image) {
  card.removeChild(body);
  card.removeChild(header);
  card.removeChild(image);
  let newHeader = document.createElement("div");
  newHeader.classList.add("card-header", "headerList");
  newHeader.innerText = "Weather Details";
  let newBody = document.createElement("div");
  newBody.classList.add("card-body", "bodyList");
  let img = document.createElement("img");
  let url = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  img.setAttribute("src", url);
  let status = document.createElement("p");
  status.innerText = `Status : ${data.weather[0].main}(${data.weather[0].description})`;
  let temp = document.createElement("p");
  temp.innerText = `Temperature : ${(data.main.temp - 273.15).toFixed(2)}\xB0c`;
  let humidity = document.createElement("p");
  humidity.innerText = `Humidity : ${data.main.humidity}%`;
  let pressure = document.createElement("p");
  pressure.innerText = `Pressure : ${data.main.pressure} mBar`;
  let button = document.createElement("button");
  button.classList.add("btn-primary", "mt-2");
  button.innerText = "Go Back";
  button.addEventListener("click", function () {
    card.removeChild(newBody), card.removeChild(newHeader);
    card.append(header, image, body);
  });
  newBody.append(img, status, temp, humidity, pressure, button);
  card.append(newHeader, image, newBody);
}