import type { Context } from "@netlify/functions"
import mysql from 'mysql2/promise'
import {constants} from "node:http2";

export default async (req: Request, context: Context) => {
    let connection = await mysql.createConnection({
        host     : '104.154.253.39',
        user     : 'root',
        password : '_4.6!(bIEgB%Sk7',
        database : 'anonymous'
    });
    if (req.method == constants.HTTP2_METHOD_GET){
        let [rows, fields] = await connection.query("SELECT id, notificacion, fecha, tipo FROM notificaciones;")
        await connection.end()
        return Response.json(rows)
    }
    return new Response(null, {status: constants.HTTP_STATUS_BAD_REQUEST})
}