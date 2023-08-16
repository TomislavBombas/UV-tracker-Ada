const lat = "44.804";
const lon = "20.465";
const apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const wheatherApiUrl =
  "https://api.openweathermap.org/data/3.0/onecall?units=metric&lat=" +
  lat +
  "&lon=" +
  lon +
  "&appid=" +
  apiKey;
const maxUVI = 13;
let measureInterval,
  contentIndex = 0;

const icons = [
  {
    name: "Clear",
    description: "clear sky",
    opis: "Sunčano",
    icon: "f00d",
  },
  {
    name: "Clouds",
    description: "few clouds",
    opis: "Pomalo oblačno",
    icon: "f00c",
  },
  {
    name: "Clouds",
    description: "scattered clouds",
    opis: "Delimično oblačno",
    icon: "f002",
  },
  {
    name: "Clouds",
    description: "broken clouds",
    opis: "Oblačno",
    icon: "f041",
  },
  {
    name: "Clouds",
    description: "overcast clouds",
    opis: "Veoma oblačno",
    icon: "f041",
  },
  {
    name: "Rain",
    description: "light rain",
    opis: "Lagana kiša",
    icon: "f01b",
  },
  {
    name: "Rain",
    description: "moderate rain",
    opis: "Umerena kiša",
    icon: "f01a",
  },
  {
    name: "Rain",
    description: "heavy intensity rain",
    opis: "Jaka kiša",
    icon: "f019",
  },
  {
    name: "Rain",
    description: "very heavy rain",
    opis: "Veoma jaka kiša",
    icon: "f01c",
  },
  {
    name: "Rain",
    description: "extreme rain",
    opis: "Ekstremni pljuskovi",
    icon: "f01e",
  },
  {
    name: "Rain",
    description: "freezing rain",
    opis: "Hladna kiša",
    icon: "f09",
  },
  {
    name: "Rain",
    description: "light intensity shower rain",
    opis: "Blagi pljuskovi",
    icon: "f017",
  },
  {
    name: "Rain",
    description: "shower rain",
    opis: "Pljuskovi",
    icon: "f017",
  },
  {
    name: "Rain",
    description: "heavy intensity shower rain",
    opis: "Veoma kišovito",
    icon: "f017",
  },
  {
    name: "Rain",
    description: "ragged shower rain",
    opis: "Jaka kiša",
    icon: "f017",
  },
  {
    name: "Mist",
    description: "mist",
    opis: "Maglovito",
    icon: "f021",
  },
  {
    name: "Fog",
    description: "fog",
    opis: "Magla",
    icon: "f021",
  },
];

let weatherIconUrl,
  prevUVI = 0;

let setUVI = (index) => {
  let mathIndex = Math.round(index);
  if (index > 11) mathIndex = "11";
  setBackgroundColor(mathIndex);
};

let setTemperature2 = (temp) => {
  document.getElementById("temp-value").innerHTML = temp;
};

let addStyleDefs = (style) => {
  document.getElementById("custom-css").innerHTML = style;
};

let setWeather = (weather) => {
  let name = weather.main;
  let desc = weather.description;
  let iconDef = null;
  let opisDef = "";
  Object.values(icons).forEach((item) => {
    if (item.name == name) {
      if (item.description == desc) {
        console.log("set weather", item);
        iconDef = item.icon;
        opisDef = item.opis;
      }
    }
  });
  if (iconDef != null) {
    let weatherWrapper = document.getElementById("weather-icon-wrapper");
    weatherWrapper.setAttribute("data", iconDef);
    weatherWrapper.innerHTML = opisDef;
    addStyleDefs(
      '#weather-icon-wrapper::before {content: "\\' + iconDef + '";}'
    );
  }
};

let setData = (data) => {
  setUVI(data.uvi);
  //setUVI (11.3);
  //setTemperature (Math.round ( data.temp ) );
  //setWeather (data.weather[0])
};

let pickHex = (color1, color2, weight) => {
  var w1 = weight;
  var w2 = 1 - w1;
  var rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2),
  ];
  return rgb;
};

let getUvColor = (uvi) => {};

