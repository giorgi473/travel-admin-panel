"use server";

// In-memory storage for attractions
const attractions: any[] = [];
let nextId = 1;

export async function createAttraction(data: any) {
  const newAttraction = {
    id: nextId++,
    ...data,
  };
  attractions.push(newAttraction);
  return { success: true, data: newAttraction };
}

export async function getAllAttractions() {
  return attractions;
}

export async function deleteAttraction(id: number) {
  const index = attractions.findIndex((a) => a.id === id);
  if (index !== -1) {
    attractions.splice(index, 1);
    return { success: true };
  }
  return { success: false, error: "Attraction not found" };
}

export async function updateAttraction(id: number, data: any) {
  const index = attractions.findIndex((a) => a.id === id);
  if (index !== -1) {
    attractions[index] = { ...attractions[index], ...data };
    return { success: true, data: attractions[index] };
  }
  return { success: false, error: "Attraction not found" };
}
