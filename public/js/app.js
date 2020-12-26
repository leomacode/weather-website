const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const message1 = document.querySelector("#message_1");
const message2 = document.querySelector("#message_2");
const message3 = document.querySelector("#message_3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var address = search.value;
  message1.textContent = "Loading...";
  message2.textContent = "";
  message3.textContent = "";

  var url = `/weather?address=${address}`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.err) {
        message1.textContent = data.err;
      } else {
        var { location, tem, weather_descriptions } = data;
        message1.textContent = location;
        message2.textContent = weather_descriptions;
        message3.textContent = tem;
      }
    });
  });
});
