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
            Random random = new Random();
            switch (id)
            {
                case 1:
                    if (random.Next(1, 9) == 1) //6,5% che sia aperta
                    {
                        current_doors1 = !current_doors1;
                    }

                    if (current_doors1)
                    {
                        return "true";
                    }
                    return "false"; //chiusa
                case 2:
                    
                    if (random.Next(1, 10) == 1) //6,5% che sia aperta
                    {
                        current_doors2 = !current_doors2;
                    }

                    if (current_doors2)
                    {
                        return "true";
                    }
                    return "false"; //chiusa
                case 3:
                    if (random.Next(1, 8) == 1) //6,5% che sia aperta
                    {
                        current_doors3 = !current_doors3;
                    }

                    if (current_doors3)
                    {
                        return "true";
                    }
                    return "false"; //chiusa
                case 4:
                    if (random.Next(1, 11) == 1) //6,5% che sia aperta
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