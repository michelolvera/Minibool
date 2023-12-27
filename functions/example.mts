import type { Context } from "@netlify/functions"
import mysql from "mysql2/promise";

export default async (req: Request, context: Context) => {
    return Response.json({data: "example"})
}