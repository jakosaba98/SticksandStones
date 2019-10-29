using System;

namespace DataReader.Sensors
{
    class GPSSensor : Sensor
    {

        public struct Coordinates
        {
            public double[] array_lon;
            public double[] array_lat;
        };

        
        private static Coordinates Verona = new Coordinates
        {
            array_lat = new double[]
                        { 45.438712, 45.438549, 45.438320, 45.437982, 45.437637,
                          45.437272, 45.437333, 45.437840, 45.438367, 45.438718,
                          45.439300, 45.439813, 45.440411, 45.441096, 45.441756,
                          45.442479, 45.442268, 45.441718, 45.441018, 45.440333,
                          45.440511, 45.439856, 45.439246, 45.438908 },

            array_lon = new double[]
                        { 10.990199, 10.990979, 10.991731, 10.992829, 10.993638,
                          10.994919, 10.996238, 10.997153, 10.998107, 10.998772,
                          10.998261, 10.997722, 10.997111, 10.996435, 10.995745,
                          10.995027, 10.994007, 10.992999, 10.991507, 10.990220,
                          10.990618, 10.989083, 10.988618, 10.989530 }
        };

        private static Coordinates Padova = new Coordinates
        {
            array_lat = new double[]
                        { 45.438712, 45.438549, 45.438320, 45.437982, 45.437637,
                          45.437272, 45.437333, 45.437840, 45.438367, 45.438718,
                          45.439300, 45.439813, 45.440411, 45.441096, 45.441756,
                          45.442479, 45.442268, 45.441718, 45.441018, 45.440333,
                          45.440511, 45.439856, 45.439246, 45.438908 },

            array_lon = new double[]
                        { 10.990199, 10.990979, 10.991731, 10.992829, 10.993638,
                          10.994919, 10.996238, 10.997153, 10.998107, 10.998772,
                          10.998261, 10.997722, 10.997111, 10.996435, 10.995745,
                          10.995027, 10.994007, 10.992999, 10.991507, 10.990220,
                          10.990618, 10.989083, 10.988618, 10.989530 }
        };

        private static Coordinates Treviso = new Coordinates
        {
            array_lat = new double[]
                        { 45.438712, 45.438549, 45.438320, 45.437982, 45.437637,
                          45.437272, 45.437333, 45.437840, 45.438367, 45.438718,
                          45.439300, 45.439813, 45.440411, 45.441096, 45.441756,
                          45.442479, 45.442268, 45.441718, 45.441018, 45.440333,
                          45.440511, 45.439856, 45.439246, 45.438908 },

            array_lon = new double[]
                        { 10.990199, 10.990979, 10.991731, 10.992829, 10.993638,
                          10.994919, 10.996238, 10.997153, 10.998107, 10.998772,
                          10.998261, 10.997722, 10.997111, 10.996435, 10.995745,
                          10.995027, 10.994007, 10.992999, 10.991507, 10.990220,
                          10.990618, 10.989083, 10.988618, 10.989530 }
        };



        Coordinates[] array_coor = new Coordinates[]
        {
            Treviso,
            Padova,
            Verona
        };

        int count_lat = -1;
        int count_lon = -1;
        private int id;

        public GPSSensor(int id)
        {
            this.id = id;
        }

        public double GetLat()
        {

            if(id == 1)
            {
                //Treviso
                count_lat++;
                if (count_lat >= Treviso.array_lat.Length)
                {
                    count_lat = 0;
                }
                return Treviso.array_lat[count_lat];
            } else if (id == 2)
            {
                //Padova
                count_lat++;
                if (count_lat >= Padova.array_lat.Length)
                {
                    count_lat = 0;
                }
                return Padova.array_lat[count_lat];
            }
            else if (id == 3)
            {
                //Verona
                count_lat++;
                if (count_lat >= Verona.array_lat.Length)
                {
                    count_lat = 0;
                }
                return Verona.array_lat[count_lat];
            }
            else return 0;
            //Random random = new Random();
            //return ((double)random.Next(36500000, 47000000) / 1000000);//simulazione coordinate italiane
            
        }

        public double GetLon()
        {
            if (id == 1)
            {
                //Treviso
                count_lon++;
                if (count_lon >= Treviso.array_lon.Length)
                {
                    count_lon = 0;
                }
                return Treviso.array_lon[count_lon];
            }
            else if (id == 2)
            {
                //Padova
                count_lon++;
                if (count_lon >= Padova.array_lon.Length)
                {
                    count_lon = 0;
                }
                return Padova.array_lon[count_lon];
            }
            else if (id == 3)
            {
                //Verona
                count_lon++;
                if (count_lon >= Verona.array_lon.Length)
                {
                    count_lon = 0;
                }
                return Verona.array_lon[count_lon];
            }
            else return 0;
            //Random random = new Random();
            //return ((double)random.Next(6500000, 18500000) / 1000000);//simulazione coordinate italiane
        }

        override public string GetValue() => "\n\"lat\": "+ GetLat() +", \n\"lon\": "+ GetLon() +",";
        public override string GetName() => "gps";
    }



}