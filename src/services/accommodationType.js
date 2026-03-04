import fetcher from "@/lib/fetcher ";

export async function getAccommodationTypes() {
    try {
        const { accommodationTypes } = await fetcher("accommodation-types");
        return accommodationTypes;
    } catch (error) {
        console.log(error);
    }
}
