import type { Context } from "@netlify/functions"
import mysql from "mysql2/promise";

export default async (req: Request, context: Context) => {
    let connection = await mysql.createConnection({
        host     : '104.154.253.39',
        user     : 'root',
        password : '_4.6!(bIEgB%Sk7',
        database : 'anonymous'
    });

    await connection.end()

    return Response.json({data: "example"})
}