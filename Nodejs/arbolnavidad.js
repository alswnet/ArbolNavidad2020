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
    } else if (Mensaje == "nocheprogramacion" || Mensaje == "tutorial" || Mensaje == "\/tutorial") {
      bot.sendMessage(chatId, 'Tutoriales: https://nocheprogramacion.com');
    } else if (Mensaje == "programacionnews" || Mensaje == "noticias" || Mensaje == "\/noticias") {
      bot.sendMessage(chatId, 'Noticas: https://programacion.news');
    } else {
      bot.sendMessage(chatId, 'No entiendo intenta con /ayuda o entra a https://nocheprogramacion.com/arbolnavidad');
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
  Mensaje += "o usa el comando \n";
  Mensaje += "/ayuda \n";
  Mensaje += "*Feliz Navidad de ALSW*";
  bot.sendMessage(ID, Mensaje, {
    parse_mode: "Markdown"
  });
}

function MensajeAyuda(ID) {
  var Mensaje = "El *Bot* tiene los siquientes comandos:\n"
  Mensaje += "/start  Mensaje de Bienbenida del Bot\n";
  Mensaje += "/foto Pedir foto del arbol actual\n";
  Mensaje += "/color {COLOR} Cambiar el color de arbol a un color de la lista\n";
  Mensaje += "/listacolor Muestra lista de colores para el arbol\n";
  Mensaje += "/tutorial Pedir sitio web de *Tutoriales* de ALSW\n";
  Mensaje += "/noticias Pedir sitio web de *Noticias* de ALSW\n";
  Mensaje += "/discord Pedir Comunidad de *Discord* de ALSW\n"
  Mensaje += "/codigo Pedir codigo del proyecto\n";
  Mensaje += "/web Pedir pagina Web del proyectyo\n";
  Mensaje += "/video Pedir video del proyecto\n";
  Mensaje += "/error Pedir sitio web para reportar errores\n"
  Mensaje += "/ayuda  Para pedir ayuda de los comandos\n";

  bot.sendMessage(ID, Mensaje, {
    parse_mode: "Markdown"
  });
}
