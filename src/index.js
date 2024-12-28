const express = require("express");
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
    body: `{"message": "Hello World!"}`,
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
