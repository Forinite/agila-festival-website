import Hero from "@/app/components/Hero";
import {heroImages} from "@/app/constants";
import HeroInfo from "@/app/components/ui/heroInfo";
import React from "react";

const HomePage = () => {
    return (
        <section id="home w-screen">
            <HeroInfo />
            <Hero
                imageList={heroImages}
                title=""
            />

        </section>
    )
}

export default HomePage
