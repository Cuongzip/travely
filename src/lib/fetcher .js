const baseUrl = process.env.HOST;

export default async function fetcher(endpoint, options = {}) {
    const res = await fetch(`${baseUrl}/api/${endpoint}`, options);

    if (!res.ok) {
        throw new Error("api error");
    }

    return res.json();
}
