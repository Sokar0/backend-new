import { Destructor, Initializer, Service } from '@fastify-decorators/simple-di';
import { DataSource } from 'typeorm';
import postgresDataSourceOptions from './pgDatabasesConfig.js';

@Service()
export class PostgresDataSourceProvider {
    private _dataSource = new DataSource(postgresDataSourceOptions);

    public get dataSource(): DataSource {
        return this._dataSource;
    }

    @Initializer()
    async init(): Promise<void> {
        await this._dataSource.initialize();
        console.log("PosgtreSQL Datasource was initialized successfully!")
    }

    @Destructor()
    async destroy(): Promise<void> {
        await this._dataSource.destroy();
        console.log("PosgtreSQL Datasource was destryed successfully!")
    }
}