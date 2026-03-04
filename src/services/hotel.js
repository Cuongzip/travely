import fetcher from "@/lib/fetcher ";

export async function getHotels() {
    try {
        const { hotels } = await fetcher("hotels");
        return hotels;
    } catch (error) {
        console.log(error);
    }
}
