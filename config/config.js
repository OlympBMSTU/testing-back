const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'testing-serv'
    },
    port: process.env.PORT || 8080,
    db: {
			username: "test",
			password: "",
			database: "test_db",
			host: "127.0.0.1",
			port: "5432",
			dialect: "postgres"
	}
  },

  test: {
    root: rootPath,
    app: {
      name: 'test-serv'
    },
    port: process.env.PORT || 8080,
	db: {
		  username: "test",
			password: "",
			database: "test_db",
			host: "127.0.0.1",
			port: "5432",
			dialect: "postgres"
	}
  },

  production: {
    root: rootPath,
    app: {
      name: 'test-serv'
    },
    port: process.env.PORT || 8080,
    db: {
			username: "test",
			password: "",
			database: "test_db",
			host: "127.0.0.1",
			port: "5432",
			dialect: "postgres"
	}
  }
};

module.exports = config[env];
