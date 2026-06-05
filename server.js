import express from "express";
 
// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from "liquidjs";
 
// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();
 
// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }));
 
// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
app.use(express.static("public"));
 
// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine("liquid", engine.express());
 
app.set("views", "./views");
 
// PDP //
app.get("/", async function (request, response) {
  const productParams = {};

  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/decathlon_products/8974697?fields=*.*" +
      new URLSearchParams(productParams),
  );

  const productResponseJSON = await productResponse.json();

  const productData = productResponseJSON.data;
    response.render("index.liquid", { 
      product: productData
    });
});
 
 
// Stel het poortnummer in waar Express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);
 
app.listen(app.get("port"), function () {
  console.log(
    `http://localhost:${app.get("port")}/`,
  );
});