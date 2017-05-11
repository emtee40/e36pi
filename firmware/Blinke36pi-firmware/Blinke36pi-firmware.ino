#include <ArduinoJson.h>
#include "e36pi-keypad.h"
#include "e36pi-sensor.h"

String inputString = ""; 
boolean commandReady = false;
boolean systemReady = false;

void setup()
{
  Serial.begin(9600);
  while (!Serial) {
    // wait serial port initialization
  }
  delay(1000);    
  keypad.addEventListener(e36pikeypad::keypadEvent);
}

void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    if (inChar == '\n') {
      commandReady = true;
    }else{
      inputString += inChar;
    }
  }
}


void loop() {

  if (commandReady) {

    if(inputString.equals("begin")){
      systemReady = true;
      Serial.println("system.ready=true");
    }
    
    if(systemReady){      
      if(inputString.startsWith("sensor")){
        e36pisensor::readSensors();
        //Serial.println("sensor:0=100,1=200,2=300,3=400");
      }
    }else{
      Serial.println("system.ready=false");
    }
    
    inputString = "";
    commandReady = false;
  }
  
  delay(500);    
  /*raw = analogRead(analogPin);
  if(raw) 
  {
    buffer= raw * Vin;
    Vout= (buffer)/1024.0;
    buffer= (Vin/Vout) -1;
    R2= R1 * buffer;
    Serial.print("Vout: ");
    Serial.println(Vout);
    Serial.print("R2: ");
    Serial.println(R2);
    delay(1000);
  }*/  
}
