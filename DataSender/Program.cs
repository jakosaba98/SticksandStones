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
                // read from Redis queue
                Console.WriteLine(redis.BLPop(30, "sensors_data"));

                if (CheckForInternetConnection())
                {
                    // send value to remote API
                }

                // TODO...
                //System.Threading.Thread.Sleep(1000);//1 sec ma non funziona per l'overflow
            }
        }
        public static bool CheckForInternetConnection()
        {
            try
            {
                using (var client = new WebClient())
                using (client.OpenRead("http://clients3.google.com/generate_204"))
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
