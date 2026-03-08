import { getHeroes } from "@/services";
import {
    Hero,
    Hotels,
    AccommodationTypes,
    Features,
    CallToAction,
} from "./components";

export const dynamic = "force-dynamic";

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
