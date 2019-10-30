using System;

namespace DataReader.Sensors
{
    class CountSensor : Sensor
    {
        DoorSensor d;
        int id;
        int passengers1;
        int passengers2;
        int passengers3;
        int passengers4;
        Random random = new Random();

        //Random random = new Random();
        public CountSensor(DoorSensor d, int id)
        {
            this.d = d;
            this.id = id;
            passengers1 = 0;
            passengers2 = 0;
            passengers3 = 0;
            passengers4 = 0;
        }
        public override string GetValue()
        {
            Controller();
            switch (id)
            {
                case 1:
                    return "" + passengers1;
                case 2:
                    return "" + passengers2;
                case 3:
                    return "" + passengers3;
                case 4:
                    return "" + passengers4;
                default:
                    return "";

            }
            
        }
        public override string GetName() => "count";

        public void Controller()
        {

            if (d.GetValue() == "true")
            {
                if (id == 1)
                {
                    //***TREVISO***
                    
                    if (random.Next(1, 3) == 1) //33% che un passeggero salga
                    {
                        passengers1++;
                    }

                    if (random.Next(1, 3) == 1 && passengers1 > 0) //33% che un passeggero scenda
                    {
                        passengers1--;
                    }
                }
                else if(id == 2)
                {
                    //***PADOVA***
                    //Random random2 = new Random();

                    if (random.Next(1, 3) == 1) //33% che un passeggero salga
                    {
                        passengers2++;
                    }

                    if (random.Next(1, 3) == 1 && passengers2 > 0) //33% che un passeggero scenda
                    {
                        passengers2--;
                    }
                }
                else if(id == 3)
                {
                    //***VERONA***
                    //Random random3 = new Random();

                    if (random.Next(1, 3) == 1) //33% che un passeggero salga
                    {
                        passengers3++;
                    }

                    if (random.Next(1, 3) == 1 && passengers3 > 0) //33% che un passeggero scenda
                    {
                        passengers3--;
                    }
                }
                else if(id == 4)
                {
                    //***VICENZA***
                    //Random random4 = new Random();

                    if (random.Next(1, 3) == 1) //33% che un passeggero salga
                    {
                        passengers4++;
                    }

                    if (random.Next(1, 3) == 1 && passengers4 > 0) //33% che un passeggero scenda
                    {
                        passengers4--;
                    }
                }

            }

            }
        }
    }
