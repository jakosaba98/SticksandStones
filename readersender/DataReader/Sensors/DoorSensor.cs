using System;

namespace DataReader.Sensors
{
    class DoorSensor : Sensor
    {
        public bool current_doors1;
        public bool current_doors2;
        public bool current_doors3;
        public bool current_doors4;
        public int id;
        public DoorSensor(int id)
        {
            this.id = id;
            current_doors1 = false;
            current_doors2 = false;
            current_doors3 = false;
            current_doors4 = false;
        }
        override public string GetName() => "doors";
        override public string GetValue()
        {
            switch (id)
            {
                case 1:
                    Random random1 = new Random();
                    if (random1.Next(1, 15) == 1) //6,5% che sia aperta
                    {
                        current_doors1 = !current_doors1;
                    }

                    if (current_doors1)
                    {
                        return "true";
                    }
                    return "false"; //chiusa
                case 2:
                    Random random2 = new Random();
                    if (random2.Next(1, 15) == 1) //6,5% che sia aperta
                    {
                        current_doors2 = !current_doors2;
                    }

                    if (current_doors2)
                    {
                        return "true";
                    }
                    return "false"; //chiusa
                case 3:
                    Random random3 = new Random();
                    if (random3.Next(1, 15) == 1) //6,5% che sia aperta
                    {
                        current_doors3 = !current_doors3;
                    }

                    if (current_doors3)
                    {
                        return "true";
                    }
                    return "false"; //chiusa
                case 4:
                    Random random4 = new Random();
                    if (random4.Next(1, 15) == 1) //6,5% che sia aperta
                    {
                        current_doors4 = !current_doors4;
                    }

                    if (current_doors4)
                    {
                        return "true";
                    }
                    return "false"; //chiusa
                default:
                    return "";
            }
                
        }
    }
}