import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:8000/api/v1/sliders";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang");

    const url = lang ? `${BACKEND_URL}?lang=${lang}` : BACKEND_URL;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json(
      { error: "მონაცემების ჩატვირთვა ვერ მოხერხდა" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("🎯 Next.js API Route: POST /api/sliders");

    const body = await request.json();
    console.log("📦 Body received:", {
      hasSrc: !!body.src,
      srcLength: body.src?.length,
      title: body.title,
    });

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("📥 Backend response status:", response.status);

    const responseText = await response.text();
    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }

    if (!response.ok) {
      console.error("❌ Backend error:", data);
      return NextResponse.json(data, { status: response.status });
    }

    console.log("✅ Success");
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("❌ POST Error:", error);
    return NextResponse.json(
      { error: "სლაიდერის შენახვა ვერ მოხერხდა" },
      { status: 500 }
    );
  }
}
