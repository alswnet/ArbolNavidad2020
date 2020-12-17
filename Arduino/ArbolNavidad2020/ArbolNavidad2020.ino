void setup() {
  Serial.begin(9600);

}

void loop() {
  if (Serial.available()) {
    DecodificarSerial();
  }
}


void DecodificarSerial() {
  // Mensaje de la forma M1/30
  // Donde M1 Es motor 1
  // 30 el valor
  String Mensaje = Serial.readStringUntil('\n');
  int PosicionPleca = Mensaje.indexOf('/');
  int PosicionSaltoLinea = Mensaje.length();
  String Dato = Mensaje.substring(0, PosicionPleca);
  String Valor = Mensaje.substring(PosicionPleca + 1, PosicionSaltoLinea);
  //.toInt();
  //  if (Dato.equals("M1")) {
  //    M1 = Valor;
  //  }
  //  else if (Dato.equals("M2")) {
  //    M2 = Valor;
  //  }


  Serial.print("Dato:");
  Serial.print(Dato);
  Serial.print(" Valor:");
  Serial.print(Valor);
  Serial.println();

}
