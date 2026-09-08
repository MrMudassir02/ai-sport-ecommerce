import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    const Products = await Product.find();
    return Response.json(Products);
  } catch (error) {
    console.error("PRODUCTS API ERROR:", error); // add this
    return Response.json(
      { message: "Failed to fetch products", error: error.message }, // expose error.message temporarily
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const product = await Product.create(body);
    return Response.json(product, {
      status: 201,
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to create product",
      },
      {
        status: 500,
      }
    );
  }
}
