using System;

namespace DataReader.Sensors
{
    class CountSensor : Sensor
    {
        DoorSensor d;
        int passengers;
        public CountSensor(DoorSensor d)
        {
            this.d = d;
            passengers = 0;
        }
        public override string GetValue()
        {
            Controller();
            return ""+passengers;
        }
        public override string GetName() => "count";

        public void Controller()
        {

            //****DIVIDERE PER ID OGNI AUTOBUS*****, ANCHE IN DOOR SENSOR
            Random random = new Random();

            if (d.GetValue() == "true")
            {
                if (random.Next(1, 3) == 1) //33% che un passeggero salga
                {
                    GetOn();
                }

                if (random.Next(1, 3) == 1 && passengers > 0) //33% che un passeggero scenda
                {
                    GetOff();
                }

            }
        }
        public void GetOn() => passengers++;
        public void GetOff() => passengers--;
    }
}