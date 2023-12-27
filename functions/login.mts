import type { Context } from "@netlify/functions"
import {constants} from "node:http2";
import mysql from 'mysql2/promise'

export default async (req: Request, context: Context) => {
    let request_data = await req.json()

    let connection = await mysql.createConnection({
        host     : '104.154.253.39',
        user     : 'root',
        password : '_4.6!(bIEgB%Sk7',
        database : 'anonymous'
    });
    let [rows, fields] = await connection.query("CALL sp_validar_usuario('"+request_data['user']+"','"+request_data['password']+"');")
    await connection.end()

    if (rows[0][0].Login != 1){
        return new Response(null, {status: constants.HTTP_STATUS_BAD_REQUEST})
    }

    return new Response(null, {status: constants.HTTP_STATUS_NO_CONTENT})
}