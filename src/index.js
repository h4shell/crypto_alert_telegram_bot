const express = require("express");
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

const app = express();
const { sendMessage } = require("./controllers/telegram");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fetch("http://localhost:3000", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    //make sure to serialize your JSON body
    body: `
    {
        "lp":"BNB-USDT",
        "price": "$1000",
        "signal":"buy",
        "timeframe":"1M"
    }`,
  }).then((response) => {
    //do something awesome that makes the world a better place
  });
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log("POST");
  console.log(req.body);
  const price = req.body.price;
  const timeframe = req.body.timeframe;
  const signal = req.body.signal;
  const lp = req.body.lp;

  if (signal === "buy") {
    loadImage("images/bg-buy.png")
      .then((image) => {
        const width = 1920;
        const height = 1080;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        // Disegna l'immagine come sfondo
        ctx.drawImage(image, 0, 0, width, height);

        // Aggiungi del testo
        ctx.fillStyle = "green";
        ctx.font = "250px Montserrat";
        ctx.fillText(price, 130, 600);

        ctx.fillStyle = "white";
        ctx.font = "95px Montserrat";
        ctx.fillText(timeframe, 1630, 290);

        ctx.fillStyle = "white";
        ctx.font = "95px Montserrat";
        ctx.fillText(lp, 130, 290);

        // Salva l'immagine come file PNG
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync("tmp/canvas-image-with-background.png", buffer);

        console.log("Immagine salvata come canvas-image-with-background.png");
      })
      .catch((error) => {
        console.error("Errore nel caricamento dell'immagine:", error);
      });
  } else if (signal === "sell") {
    loadImage("images/bg-sell.png")
      .then((image) => {
        const width = 1920;
        const height = 1080;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        // Disegna l'immagine come sfondo
        ctx.drawImage(image, 0, 0, width, height);

        // Aggiungi del testo
        ctx.fillStyle = "red";
        ctx.font = "250px Montserrat";
        ctx.fillText(price, 130, 600);

        ctx.fillStyle = "white";
        ctx.font = "95px Montserrat";
        ctx.fillText(timeframe, 1630, 290);

        ctx.fillStyle = "white";
        ctx.font = "95px Montserrat";
        ctx.fillText(lp, 130, 290);

        // Salva l'immagine come file PNG
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync("tmp/canvas-image-with-background.png", buffer);

        console.log("Immagine salvata come canvas-image-with-background.png");
      })
      .catch((error) => {
        console.error("Errore nel caricamento dell'immagine:", error);
      });
  }

  const message = `
💰 ${lp} 🚀
📈 Current price: ${price}
⏱️ Timeframe: ${timeframe}
🔔 Current signal: ${signal.toUpperCase()}📢

📊 Trend: The market is showing ${signal.toUpperCase()} signals, evaluate carefully!

🔗 Stay updated with the next signals to seize the best opportunities.
💡 Note: This is not financial advice. Invest responsibly!`;

  sendMessage(process.env.TELEGRAM_CHAT_ID, message, lp);
  res.json({ message: "Hello World!" });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
