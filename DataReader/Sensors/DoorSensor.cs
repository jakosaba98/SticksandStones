using System;

namespace DataReader.Sensors
{
    class DoorSensor : Sensor
    {
        private bool current_doors;
        public DoorSensor()
        {
            current_doors = false;
        }
        override public string GetName() => "doors";
        override public string GetValue()
        {
            Random random = new Random();
            if (random.Next(1, 15) == 1) //6,5% che sia aperta
            {
                current_doors = !current_doors;
            }
            return ""+current_doors; //chiusa
        }
    }
}