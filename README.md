# SticksandStones Repo for Project Work
[Dashboard on Trello](https://trello.com/b/1Z6gDGxO/dam-ss)

Here there are all files of this project

## Getting Started
S&S is our new Start-up created to analyze and improve the company's managment and keeping customer's benefit optimal.
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- OS Android (from 4.1), iOS or Windows
- A browser (Chrome,Safari,Opera,Firefox...),
- An Internet connection
- A computer with npm & nodejs, Visual Studio Community 19 (for execute .cs files), redis, influxDB and postgres installed

If you are on windows or mac you can download npm from [https://nodejs.org/en/download/] and download Visual Studio from [https://visualstudio.microsoft.com/free-developer-offers/]

Also you can install node and npm via package manager, for more information check this article [https://nodejs.org/en/download/package-manager/]

It's easiest to install redis, influx and postgres in instances of docker, however it's possible to download from official sites:
[https://redis.io/download]
[https://portal.influxdata.com/downloads/]
[https://www.postgresql.org/download/]

### Installing

First of all clone this repository

```
git clone https://github.com/jakosaba98/SticksandStones
```

then install node_modules typing on the root of the directory

```
npm install
```
Run redis, influx and postgresql instances.

To run your webserver type inside node_server dir

```
node server.js
```

Run in Visual Studio DataReader/Program.cs, fill for a minute or so Redis stack and then run DataSender/Program.cs

Open your browser and go to http://localhost , do the login, open Mappe, choose your bus and you will see real-time* the position of selected bus

* currently C# simulate the position of every bus, the idea is to load only .cs files on a Raspberry and read data from a GPS sensor and other bus sensors

## Running the tests

We will develop an automated system for running tests

It's important to test API calls and correct insert of data

Test a connection to DB (a correct response returns code 204)
```
curl http://localhost/api/ping
```
## Deployment

We will write a guide and publish the files needed and where to save them

## Built With

* ~~[AWS](https://aws.amazon.com) Amazon EC2, Load Balancer - Server where we store data and website~~
* [Visual Studio Code](https://code.visualstudio.com/) - Framework used to write HTML, CSS, Javascript code
* [Visual Studio Community](https://visualstudio.microsoft.com/) - Framework used to write C# code
* [NodeJS](https://nodejs.org/) - Used for running local server
* [InfluxDB](https://www.influxdata.com/) - Database for storing autobus data
* [Postgres](https://www.postgresql.org/) - Database for storing users and hours
* [Redis](https://redis.io/) - Used as a database, cache and message broker

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/jakosaba98/SticksandStones/tags).

## Important Notes

We planned to use AWS instances to store the server and make it accessible everywhere, also we prepared an Android app to make easier use the program from cellular phone, nevertheless in this summer we lost our AWS volume and we couldn't restore our machine.

## Authors

* **Lorenzo Tomasello** - *Server Manager* - [SticksandStones](https://github.com/ENSOO)
* **Giacomo Saba** - *C#* - [SticksandStones](https://github.com/jakosaba98)
* **Gianluca Pistoia** - *InfluxDB, HTML & Style* - [SticksandStones](https://github.com/gianlucapistoia)
* **Pietro Wendler** - *Github & Trello Manager* - [SticksandStones](https://github.com/PietroWendler)


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://en.wikipedia.org/wiki/MIT_License) for details
