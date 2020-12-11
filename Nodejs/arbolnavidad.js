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
    if (Mensaje == "ayuda" || Mensaje == "/\ayuda" || Mensaje == "a") {
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
  var Mensaje = "*Bienbenido* al Bot del Arbol de Navidad 2020 *ALSW* \n";
  Mensaje += "Si es tu primera vez por aqui entra a: \n";
  Mensaje += "https://nocheprogramacion.com/arbolnavidad \n";
  Mensaje += "o usa el comando \n /Ayuda \n"
  Mensaje += "*Feliz Navidad de ALSW*";
  bot.sendMessage(ID, Mensaje, {
    parse_mode: "Markdown"
  });
}

function MensajeAyuda(ID) {
  bot.sendMessage(ID, "", {
    parse_mode: "Markdown"
  });
  // bot.sendMessage(ID,"<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href=\"http://www.example.com/\">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>" ,{parse_mode : "HTML"});
  //
  // bot.sendMessage(ID, "El Arbol tiene las siquientes funcciones:")
  //   .then(
  //     bot.sendMessage(ID, "Foto - Pedir una foto del arbol actual"))
  //   .then(
  //     bot.sendMessage(ID, "Codigo - Codigo fuente del proyecto"))
  //   .then(
  //     bot.sendMessage(ID, "Ayuda - Para pedir Ayuda"))
  //   .then(
  //     bot.sendMessage(ID, "Si necesitas mas info entra en:"))
  //   .then(
  //     bot.sendMessage(ID, "https://nocheprogramacion.com/arbolnavidad"));
}