let setTemperature = (temp) => {
  document.getElementById("temperature").innerHTML = "C˚" + temp;
};
let setHumidity = (humid) => {
  document.getElementById("humidity").innerHTML = humid + "%";
};

function setBackgroundColor(index) {
  document.body.setAttribute("class", "index-" + index);
  document
    .getElementById("uv-text-section")
    .setAttribute("class", "index-" + index);
  document
    .getElementById("uv-element")
    .setAttribute("class", "uv-base-wrapper image-" + index);
  document
    .getElementById("uv-data")
    .setAttribute("class", "uv-base-wrapper image-" + index);
  document
    .getElementById("content-base")
    .setAttribute("class", "content-" + index);
}

let ispisi = [
  "Nizak",
  "Nizak",
  "Nizak",
  "Umeren",
  "Umeren",
  "Umeren",
  "Visok",
  "Visok",
  "Veoma visok",
  "Veoma visok",
  "Veoma visok",
  "Ekstremo visok",
];

function setUvData(index) {
  let uvText = "<p>" + index + "</p>";
  document.getElementById("uv-index").setAttribute("class", "text-" + index);
  if (index >= 11) {
    uvText = "<p>11<sup>+</sup></p>";
    index = 11;
  }
  document.getElementById("uv-index").innerHTML = uvText;
  document.getElementById("uv-text-top").innerHTML = ispisi[index];
}

let setIndex = (uvi) => {
  let mathIndex = Math.round(uvi);
  if (uvi > 11) mathIndex = "11";
  setBackgroundColor(mathIndex);
  setUvData(mathIndex);
};

let showCurrent = (data) => {
  console.log("setting current data", data.uvi, data.temp, data.humidity);
  document.querySelector("#menu ul li:first-child").click();
  setIndex(data.uvi);
  setTemperature(Math.round(data.temp));
  setHumidity(Math.round(data.humidity));
  //setWeather (data.weather[0])
};

async function logJSONData() {
  await fetch(wheatherApiUrl)
    .then((response) => {
      return response.json();
    })
    .then((returnedResponse) => {
      showCurrent(Object(returnedResponse).current);
      document
        .getElementById("content-base")
        .setAttribute("class", "content-1");
    })
    .catch((error) => {
      console.log(error);
    });
  // const response = await fetch(wheatherApiUrl).catch(err => {console.log (err.response.data)});
  // const jsonData = await response.json();
  // showCurrent (Object(jsonData).current);
  // document.getElementById('content-base').setAttribute('class', 'content-1')
}

function startMeasurements() {
  logJSONData();
  measureInterval = setInterval(() => {
    logJSONData();
  }, 900000);
}

function handleContentPositioning(index) {
  contentIndex = index;
  let menu = document.getElementById("menu");
  document.getElementById("content-base").setAttribute("data", index);
  menu.getElementsByClassName("active")[0].classList.remove("active");
  menu
    .querySelector("li:nth-child(" + (index + 1) + ")")
    .classList.add("active");
  document.getElementById("content-wrapper").style.left =
    100.5 * (0 - index) + "%";
}
let contentLength = 0;
function setMenu() {
  let menu = document.getElementById("menu");
  let content = document.getElementById("content-wrapper");
  let menuItems = menu.querySelectorAll("li");
  contentLength = Object.values(menuItems).length;
  Object.values(menuItems).forEach((item, index) => {
    let clickArea = document.createElement("div");
    clickArea.classList.add("click-area");
    item.appendChild(clickArea);
    clickArea.addEventListener("click", (e) => {
      handleContentPositioning(index);
    });
  });
}

let adjustment = 1080 / 1080;

function adjustScaleToFit() {
  let main = document.getElementsByTagName("main")[0];
  let mainWidth = main.clientWidth;
  let width = document.body.clientWidth;
  let scale = 1 * adjustment;
  if (mainWidth > width) scale = (width / mainWidth) * adjustment;
  main.setAttribute(
    "style",
    "transform-origin: top left; transform: scale(" + scale + ");"
  );
}

