import mysql from 'mysql2/promise'
import EnvNotFoundError from '../error/EnvNotFoundError'

if (!process.env.host || !process.env.port || !process.env.user || !process.env.password || !process.env.database) {
  throw new EnvNotFoundError()
}

const pool = mysql.createPool({
  host: process.env.host,
  port: +process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
})

export default async function query(q: string) {
  const connection = await pool.getConnection()
  const [result] = await connection.query(q)
  connection.release()
  return result
}
