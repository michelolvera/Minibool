import type { Context } from "@netlify/functions"
const mysql = require('mysql2/promise');

let connection = await mysql.createConnection({
    host     : '104.154.253.39',
    user     : 'root',
    password : '_4.6!(bIEgB%Sk7',
    database : 'anonymous'
});
export default async (req: Request, context: Context) => {
    let [rows, fields] = await connection.query("SELECT count(*) as suma from notificaciones;")

    return Response.json({count: rows[0].suma})
}