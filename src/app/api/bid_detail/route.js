import db from "@/utils/db";
import { NextResponse } from "next/server";
import cors from "@/lib/cors";

export async function POST(req) {
  // Handle CORS
  const corsHeaders = cors(req);

  // If it's an OPTIONS request, return early
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  let connection;
  try {
    // Extract form data
    const formData = await req.formData();
    const bidAuctId = formData.get('bidAuctId');
    const bidLotId = formData.get('bidLotId');
    const bidOwnerId = formData.get('bidOwnerId');
    const bidBidderHandle = formData.get('bidBidderHandle');
    const bidAmt = formData.get('bidAmt');
    const bidDate = formData.get('bidDate');
    const isBooked = formData.get('isBooked');
    const nextBidAmt = formData.get('nextBidAmt');

    // Start a database transaction
    connection = await db.getConnection();
    await connection.beginTransaction();

    // Check if the bidder already exists in `bid_detail` for the given auction, lot, and bidder handle
    // const [existingBidDetail] = await connection.execute(
    //   'SELECT * FROM `bid_detail` WHERE `bid_auct_id` = ? AND `bid_lot_id` = ? AND `bid_bidder_handle` = ?', 
    //   [bidAuctId, bidLotId, bidBidderHandle]
    // );

    let insertedBidId;

    // if (existingBidDetail.length > 0) {
    //   // If the bidder exists in bid_detail
    //   await connection.execute(
    //     'UPDATE `bid_detail` SET `bid_amt` = ?, `bid_date` = ?, `is_booked` = ? WHERE `bid_auct_id` = ? AND `bid_lot_id` = ? AND `bid_bidder_handle` = ?', 
    //     [bidAmt, bidDate, isBooked, bidAuctId, bidLotId, bidBidderHandle]
    //   );
    //   insertedBidId = existingBidDetail[0].bid_id;  // Use the existing bid_id
    //   console.log("=====result===update===bid_detail====>");
    // } 
    // else {
      const [result] = await connection.execute(
        'INSERT INTO `bid_detail`(`bid_auct_id`, `bid_lot_id`, `bid_owner_id`, `bid_bidder_handle`, `bid_amt`, `bid_date`, `is_booked`) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [bidAuctId, bidLotId, bidOwnerId, bidBidderHandle, bidAmt, bidDate, isBooked]
      );
      insertedBidId = result.insertId;  // Get the auto-incremented `bid_id` from bid_detail
      console.log("=====result===insert===bid_detail====>");
    // }

    // Check if the bidder already exists in `bid_display` for the given auction, lot, and bidder handle
    const [existingBidDisplay] = await connection.execute(
      'SELECT * FROM `bid_display` WHERE `bd_lot_id` = ?', 
      [bidLotId]
    );

    if (existingBidDisplay.length > 0) {
      // If the handle exists
      await connection.execute(
        'UPDATE `bid_display` SET `bd_current_bid` = ?, `bd_next_bid` = ? WHERE `bd_lot_id` = ? ', 
        [bidAmt, Number(bidAmt) + Number(nextBidAmt), bidLotId]
      );
      console.log("=====result===update===bid_display====>");
    } else {
      // If the handle does not exist
      const bidDisplayValues = [
        bidLotId,           
        insertedBidId,      
        bidBidderHandle,    
        bidAmt,            
        Number(bidAmt) + Number(nextBidAmt) 
      ];

      await connection.execute(
        'INSERT INTO `bid_display`(`bd_lot_id`, `bd_bid_id`, `bd_handle`, `bd_current_bid`, `bd_next_bid`) VALUES (?, ?, ?, ?, ?)', 
        bidDisplayValues
      );
      console.log("=====result===insert===bid_display====>");
    }

    // Commit the transaction
    await connection.commit();
    connection.release();

    return NextResponse.json({ data: "Bid Successfully Done" }, { status: 200 });

  } catch (error) {
    console.log("error in bid detail api", error);

    if (connection) {
      await connection.rollback(); 
      connection.release();
    }

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
