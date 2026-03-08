import { getHeroes } from "@/services";
import {
    Hero,
    Hotels,
    Features,
    AccommodationTypes,
    CallToAction,
} from "./components";
export default async function Home() {
    const heroes = await getHeroes();
    return (
        <>
            <Hero data={heroes} />
            <Hotels />
            <Features />
            <AccommodationTypes />
            <CallToAction />
        </>
    );
}