function setSwipes() {
  let el = document.getElementById("content-wrapper");
  el.addEventListener("touchstart", handleTouchStart, false);
  el.addEventListener("touchmove", handleTouchMove, false);
  el.addEventListener("touchend", handleTouchEnd, false);

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return (
      evt.touches || // browser API
      evt.originalEvent.touches
    ); // jQuery
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }
  function handleTouchEnd(evt) {
    el.style.marginLeft = "0";
    handleContentPositioning(contentIndex);
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 10) {
        /* right swipe */
        console.log("swipe right to left");
        el.style.marginLeft = -xDiff + "px";
        if (contentIndex < contentLength - 1) contentIndex++;
      } else if (xDiff < -10) {
        /* left swipe */
        console.log("swipe left to right");
        el.style.marginLeft = -xDiff + "px";
        contentIndex--;
        if (contentIndex < 0) contentIndex = 0;
      }
    } else {
      if (yDiff > 0) {
        /* down swipe */
      } else {
        /* up swipe */
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
}

function insertSlideshowControls(s) {
  let leftArrow = document.createElement("div");
  leftArrow.setAttribute("class", "arrow left-arrow disabled");
  leftArrow.innerHTML = "<p>❮</p>";
  let rightArrow = document.createElement("div");
  rightArrow.setAttribute("class", "arrow right-arrow");
  rightArrow.innerHTML = "<p>❯</p>";

  let width = s.parentNode.clientWidth;
  let numSlides = s.children.length;
  let currSlide = 0;
  let step = width * -1;

  let dots = document.createElement("div");
  dots.setAttribute("class", "dots-wrapper");
  let dotList = document.createElement("ul");
  dots.setAttribute("class", "dots");
  dots.appendChild(dotList);
  for (let i = 0; i < numSlides; i++) {
    let dot = document.createElement("li");
    if (i == 0) dot.classList.add("active");
    dotList.appendChild(dot);
  }

  s.parentNode.appendChild(leftArrow);
  s.parentNode.appendChild(rightArrow);
  s.parentNode.appendChild(dots);

  s.setAttribute("data", numSlides);
  s.setAttribute("curr", currSlide);

  leftArrow.addEventListener("click", (e) => {
    if (currSlide <= 0) {
      return false;
    }
    dotList.querySelector(".active").classList.remove("active");
    rightArrow.classList.remove("disabled");
    currSlide -= 1;
    if (currSlide <= 0) {
      e.target.classList.add("disabled");
      currSlide = 0;
    }
    s.setAttribute("style", "left: " + currSlide * step + "px");
    s.setAttribute("curr", currSlide);
    dotList.children[currSlide].classList.add("active");
  });

  rightArrow.addEventListener("click", (e) => {
    if (currSlide >= numSlides - 1) {
      return false;
    }
    dotList.querySelector(".active").classList.remove("active");
    leftArrow.classList.remove("disabled");
    currSlide += 1;
    if (currSlide >= numSlides - 1) {
      e.target.classList.add("disabled");
    }
    if (currSlide == numSlides - 1) {
      currSlide = numSlides - 1;
      e.target.classList.add("disabled");
    }
    s.setAttribute("style", "left: " + currSlide * step + "px");
    s.setAttribute("curr", currSlide);
    dotList.children[currSlide].classList.add("active");
  });
}

function setSingleSlideshow(s) {
  insertSlideshowControls(s);
}

function setSlideshows(slideshows) {
  slideshows.forEach((slideshow) => {
    setSingleSlideshow(slideshow);
  });
}

let logoSlideInterval;

function startMe() {
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  setSwipes();
  let slideshows = document.querySelectorAll(".content-slider ul");
  setSlideshows(Object.values(slideshows));
  adjustScaleToFit();
  startMeasurements();
  setMenu();
  let mainWrapper = document.getElementById("main-content");

  logoSlideInterval = setInterval(() => {
    mainWrapper.classList.add("logo");
    setTimeout(() => {
      mainWrapper.classList.remove("logo");
    }, 10000);
  }, 50000);
  //handleSwipes ( document.getElementById( 'content-wrapper' ) );
}

window.addEventListener("load", startMe);
