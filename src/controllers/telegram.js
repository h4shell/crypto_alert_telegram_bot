// Sostituisci con il tuo token
// const token = process.env.TELEGRAM_BOT_TOKEN;
const token = process.env.TELEGRAM_BOT_TOKEN;

const TelegramBot = require("node-telegram-bot-api");

// Crea un bot che utilizza il polling per ricevere aggiornamenti
const bot = new TelegramBot(token, { polling: true });

// Funzione per inviare un messaggio
const sendMessage = async (chatId, text) => {
  try {
    const inlineKeyboard = [
      [
        {
          text: "Button 1",
          url: "https://example.com",
        },
        {
          text: "Button 2",
          callback_data: "button2",
          url: "https://example.com",
        },
      ],
    ];
    const log = await bot.sendMessage(chatId, text, {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    });
    // console.log(log);
  } catch (error) {
    console.error("Errore nell'invio del messaggio:", error);
  }
};

module.exports = {
  sendMessage,
};
