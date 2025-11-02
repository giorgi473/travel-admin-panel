import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate the data structure
    if (!data.title || !data.title.en || !data.title.ka) {
      return NextResponse.json({ error: "Invalid tour data" }, { status: 400 });
    }

    const response = await fetch(
      "https://nest-travel-api.vercel.app/api/v1/tours",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[v0] External API error:", errorData);
      throw new Error(`External API error: ${response.status}`);
    }

    const savedTour = await response.json();
    console.log("[v0] Tour saved to external API:", savedTour);

    return NextResponse.json(savedTour, { status: 201 });
  } catch (error) {
    console.error("[v0] Error saving tour:", error);
    return NextResponse.json({ error: "Failed to save tour" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await fetch(
      "https://nest-travel-api.vercel.app/api/v1/tours",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("[v0] External API fetch error:", response.status);
      throw new Error(`External API error: ${response.status}`);
    }

    const tours = await response.json();
    console.log("[v0] Tours fetched from external API:", tours);

    return NextResponse.json(tours, { status: 200 });
  } catch (error) {
    console.error("[v0] Error fetching tours:", error);
    return NextResponse.json(
      { error: "Failed to fetch tours" },
      { status: 500 }
    );
  }
}
