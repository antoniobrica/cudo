// import { NODE_ENV, MONGO_URL, MONGO_PORT, MONGO_DB } from '@environments'

const orm = {
	development: {
		type: process.env.DATABASE_TYPE,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME
	},
	testing: {
		url: process.env.DATABASE_HOST
	},
	staging: {
		host: 'localhost',
		port: process.env.DATABASE_PORT,
		username: '',
		password: '',
		database: process.env.DATABASE_NAME
	},
	production: {
		url: process.env.DATABASE_HOST
	}
}

export default orm[process.env.NODE_ENV]
