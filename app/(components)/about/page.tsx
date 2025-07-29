import React from 'react';
import Image from 'next/image';
import {heroImages} from "@/app/constants";

const AboutPage = () => {
    return (
        <section id="about" className={'py-16 mt-20'}>
            <div className=" commonPadding grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
                        About <span className="text-red-500">Ech’ija Carnival</span>
                    </h2>
                    <div className="px-4 py-12 max-w-3xl mx-auto text-gray-800">


                        <p className="mb-6 leading-relaxed text-base sm:text-lg">
                            <strong>Ech’ija</strong>—which means “<em>Day of Play</em>” in the Idoma language—is a vibrant cultural
                            festival held annually in Otukpo, Benue State, Nigeria. Rooted in tradition and brimming with
                            modern energy, the festival brings together Idoma sons and daughters from across the world to
                            honor their shared heritage through music, dance, masquerades, food, art, and community celebration.
                        </p>

                        <h3 className="text-xl sm:text-2xl font-semibold mb-2">🎉 Our Story</h3>
                        <p className="mb-6 leading-relaxed text-base sm:text-lg">
                            The idea for Ech’ija was first conceived in 2005, but it wasn’t until 2019 that the dream became
                            a reality. Driven by a collective of passionate Idoma youths—most notably Amedu Davinci Iklaga—
                            the festival was founded as a platform to reconnect young people with their roots while showcasing
                            the beauty, wisdom, and creativity of Idoma culture.
                        </p>

                        <p className="mb-6 leading-relaxed text-base sm:text-lg">
                            Since its launch, Ech’ija has grown into a powerful movement of cultural revival, social unity, and
                            creative empowerment, attracting thousands of participants and spectators from across Nigeria and beyond.
                        </p>

                        <h3 className="text-xl sm:text-2xl font-semibold mb-2">🌍 Our Vision</h3>
                        <p className="leading-relaxed text-base sm:text-lg">
                            To preserve, promote, and reimagine Idoma culture for future generations while using arts and tradition
                            to drive social connection, youth engagement, and economic growth.
                        </p>
                    </div>


                    {/*<p className="md:text-lg text-gray-600 mb-6 leading-relaxed">*/}
                    {/*    The Agila Social and Economic Carnival is the flagship cultural event of the Idoma people, held annually in Otukpo, the traditional and political capital of Idoma Land, Benue State, Nigeria.*/}
                    {/*</p>*/}
                    {/*<p className="md:text-lg text-gray-600 mb-8 leading-relaxed">*/}
                    {/*    Named after the Agila people, this carnival has grown beyond its origins to become a celebration of Idoma unity, fostering cultural heritage preservation while promoting social and economic development across the region.*/}
                    {/*</p>*/}
                    {/*<div className="space-y-4">*/}
                    {/*    <div className="flex items-start space-x-4">*/}
                    {/*        <div className="bg-red-500 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>*/}
                    {/*        <div>*/}
                    {/*            <h3 className="font-bold text-gray-900 mb-1">Cultural Heritage</h3>*/}
                    {/*            <p className="text-gray-600">Promoting and preserving Idoma traditional values, customs, and practices</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="flex items-start space-x-4">*/}
                    {/*        <div className="bg-red-500 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>*/}
                    {/*        <div>*/}
                    {/*            <h3 className="font-bold text-gray-900 mb-1">Unity & Development</h3>*/}
                    {/*            <p className="text-gray-600">Uniting Idoma people across Nigeria and the diaspora for collective progress</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="flex items-start space-x-4">*/}
                    {/*        <div className="bg-red-500 w-3 h-3 rounded-full mt-2 flex-shrink-0"></div>*/}
                    {/*        <div>*/}
                    {/*            <h3 className="font-bold text-gray-900 mb-1">Tourism & Talent</h3>*/}
                    {/*            <p className="text-gray-600">Creating platforms for tourism, local talent showcasing, and economic empowerment</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="relative">
                    <Image
                        src={heroImages[0]}
                        alt="Idoma cultural heritage and traditions"
                        width={800}
                        height={600}
                        className="rounded-2xl shadow-xl w-full h-auto"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent rounded-2xl"></div>
                </div>
            </div>
        </section>

    );
};

export default AboutPage;