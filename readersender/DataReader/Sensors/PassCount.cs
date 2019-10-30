using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataReader.Sensors
{
    class PassCount :Sensor
    {
        private List<CountSensor> vett;
        private int n;
        private DoorSensor d;
        private int id;
        public PassCount(DoorSensor d,int n, int id)
        {
            this.d = d;
            this.n = n;
            this.id = id;
            this.vett = new List<CountSensor>();
            for(int i=0;i<n;i++)
                vett.Add(new CountSensor(d, id));
        }
        override public string GetValue()
        {
            int total = 0;
            for(int i=0;i<vett.Count;i++)
            {
                total += Int32.Parse(vett[i].GetValue());
            }
            return ""+total;
        }
        override public string ToJson()
        {
            return "\n\"" + vett[0].GetName() + "\": " + this.GetValue() + "\n}";
        }
    }
}
