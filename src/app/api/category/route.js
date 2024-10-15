import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const [rows] = await db.execute("SELECT * FROM category");
        console.log("=====rows=====>", rows);
        return NextResponse.json({ data: rows }, { status: 200 });
    } catch (error) {
        console.log("error in category api call", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}