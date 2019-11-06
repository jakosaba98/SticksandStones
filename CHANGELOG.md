# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- PSQL tables with hours of service
- Upgraded HTTP into HTTPS and WS into WSS

### Changed
- Bug solve in movements in C#

## 2019-11-05
### Added
- Websocket implementation for get real time position of the bus

### Changed

# 2019-10-29
### Added
- Error pages
- 4 different buses ("Treviso", "Padova", "Verona", "Vicenza")
- Current state of doors (open or closed) and number of passengers

### Changed
- Front-end Javascript for login and registration
- More accuracy in movement C#

# 2019-10-27
### Added
- Home Page and relative HTML pages
- Real-time update of bus position in map

### Changed
- Javascript for login and registration
- More accuracy in movement C#

# 2019-10-27
### Added
- Home Page and relative HTML pages
- Real-time update of bus position in map

### Changed
- Javascript for login and registration



## 2019-06-04
### Added
- Error Handling with sending custom error pages (only on non-API requests)

### Changed

## 2019-06-03
### Added
- JWT token for API post calls
- Web Page for login and registration

### Changed
- Sessions are now controlled with [fastify-session](https://github.com/SerayaEryn/fastify-session) plugin


## 2019-05-29
### Added
- API for login, session manager in fastify
- Postgres database for users

### Changed


## 2019-05-22
### Added
- Configuration file outside code

### Changed
- Updated README.md (using a [sample](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2))
