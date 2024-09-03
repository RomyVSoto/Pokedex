const port = 8000;
const path = require("path");
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const connection = require("./contexts/AppContext");

const errorController = require("./controllers/ErrorController");
const adminRouter = require("./routes/admin");
const pokedexRouter = require("./routes/pokedex");

const Pokemones = require("./models/Pokemones");
const Regiones = require("./models/Regiones");
const Tipos = require("./models/Tipos");

app.engine("hbs", engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main",
    extname: "hbs",
    helpers: {
        eq: function(arg1, arg2) {
            return arg1 == arg2;
        }
    }
}));

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRouter);
app.use("/", pokedexRouter);
app.use("/", errorController.Get404);

connection.sync().then(function(result){
    app.listen(port);
}).catch(err => {
    console.log(err);
});
