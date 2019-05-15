using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
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
                    var data = redis.BLPop(30, "sensors_data"); //dentro per non perdere i dati


                    //SAMPLE DI CONNESSIONE PER INVIO DATI POST
                    //POI SPOSTIAMO I SETTAGGI FUORI DAL CICLO

                    var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://54.171.94.37::porta");
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Method = "POST";

                    using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                    {
                        string json = ; //decidere se passare "data" interamente e poi sezionare i dati alla fine 

                        streamWriter.Write(json);
                        streamWriter.Flush();
                        streamWriter.Close();
                    }

                    var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                    {
                        var result = streamReader.ReadToEnd();
                    }



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
                using (client.OpenRead("http://"+ip+"/api/ping")) //richiamare api ping
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
