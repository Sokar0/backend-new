import { DataSourceOptions  } from "typeorm";
import { User } from '../../entities/User.js';


const postgresDataSourceOptions: DataSourceOptions  = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
entities: [
  User
],
  //logging: true,
  synchronize: true,
};

console.log("postgresDataSourceOptions >>> ")
console.log(postgresDataSourceOptions);

export default postgresDataSourceOptions;