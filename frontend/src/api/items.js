import client from "./client";

export async function fetchItems() {
    const { data } = await client.get("/items/");
    return data;
}

export async function createItem(title, description = "") {
    const { data } = await client.post("/items/", { title, description });
    return data;
}

export async function updateItem(id, patch) {
    const { data } = await client.patch(`/items/${id}`, patch);
    return data;
}

export async function deleteItem(id) {
    await client.delete(`/items/${id}`);
}
