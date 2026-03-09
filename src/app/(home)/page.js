import { getHeroes, getHotels , getAccommodationTypes } from "@/services";
import {
    Hero,
    Hotels,
    Features,
    AccommodationTypes,
    CallToAction,
} from "./components";

export const dynamic = "force-dynamic";

export default async function Home() {
    const heroes = await getHeroes();
    const accommodationTypes = await getAccommodationTypes();
    const hotels = await getHotels();
    return (
        <>
            <Hero data={heroes} />
            <Hotels data={hotels}/>
            <Features />
            <AccommodationTypes data={accommodationTypes} />
            <CallToAction />
        </>
    );
}
