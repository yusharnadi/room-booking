# Room Booking REST API

## Installation

Use the package manager [npm](https://nodejs.org/en/download/) to package library.

```bash
npm install
```

## Setup Environment

Rename file .env.example to .env in root directory and change it base on your system config

```.env
PORT=3000
PG_USER=root
PG_PASS=secret
PG_DB=postgres
PG_HOST=localhost
PG_PORT=5432

JWT_SECRET=secretjwtfromplanet
```

Import postgres.sql file in /guide/ directory into your postgres local server

## Run Server

```bash
node app.js
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
