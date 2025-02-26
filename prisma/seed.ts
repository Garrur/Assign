import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create test users
  const customerPassword = await hash("Password@2025", 12)
  const vendorPassword = await hash("Password@2025", 12)
  const adminPassword = await hash("Password@2025", 12)

  const customer = await prisma.user.upsert({
    where: { email: "customer@hotelbooking.com" },
    update: {},
    create: {
      email: "customer@hotelbooking.com",
      name: "Test Customer",
      password: customerPassword,
      role: "CUSTOMER",
    },
  })

  const vendor = await prisma.user.upsert({
    where: { email: "vendor@hotelbooking.com" },
    update: {},
    create: {
      email: "vendor@hotelbooking.com",
      name: "Test Vendor",
      password: vendorPassword,
      role: "VENDOR",
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: "admin@hotelbooking.com" },
    update: {},
    create: {
      email: "admin@hotelbooking.com",
      name: "Test Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  })

  // Create sample listings
  const hotel = await prisma.listing.create({
    data: {
      type: "HOTEL",
      name: "Luxury Hotel & Spa",
      description: "A luxurious 5-star hotel with amazing amenities",
      address: "123 Luxury Street",
      city: "New York",
      country: "USA",
      facilities: ["WiFi", "Pool", "Spa", "Gym"],
      images: ["/placeholder.svg"],
      rating: 4.5,
      vendor: {
        connect: { id: vendor.id },
      },
    },
  })

  const restaurant = await prisma.listing.create({
    data: {
      type: "RESTAURANT",
      name: "Fine Dining Restaurant",
      description: "Experience the finest cuisine in town",
      address: "456 Gourmet Avenue",
      city: "New York",
      country: "USA",
      facilities: ["Parking", "Outdoor Seating", "Bar"],
      images: ["/placeholder.svg"],
      rating: 4.8,
      vendor: {
        connect: { id: vendor.id },
      },
    },
  })

  // Create sample units
  await prisma.unit.createMany({
    data: [
      {
        name: "Deluxe Room 101",
        description: "Spacious room with king bed",
        capacity: 2,
        price: 299.99,
        listingId: hotel.id,
      },
      {
        name: "Table 1",
        description: "Window side table for 4",
        capacity: 4,
        price: 0,
        listingId: restaurant.id,
      },
    ],
  })

  console.log("Seed data created successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

