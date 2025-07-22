'use client'
import React, {useEffect} from 'react'
import {heroImages} from "@/app/constants";
import Image, {StaticImageData} from "next/image";
import HeroInfo from "@/app/components/ui/heroInfo";



const Hero: React.FC<{
    imageList: StaticImageData[];
    title: string;
}> = ({ imageList, title }) => {
    const [currentBgImageIndex, setCurrentBgIndex] = React.useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentBgIndex(prevIndex => (prevIndex + 1) % imageList.length);
        }, 4000);

        // Clean up the interval when component unmounts
        return () => clearInterval(intervalId);
    }, [imageList.length]);

    return (
        <div className="relative top-0 left-0 w-screen h-[100vh] overflow-hidden">
            <div className="w-full h-full relative">
                <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center">
                    {imageList.map((image: StaticImageData, index: number) => (
                        <Image
                            key={index}
                            src={image}
                            alt="Hero Background"
                            fill
                            priority
                            className={`heroImage_${index} object-cover absolute w-full h-full ${index === currentBgImageIndex ? 'opacity-100' : 'opacity-0'} transition-all duration-500`}
                        />
                    ))}
                    <div className="mb-8 relative z-10 flex gap-3 ">
                        {imageList.map((image: StaticImageData, index: number) => (
                            <div
                                key={`imageCir${index}`}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentBgImageIndex ? 'bg-white scale-125' : 'bg-white/50'} cursor-pointer hover:scale-110`}
                                onClick={() => setCurrentBgIndex(index)}
                                role="button"
                                aria-label={`Show image ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 transition-all duration-500 ease-in-out group-hover:to-black/80" />
                </div>
            </div>
            {/*<h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-2xl lg:text-5xl uppercase tracking-tight font-bold text-white">*/}
            {/*    {title}*/}
            {/*</h1>*/}
        </div>
    )
};

