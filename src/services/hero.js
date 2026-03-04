import fetcher from "@/lib/fetcher ";

export async function getHeroes() {
    try {
        const { heroes } = await fetcher("heroes");
        return heroes;
    } catch (error) {
        console.log(error);
    }
}
