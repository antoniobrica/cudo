import { environment } from './environments/environment'

const orm = {
	development: {
		type: environment.DATABASE_TYPE,
		host: environment.DATABASE_HOST,
		port: Number(environment.DATABASE_PORT),
		username: environment.DATABASE_USERNAME,
		password: environment.DATABASE_PASSWORD,
		database: environment.DATABASE_NAME
	},
	testing: {
		url: environment.DATABASE_HOST
	},
	staging: {
		host: '192.168.0.31',
		port: environment.DATABASE_PORT,
		username: '',
		password: '',
		database: environment.DATABASE_NAME
	},
	production: {
		type: environment.DATABASE_TYPE,
		host: environment.DATABASE_HOST,
		port: Number(environment.DATABASE_PORT),
		username: environment.DATABASE_USERNAME,
		password: environment.DATABASE_PASSWORD,
		database: environment.DATABASE_NAME
	}
}

export default orm[process.env.NODE_ENV]
