import { Pool } from "pg";

interface Database {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

const dbConfig: Database = {
  user: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  database: process.env.DB_DATABASE as string,
  password: process.env.DB_PASSWORD as string,
  port: parseInt(process.env.DB_PORT || "5432"),
};

const pool = new Pool(dbConfig);

export default pool;
