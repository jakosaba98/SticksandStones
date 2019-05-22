using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
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
        [Obsolete]
        static void Main(string[] args)
        {
            // configure Redis
            var redis = new RedisClient("127.0.0.1");

            var config= GetConfig();
            var dns = config[0]; //dns pubblico statico ec2
            var port = config[1];

            //autenticazione e connessione macchina
            

            while (true)
            {

                //SAMPLE DI CONNESSIONE PER INVIO DATI POST
                
                if (CheckForConnection(dns))
                {
                    var httpWebRequest = (HttpWebRequest)WebRequest.Create(dns+"/api");
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Method = "POST";

                    // send value to remote API
                    var data = redis.BLPop(30, "sensors_data"); //dentro per non perdere i dati
                    
                    //flusso
                    using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                    {
                        streamWriter.Write(data);
                        Console.WriteLine(data);
                        //streamWriter.Flush();
                        //streamWriter.Close();
                    }

                   /*
                    var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                    {
                      var result = streamReader.ReadToEnd();
                        Console.WriteLine(result);
                    }
                    */
                }

                //System.Threading.Thread.Sleep(1000);//1 sec ma non funziona per l'overflow
            }
            

        }

       

        public static bool CheckForConnection(string dns)
        {
            try
            {
                using (var client = new WebClient())
                using (client.OpenRead(dns+"/api/ping")) //richiamare api ping
                {
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        [Obsolete]
        public static string[] GetConfig()
        {
            string dns = ConfigurationManager.AppSettings["dns"];
            string port = ConfigurationManager.AppSettings["port"];
            string[] config = {dns, port };
            return config;
        }

    }
}
