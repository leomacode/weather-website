console.log("It is working ");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const message1 = document.querySelector("#message_1");
const message2 = document.querySelector("#message_2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var address = search.value;
  message1.textContent = "Loading...";
  message2.textContent = "";

  var url = `http://localhost:3000/weather?address=${address}`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.err) {
        message1.textContent = data.err;
      } else {
        var { location, forecast } = data;
        message1.textContent = location;
        message2.textContent = forecast;
      }
    });
  });
});
