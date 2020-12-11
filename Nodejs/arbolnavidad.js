/*jshint esversion: 6 */
const TelegramBot = require('node-telegram-bot-api');

var Contastes = require('./Token');

const bot = new TelegramBot(Contastes.token, {
  polling: true
});

console.log("Arbol de Navidad 2020");

bot.on('message', (msg) => {
  if (msg.from.is_bot) {
    console.log("Es un Bot");
  } else {
    SalvarChat(msg);
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message');
  }
});

function SalvarChat(Mensaje) {
  var ID = Mensaje.chat.id
  var User = Mensaje.chat.username;
  var Lenguaje = Mensaje.language_code;
  var Nombre = Mensaje.chat.first_name;
  var Fecha = new Date(Mensaje.date * 1000);

  var Texto = Mensaje.text;
  console.log("Salvando: " + User + "-" + Nombre + " Mensaje:" + Texto +" Fecha:" + Fecha);
  console.log(Mensaje)
}
