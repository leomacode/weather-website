var request = require("request");

var forecast = (location, callBack) => {
  var url = `http://api.weatherstack.com/current?access_key=975ae271a2e037f9c8bc697a567ea083&query=${location}`;

  request({ url, json: true }, function (err, response, { current } = {}) {
    var { observation_time: oTime, temperature } = current;

    if (err) {
      callBack("error", undefined);
    } else if (!oTime) {
      callBack("something wrong", undefined);
    } else {
      callBack(undefined, `current temperature is ${temperature}`);
    }
  });
};

module.exports = { forecast };
