/*jshint esversion: 6 */
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

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
    if (EstaTexto(Mensaje, "listacolor") || Mensaje == "/\listacolor") {
      MensajeListaColor(chatId);
    } else if (EstaTexto(Mensaje, "color") || Mensaje == "/\color") {
      CambiarColor(chatId, Mensaje);
    } else if (EstaTexto(Mensaje, "ayuda") || Mensaje == "/\ayuda") {
      MensajeAyuda(chatId)
    } else if (EstaTexto(Mensaje, "inicio") || Mensaje == "/\start") {
      MensajeBienbenida(chatId);
    } else if (EstaTexto(Mensaje, "nocheprogramacion") || Mensaje == "tutorial" || Mensaje == "\/tutorial") {
      bot.sendMessage(chatId, 'Tutoriales: https://nocheprogramacion.com');
    } else if (EstaTexto(Mensaje, "programacionnews") || EstaTexto(Mensaje, "noticias") || Mensaje == "\/noticias") {
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

function EstaTexto(Mensaje, Texto) {
  if (Mensaje.indexOf(Texto) >= 0) {
    return true;
  } else {
    return false;
  }
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

function ListaColor() {
  let ArchivoColores = fs.readFileSync('Colores.json');
  let Colores = JSON.parse(ArchivoColores)['Colores'];
  return Colores;
}

function MensajeListaColor(ID) {
  Colores = ListaColor();
  var Mensaje = "Lista de *colores* disponibles:\n"
  Colores.forEach((Color, i) => {
    Mensaje += Color + "\n"
  });
  Mensaje += "*Ejemplo:*\n";
  Mensaje += "/color rojo";

  bot.sendMessage(ID, Mensaje, {
    parse_mode: "Markdown"
  });
}

function CambiarColor(ID, Mensaje) {
  Colores = ListaColor();
  var Encontrado = false;
  Colores.forEach((Color, i) => {
    if (EstaTexto(Mensaje, Color)) {
      var TextoColor = "Cambiando el arbol a color:\n*";
      TextoColor += Color + "*";
      bot.sendMessage(ID, TextoColor, {
        parse_mode: "Markdown"
      });
      Encontrado = true;
      return;
    }

  });
  if (!Encontrado) {
    bot.sendMessage(ID, 'Color no esta en la lista intenta /listacolor');
  }
}

function MensajeAyuda(ID) {
  var Mensaje = "El *Bot* tiene los siquientes comandos:\n"
  Mensaje += "/start  Mensaje de Bienbenida del Bot\n";
  Mensaje += "/estado Devuelve estado actual del arbol colores y usuario\n"
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
