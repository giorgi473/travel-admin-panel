"use server";

type FormData = {
  title: { en: string; ka: string };
  image: string;
  description: { en: string; ka: string };
  duration: { en: string; ka: string };
  activities: { en: string; ka: string };
  currency: { en: string; ka: string };
  popularTours?: Array<{
    title: { en: string; ka: string };
    image: string;
    mapLink: string;
    description: { en: string; ka: string };
  }>;
};

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function createTour(data: FormData): Promise<ApiResponse> {
  try {
    // უზრუნველყოფს, რომ popularTours ყოველთვის მოცემული იყოს (ნაგულისხმევად ცარიელი)
    const payload = { ...data, popularTours: data.popularTours || [] };

    const response = await fetch(
      "https://nest-travel-api.vercel.app/api/v1/tours",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("[v0] Tour created successfully:", result);

    return { success: true, data: result };
  } catch (error) {
    console.error("[v0] Error creating tour:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getTours(): Promise<ApiResponse<any[]>> {
  try {
    const response = await fetch(
      "https://nest-travel-api.vercel.app/api/v1/tours",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("[v0] Error fetching tours:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateTour(
  id: string,
  data: Partial<FormData>
): Promise<ApiResponse> {
  try {
    // უზრუნველყოფს, რომ popularTours ყოველთვის მოცემული იყოს (ნაგულისხმევად ცარიელი)
    const payload = { ...data, popularTours: data.popularTours || [] };

    const response = await fetch(
      `https://nest-travel-api.vercel.app/api/v1/tours/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("[v0] Tour updated successfully:", result);

    return { success: true, data: result };
  } catch (error) {
    console.error("[v0] Error updating tour:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteTour(id: string): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `https://nest-travel-api.vercel.app/api/v1/tours/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("[v0] Tour deleted successfully");
    return { success: true };
  } catch (error) {
    console.error("[v0] Error deleting tour:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
