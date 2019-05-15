using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataReader.Sensors;
using CSRedis;

namespace DataReader
{
    class Program
    {
        static void Main(string[] args)
        {
            const int id = 3; // maybe get it from config file in bus
            var d = new DoorSensor();
            int[] a = { 1, 2 };
            // init sensors
            List<ISensor> sensors = new List<ISensor>
            {
                new GPSSensor(),
                d,
                new PassCount(d,2)
            };

            // configure Redis
            var redis = new RedisClient("127.0.0.1");

            while (true)
            {
                var data = ToJSON(id);
                Console.WriteLine(data);

                // push to redis queue
                redis.LPush("sensors_data", data);

                foreach (Sensor sensor in sensors)
                {
                    data = sensor.ToJson();
                    Console.WriteLine(data);
                    
                    // push to redis queue
                    redis.LPush("sensors_data", data);
                }
                System.Threading.Thread.Sleep(1000);

            }
        }
        static string ToJSON(int id) => "{\"id:\":\""+id+"\"}";
    }
}
