using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using CSRedis;

namespace DataSender
{
    class Program
    {
        static void Main(string[] args)
        {
            // configure Redis
            var redis = new RedisClient("127.0.0.1");

            while (true)
            {
                //Console.WriteLine(redis.BLPop(30, "sensors_data"));

                if (CheckForConnection())
                {
                    // send value to remote API
                    var data = redis.BLPop(30, "sensors_data");
                }

                // TODO...

                //System.Threading.Thread.Sleep(1000);//1 sec ma non funziona per l'overflow
            }
        }
        public static bool CheckForConnection()
        {
            var ip = "54.171.94.37"; //ip ec2
            try
            {
                using (var client = new WebClient())
                using (client.OpenRead("http://"+ip+"/api/ping"))
                {
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

    }
}
