import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        // const { searchParams } = new URL(req.url);
        // const lotId = searchParams.get('lotId');
        // const bdHandle = searchParams.get('bdHandle');

        // if (!lotId || !bdHandle) {
        //     return NextResponse.json({ error: 'lotId and bdHandle are required' }, { status: 400 });
        // }

        // const [result] = await db.execute("SELECT * FROM `bid_display` WHERE bd_lot_id = ? AND bd_handle = ?", [lotId, bdHandle]);

        const [result] = await db.execute("SELECT * FROM `bid_display`");


        return NextResponse.json({data: result}, {status: 200});
    } catch (error) {
        console.error('Error fetching bid details:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
