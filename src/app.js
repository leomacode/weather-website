const path = require("path");
const hbs = require("hbs");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");

// Setup static file directory
app.use(express.static(path.join(__dirname + "/../public")));

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/../templates/views"));
hbs.registerPartials(path.join(__dirname, "/../templates/partials"));

//setup static directory to serve
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Leo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Leo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "This is a help message",
    name: "Leo",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Leo",
    title: "404",
    errorMessage: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  var { address } = req.query;

  if (!address) {
    return res.send({ err: "You must provide an address!" });
  }

  geocode(address, (err, { location } = {}) => {
    if (err) {
      return res.send({ err });
    }

    forecast(location, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }

      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  res.send({
    products: req.query.search,
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Leo",
    title: "404",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server succeeds on port: ${port}`);
});
