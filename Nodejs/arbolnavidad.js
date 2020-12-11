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
    var chatId = msg.chat.id;
    var Mensaje = msg.text.toLowerCase();
    if (Mensaje == "ayuda" || Mensaje == "a") {
      MensajeAyuda(chatId)
    } else if (Mensaje == "inicio" || Mensaje == "/\start") {
      MensajeBienbenida(chatId);
    } else {
      bot.sendMessage(chatId, 'No entiendo intenta con Ayuda o entra a https://nocheprogramacion.com/arbolnavidad');
    }
  }
});

function SalvarChat(Mensaje) {
  var ID = Mensaje.chat.id
  var User = Mensaje.chat.username;
  var Lenguaje = Mensaje.language_code;
  var Nombre = Mensaje.chat.first_name;
  var Fecha = new Date(Mensaje.date * 1000);
  var Texto = Mensaje.text;

  console.log("Salvando: " + User + "-" + Nombre + " Mensaje:" + Texto + " Fecha:" + Fecha);
  // console.log(Mensaje)
}

function MensajeBienbenida(ID) {
  bot.sendMessage(ID, "Bienbenido al Bot del Arbol de Navidad 2020 de ALSW")
    .then(
      bot.sendMessage(ID, "Si es tu primera vez por aqui entra a:"))
    .then(
      bot.sendMessage(ID, "https://nocheprogramacion.com/arbolnavidad"))
    .then(
      bot.sendMessage(ID, "o usa el comando Ayuda"))
    .then(
      bot.sendMessage(ID, "Feliz Navidad de ALSW"));
}

function MensajeAyuda(ID) {
  bot.sendMessage(ID, "El Arbol tiene las siquientes funcciones:")
    .then(
      bot.sendMessage(ID, "Foto - Pedir una foto del arbol actual"))
    .then(
      bot.sendMessage(ID, "Codigo - Codigo fuente del proyecto"))
    .then(
      bot.sendMessage(ID, "Ayuda - Para pedir Ayuda"))
    .then(
      bot.sendMessage(ID, "Si necesitas mas info entra en:"))
    .then(
      bot.sendMessage(ID, "https://nocheprogramacion.com/arbolnavidad"));
}
