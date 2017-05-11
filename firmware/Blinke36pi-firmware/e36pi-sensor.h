int analogPin[] = {0,1,2,3};
int raw [] = {0,0,0,0};
float Vout [] = {0,0,0,0};
float SensorVal [] = {0,0,0,0};
float buffer [] = {0,0,0,0};

int Vin = 5;
float ref=  560;


namespace e36pisensor{
  void readSensors(){
  
    String output = "";
    
    for(int i=0; i< 4; i++){
      
      raw[i] = analogRead(analogPin[i]);
      //if(raw[i]) 
      //{
        buffer[i] = raw[i] * Vin;
        Vout[i] = (buffer[i])/1024.0;
        buffer[i] = (Vin/Vout[i]) -1;
        SensorVal[i] = ref * buffer[i];
        /*Serial.print("Vout: ");
        Serial.println(Vout);
        Serial.print("R2: ");
        Serial.println(R2);*/
        
        output += i;
        output += "=";
        output += SensorVal[i];
        
        if(i < 4-1){
           output += ",";
        }
      //}
    }
    
    Serial.println(output);
  }
}
