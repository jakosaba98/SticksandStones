using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataReader.Sensors;
using CSRedis;
using System.Configuration;

namespace DataReader
{
    class Program
    {
        [Obsolete]
        static void Main(string[] args)
        {

            // configure Redis
            var redis = new RedisClient("127.0.0.1");

            //*****TREVISO*****
            int idtreviso = 1;
            var d1 = new DoorSensor();
            // init sensors
            List<ISensor> sensors1 = new List<ISensor>
            {
                new GPSSensor(idtreviso, d1),
                d1,
                new PassCount(d1,2)
            };
            

            //*****PADOVA*****
            int idpadova = 2;
            var d2 = new DoorSensor();
            // init sensors
            List<ISensor> sensors2 = new List<ISensor>
            {
                new GPSSensor(idpadova, d2),
                d2,
                new PassCount(d2,2)
            };

            //*****VERONA*****
            int idverona = 3;
            var d3 = new DoorSensor();
            // init sensors
            List<ISensor> sensors3 = new List<ISensor>
            {
                new GPSSensor(idverona, d3),
                d3,
                new PassCount(d3,2)
            };

            //*****VICENZA*****
            int idvicenza = 4;
            var d4 = new DoorSensor();
            // init sensors
            List<ISensor> sensors4 = new List<ISensor>
            {
                new GPSSensor(idvicenza, d4),
                d4,
                new PassCount(d4,2)
            };

            while (true)
            {
                var data1 = ToJSON(idtreviso);
                var data2 = ToJSON(idpadova);
                var data3 = ToJSON(idverona);
                var data4 = ToJSON(idvicenza);

                foreach (Sensor sensor1 in sensors1)
                {
                    data1 += sensor1.ToJson();
                }

                foreach (Sensor sensor2 in sensors2)
                {
                    data2 += sensor2.ToJson();
                }

                foreach (Sensor sensor3 in sensors3)
                {
                    data3 += sensor3.ToJson();
                }

                foreach (Sensor sensor4 in sensors4)
                {
                    data4 += sensor4.ToJson();
                }

                Console.WriteLine(data1);
                Console.WriteLine(data2);
                Console.WriteLine(data3);
                Console.WriteLine(data4);

                //push to redis queue
                redis.LPush("sensors_data", data1);
                redis.LPush("sensors_data", data2);
                redis.LPush("sensors_data", data3);
                redis.LPush("sensors_data", data4);

                System.Threading.Thread.Sleep(500);

            }
            
        }

        
        
        static string ToJSON(int id) => "{\n" + "\"id\": " + id + ",";

        [Obsolete]
        public static string GetConfig()
        {
            string idbus = ConfigurationManager.AppSettings["idbus"];
            return idbus;
        }
    }
}
