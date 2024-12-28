// Sostituisci con il tuo token
// const token = process.env.TELEGRAM_BOT_TOKEN;
const token = process.env.TELEGRAM_BOT_TOKEN;

const TelegramBot = require("node-telegram-bot-api");

// Crea un bot che utilizza il polling per ricevere aggiornamenti
const bot = new TelegramBot(token, { polling: true });

// Funzione per inviare un messaggio
const sendMessage = async (chatId, text, lp) => {
  try {
    lp = lp.split("-");
    const tradingViewUrl = `https://www.tradingview.com/chart/?symbol=BINANCE%3A${lp[0]}${lp[1]}`;

    const inlineKeyboard = [
      [
        {
          text: "SHOW ON TRADING VIEW",
          url: tradingViewUrl,
        },
      ],
      [
        {
          text: "BUY A LEDGER",
          url: "https://shop.ledger.com/pages/referral-program?referral_code=J7GM9J21S0Q79",
        },
      ],
    ];
    // const log = await bot.sendMessage(chatId, text, {
    //   reply_markup: {
    //     inline_keyboard: inlineKeyboard,
    //   },
    // });
    const log = await bot.sendPhoto(
      chatId,
      "tmp/canvas-image-with-background.png",
      {
        caption: text,
        reply_markup: {
          inline_keyboard: inlineKeyboard,
        },
      }
    );
    // console.log(log);
  } catch (error) {
    console.error("Errore nell'invio del messaggio:", error);
  }
};

module.exports = {
  sendMessage,
};
