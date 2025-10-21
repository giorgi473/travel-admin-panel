"use server";

const API_URL = "https://nest-travel-api.vercel.app/api/v1/sliders";

interface SlideData {
  src: string;
  title: {
    en: string;
    ka: string;
  };
  description: {
    en: string;
    ka: string;
  };
}

interface ApiResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

export async function createSlide(data: SlideData): Promise<ApiResponse> {
  try {
    console.log("=== 🚀 Server Action Start ===");
    console.log("📦 Data validation:");
    console.log("- Has src:", !!data.src);
    console.log("- Src length:", data.src?.length);
    console.log(
      "- Src starts with data:image:",
      data.src?.startsWith("data:image/")
    );
    console.log("- Title EN:", data.title.en);
    console.log("- Title KA:", data.title.ka);
    console.log("- Description EN:", data.description.en || "(empty)");
    console.log("- Description KA:", data.description.ka || "(empty)");

    // Validation
    if (!data.src || !data.title?.en || !data.title?.ka) {
      const error = "აუცილებელი ველები: src, title.en, title.ka";
      console.error("❌ Validation failed:", error);
      return {
        success: false,
        error,
      };
    }

    if (!data.src.startsWith("data:image/")) {
      const error = "სურათის ფორმატი არასწორია";
      console.error("❌ Invalid format:", data.src.substring(0, 50));
      return {
        success: false,
        error,
      };
    }

    console.log("✅ Validation passed");
    console.log("📡 Sending POST request to:", API_URL);
    console.log("📦 Payload:", {
      src: data.src.substring(0, 50) + "...",
      title: data.title,
      description: data.description,
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("📥 Response status:", response.status);
    console.log("📥 Response statusText:", response.statusText);
    console.log("📥 Response ok:", response.ok);
    console.log(
      "📥 Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    const responseText = await response.text();
    console.log("📥 Response text length:", responseText.length);
    console.log("📥 Response text:", responseText.substring(0, 500));

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
        console.error("❌ Parsed API Error:", errorData);
      } catch (parseError) {
        console.error("❌ Failed to parse error response:", parseError);
        errorData = { message: responseText };
      }

      return {
        success: false,
        error:
          errorData.message ||
          errorData.error ||
          `სერვერის შეცდომა: ${response.status}`,
      };
    }

    let result;
    try {
      result = JSON.parse(responseText);
      console.log("✅ Parsed success result:", result);
    } catch (parseError) {
      console.warn(
        "⚠️ Failed to parse success response, using text:",
        parseError
      );
      result = responseText;
    }

    console.log("=== ✨ Server Action END (SUCCESS) ===");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("❌ Catch Error:", error);
    console.error(
      "❌ Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : "დაფიქსირდა შეცდომა",
    };
  }
}

export async function getAllSlides(lang?: "ka" | "en"): Promise<ApiResponse> {
  "use server";

  try {
    const url = lang ? `${API_URL}?lang=${lang}` : API_URL;
    console.log("📡 GET All Slides:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    console.log("📥 GET Response:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ GET Error:", errorData);
      return {
        success: false,
        error: errorData.message || "მონაცემების ჩატვირთვა ვერ მოხერხდა",
      };
    }

    const data = await response.json();
    console.log(
      "✅ GET Success, items:",
      Array.isArray(data) ? data.length : "Not array"
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("❌ GET Catch Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "დაფიქსირდა შეცდომა",
    };
  }
}

export async function getSlideById(
  id: number,
  lang?: "ka" | "en"
): Promise<ApiResponse> {
  "use server";

  try {
    const url = lang ? `${API_URL}/${id}?lang=${lang}` : `${API_URL}/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "სლაიდი ვერ მოიძებნა",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "დაფიქსირდა შეცდომა",
    };
  }
}

export async function updateSlide(
  id: number,
  data: Partial<SlideData>
): Promise<ApiResponse> {
  "use server";

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "განახლება ვერ მოხერხდა",
      };
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "დაფიქსირდა შეცდომა",
    };
  }
}

export async function deleteSlide(id: number): Promise<ApiResponse> {
  "use server";

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "წაშლა ვერ მოხერხდა",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "დაფიქსირდა შეცდომა",
    };
  }
}

export async function getSlidesCount(): Promise<ApiResponse> {
  "use server";

  try {
    const response = await fetch(`${API_URL}/count`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "რაოდენობის ჩატვირთვა ვერ მოხერხდა",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "დაფიქსირდა შეცდომა",
    };
  }
}
