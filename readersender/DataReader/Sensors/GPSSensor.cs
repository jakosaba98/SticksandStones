using System;

namespace DataReader.Sensors
{
    class GPSSensor : Sensor
    {
        public double GetLat()
        {
            Random random = new Random();
            return ((double)random.Next(36500000, 47000000) / 1000000);//simulazione coordinate italiane
        }

        public double GetLon()
        {
            Random random = new Random();
            return ((double)random.Next(6500000, 18500000) / 1000000);//simulazione coordinate italiane
        }
        override public string GetValue() => "{\"lat\":"+GetLat() +", \"lon\":"+ GetLon()+"}";
        public override string GetName() => "gps";
    }
}