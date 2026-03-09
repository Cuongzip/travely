import { getHeroes, getAccommodationTypes } from "@/services";
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
    return (
        <>
            <Hero data={heroes} />
            <Hotels />
            <Features />
            <AccommodationTypes data={accommodationTypes} />
            <CallToAction />
        </>
    );
}
