import type { Context } from "@netlify/functions"
import mysql from 'mysql2/promise'

export default async (req: Request, context: Context) => {
    let connection = await mysql.createConnection({
        host     : '104.154.253.39',
        user     : 'root',
        password : '_4.6!(bIEgB%Sk7',
        database : 'anonymous'
    });

    let [rows, fields] = await connection.query("SELECT count(*) as suma from notificaciones;")
    await connection.end()
    return Response.json({count: rows[0].suma})
}