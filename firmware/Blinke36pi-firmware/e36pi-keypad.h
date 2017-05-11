#include <Keypad.h>

const byte ROWS = 4; //four rows
const byte COLS = 4; //three columns
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'#','0','*','D'}
};

byte rowPins[ROWS] = {32, 34, 36,38}; //connect to the row pinouts of the keypad
byte colPins[COLS] =  {24, 26, 28, 30}; //connect to the column pinouts of the keypad

Keypad keypad = Keypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS );


namespace e36pikeypad{
  void keypadEvent(KeypadEvent key)
  {
  
    switch (keypad.getState()){
      case PRESSED:
        if (key != NO_KEY){
          Serial.println(key);
        }
        break;
    }
  }
}

