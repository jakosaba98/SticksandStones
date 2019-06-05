using System;
namespace DataReader.Sensors
{
    interface ISensor
    {
        string GetName();
        string GetValue();
    }
    class Sensor : ISensor
    {
        virtual public string GetName() => "sensor";
        virtual public string GetValue() => "";
        virtual public string ToJson()
        {
            if (GetName() == "gps")
                return GetValue();

            return "\n\"" + GetName() + "\": " + GetValue() + ",";
        }
    }
}
