import { Injectable, Logger } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import {
	getMetadataArgsStorage,
	createConnection,
	getConnection
} from 'typeorm'

import config from '../../config.orm'
import { environment } from '../../environments/environment'
// import { logger } from '../../common'

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
		const options = {
			...config,
			entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
			migrations: ["src/app/migration/**/*.ts"],
			subscribers: ["src/app/subscriber/**/*.ts"],
			cli: {
				entitiesDir: "src/app/entity",
				migrationsDir: "src/app/migration",
				subscribersDir: "src/app/subscriber"
			},
			synchronize: true,
			autoLoadEntities: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			keepConnectionAlive: true,
			logging: true,
			retryAttempts: environment.DATABASE_RETRY_ATTEMPTS,
			retryDelay: environment.DATABASE_RETRY_DELAY
		}
		return options
	}
}
