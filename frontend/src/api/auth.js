import client from "./client";


export async function register(email, username, password) {
    const { data } = await client.post("/auth/register", { email, username, password });
    return data;
}

export async function login(email, password) {
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);

    const { data } = await client.post("auth/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return data;
}

export async function getMe() {
    const { data } = await client.get("/auth/me");
    return data;
}