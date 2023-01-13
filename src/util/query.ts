import mysql from 'mysql2/promise'
import EnvNotFoundError from '../error/EnvNotFoundError'

if (!process.env.host || !process.env.port || !process.env.user || !process.env.password || !process.env.database) {
  throw new EnvNotFoundError()
}

const connection = await mysql.createConnection({
  host: process.env.host,
  port: +process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
})

export default async function query(q: string) {
  const [result] = await connection.query(q)
  return result
}

// connection.end같은건 하지 않는다! 무한히 반복될것이다
