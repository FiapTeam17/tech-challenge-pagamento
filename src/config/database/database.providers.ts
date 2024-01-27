import { DataSource } from 'typeorm';
import {DATA_SOURCE} from "../../common/constants";

const db_port: number | undefined = parseInt(process.env.DB_PORT || "27017");
export const databaseProviders = [
    {
        provide: DATA_SOURCE,
        useFactory: async () => {
            const ambiente = process.env.NODE_ENV?.toUpperCase().trim();
            let dataSource: DataSource;
            if(ambiente === "TEST"){
                dataSource = new DataSource({
                    type: 'better-sqlite3',
                    database: ':memory:',
                    entities: [
                        __dirname + '/../../**/*.model{.ts,.js}',
                    ],
                    dropSchema: true,
                    synchronize: true,
                });
            }else{
                dataSource = new DataSource({
                    type: 'mongodb',
                    url: process.env.MONGODB_CONNECTION_STRING || "mongodb://127.0.0.1:27017",
                    database: process.env.DB_SCHEMA || "sgr_database_pagamento",
                    entities: [
                        __dirname + '/../../**/*.model{.ts,.js}',
                    ],
                    dropSchema: true,
                    synchronize: true,
                });
            }
            return dataSource.initialize();
        },
    },
];
