import type { Context } from "@netlify/functions"
import mysql from 'mysql2/promise'

export default async (req: Request, context: Context) => {
    let connection = await mysql.createConnection({
        host     : '104.154.253.39',
        user     : 'root',
        password : '_4.6!(bIEgB%Sk7',
        database : 'anonymous'
    });
    let [rows, fields] = await connection.query("SELECT CONCAT(U.nombre, ' ', U.apellido_paterno) AS 'nombre_completo', SUM(E.puntos) AS total FROM ejercicio_usuario as EU INNER JOIN usuarios as U ON EU.id_usuario=U.id_usuario INNER JOIN ejercicios AS E ON EU.id_ejercicio= E.id_ejercicio WHERE EU.correcto=1 GROUP BY U.usuario ORDER BY SUM(E.puntos) DESC LIMIT 100")
    await connection.end()
    return Response.json(rows)
}