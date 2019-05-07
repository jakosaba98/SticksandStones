using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataReader.Sensors
{
    interface IValuesSensor
    {
        void SetValues(int id, double lat, double lon, int count, bool doors);
        int GetId();
        double GetLat();
        double GetLon();
        int GetCount();
        bool GetDoors();
    }
}
