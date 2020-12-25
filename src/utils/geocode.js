const request = require("request");

var geocode = (address, callBack) => {
  var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    address
  )}.json?access_token=pk.eyJ1IjoiZm9yemFsZW9tYSIsImEiOiJja2VsOXl5bHkwbHkyMzVrN3AzOWUydWZ1In0.JNt9eUUY_dnFYOyLmFEd6A&limit=1`;

  request({ url: url, json: true }, function (error, response, { features }) {
    if (error) callBack("Unable to connect to location services", undefined);
    else if (!features.length)
      callBack(
        "Unable to connect to location services. Try another search.",
        undefined
      );
    else {
      var { center, place_name } = features[0];
      var [lat, lon] = center;
      callBack(undefined, {
        latitude: lat,
        longitude: lon,
        location: place_name,
      });
    }
  });
};

module.exports = { geocode };
