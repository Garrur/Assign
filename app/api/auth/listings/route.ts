import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { type, name, description, address, city, country, facilities, images, vendorId } = data;

    // Validate required fields
    if (!type || !name || !description || !address || !city || !country || !vendorId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create new listing
    const newListing = await prisma.listing.create({
      data: {
        type,
        name,
        description,
        address,
        city,
        country,
        facilities,
        images,
        vendorId, // Vendor who created the listing
      },
    });

    return NextResponse.json({ message: "Listing added successfully", listing: newListing }, { status: 201 });
  } catch (error) {
    console.error("Error adding listing:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
