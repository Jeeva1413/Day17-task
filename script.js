function element(tag, classname, id, text) {
    let tags = document.createElement(tag);
    tags.classList = classname;
    tags.id = id;
    tags.innerHTML = text;
    return tags;
  }
  
  //creating elements
  const div1 = element("div", "container", "container1", "");
  const h1 = element("h1", "text-center", "title", "Countries Weather");
  const row1 = element("div", "row", "row1", "");
  let lat = [],
    lang = [];
  
  //fetching rest countries data
  const countries = fetch("https://restcountries.com/v3.1/all");
  countries
    .then((data) => data.json())
    .then((ele) => {
      for (let i = 0; i < ele.length; i++) {
        const col = document.createElement("div");
        col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4 text-center mb-5 ";
        col.innerHTML = `
        <div class="card h-100">
        <div class="card-header ">
        <h5 class="card-title"> ${ele[i].name.common}</h5>
        </div>
        <div class="img-box">
        <img src="${ele[i].flags.png}" class="card-img-top" alt="Country Flag image">
        </div>
        <div class="card-body">
        <div class="card-text text-center">Region:${ele[i].region}</div>
        <div class="card-text text-center">Capital:${ele[i].capital}</div>
        <div class="card-text text-center">Country Code:${ele[i].fifa}</div>
        <button class="btn ">Click for Weather</button>
        </div>
        </div>
        `;
        row1.append(col);
      }
      //button logic
      let buttons = document.querySelectorAll("button");
      //console.log(buttons);
      buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          //getting lat and long
          let latlng = ele[index].latlng;
          //console.log(latlng);
          let lat = latlng[0];
          let lon = latlng[1];
          //console.log(lat, lon);
          //api for weather
  
          let weatherapi = fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7cb3610c7aa22bc63bea59615dafc859`
          );
          weatherapi
            .then((data1) => data1.json())
            .then((res) => {
             // console.log(res);
              alert(
                `Weather of ${ele[index].name.common} is ${Math.floor( res.main.temp )}🌡️F , 
   Cloud is ${res.weather[0].description}`
              );
            });
        });
      });
    });
  
  // Appending part
  div1.append(h1, row1);
  document.body.append(div1);