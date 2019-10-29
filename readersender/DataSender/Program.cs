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
        static async Task Main(string[] args)
        {
            // configure Redis
            var redis = new RedisClient("127.0.0.1");

            var config = GetConfig();
            var dns = config[0]; //dns pubblico statico ec2
            var port = config[1];
            string token = "";
            string id = "{ " + "\"id\": " + config[2] + "}";




            while (true)
            {

                //SAMPLE DI CONNESSIONE PER INVIO DATI POST

                if (CheckForConnection(dns))
                {

                    if (token == "")
                    {
                        token = GetTokenfromAPI(id);
                        Console.WriteLine(token);
                    }


                    //autenticazione e connessione macchina
                    var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://" + dns + "/api");
                    httpWebRequest.PreAuthenticate = true;
                    httpWebRequest.Headers.Add("Authorization", "Bearer " + token);
                    httpWebRequest.Accept = "application/json";
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Method = "POST";


                    // send value to remote API
                    var data = redis.BRPop(0, "sensors_data");

                    //flusso
                    var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream());

                    streamWriter.Write(data);
                    Console.WriteLine(data);
                    streamWriter.Flush();
                    streamWriter.Close();


                    var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                    {
                        var result = streamReader.ReadToEnd();
                        Console.WriteLine(result);
                    }

                }

                System.Threading.Thread.Sleep(4000);//4 sec
            }


        }
    

       

        public static bool CheckForConnection(string dns)
        {
            //Console.WriteLine("http://" + dns + "/api/ping");
            var request = (HttpWebRequest)WebRequest.Create("http://" + dns + "/api/ping");
            request.Method = "GET";
            var response = (HttpWebResponse)request.GetResponse();

            ;
            if((int)response.StatusCode == 204)
            {
                return true;
            }
            else
            {
                Console.WriteLine("Accesso Negato");
                return false;
            }




            /*
            try
            {
                using (var client = new WebClient())
                using (client.OpenRead(dns+"/api/ping")) //richiamare api ping
                {
                    Console.WriteLine("Accesso");
                    return true;
                }
            }
            catch
            {
                Console.WriteLine("Accesso Negato");
                return false;
            }
            */
        }


        [Obsolete]
        public static string[] GetConfig()
        {
            string dns = ConfigurationManager.AppSettings["dns"];
            string port = ConfigurationManager.AppSettings["port"];
            string idbus = ConfigurationManager.AppSettings["idbus"];
            string[] config = {dns, port, idbus };// indici: 0=dns, 1=port, 2=idbus
            return config;
        }


        public static string GetTokenfromAPI(string data)
        {
            string token="";
            string [] splittedToken;
            var config = GetConfig();
            var dns = config[0]; //dns pubblico statico ec2

                //autenticazione e connessione macchina
                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://" + dns + "/api/gettoken");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

                //flusso
                var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream());

                streamWriter.Write(data);
                streamWriter.Flush();
                streamWriter.Close();

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    token = result;
                    splittedToken = token.Split('"');
                }

            return splittedToken[3];
        }
}
}
