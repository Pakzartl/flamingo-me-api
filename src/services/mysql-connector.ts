import { createPool, Pool } from "mysql2";

let pool: Pool;

export const init = async () => {
  try {
    pool = createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "3306"),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
  } catch (err: any) {
    throw new Error(err);
  }
}

export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results: any) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('failed to execute MySQL query');
  }
}