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

  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/decathlon_products/8974697?fields=*.*"
  );

  const productResponseJSON = await productResponse.json();

  const productData = productResponseJSON.data;
    response.render("index.liquid", { 
      product: productData
    });
});

// PDP SAVE PRODUCT
app.post("/cart/add", async function (request, response) {
  
  const defaultStatus = ["pending"];

  // Create order
  const orderResponse = await fetch("https://fdnd-agency.directus.app/items/decathlon_orders", {
    method: "POST",
    body: JSON.stringify({
      product: request.body.product_id,
      status: defaultStatus,
    }),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  // zet order response om naar json
  const orderResponseJSON = await orderResponse.json();
  // pak id van de order eruit
  const orderId = orderResponseJSON.data.id;

  // Add product as order item(s)
  await fetch("https://fdnd-agency.directus.app/items/dechtalon_order_items", {
    method: "POST",
    body: JSON.stringify({
      order: orderId,
      product: request.body.product_id,
      quantity: Number(request.body.quantity),
    }),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  return response.redirect("/?status=added");
});
 
// Stel het poortnummer in waar Express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);
 
app.listen(app.get("port"), function () {
  console.log(
    `http://localhost:${app.get("port")}/`,
  );
});