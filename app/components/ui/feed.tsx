import React, { useState, useEffect } from 'react';
import {FeedType} from "@/app/(components)/mediafeed/page";
import VideoPlayer from "@/app/components/ui/videoPlayer";


const FeedCard: React.FC<{ feedInfo }> = ({ feedInfo }) => {
    console.log(feedInfo.media)
    if (feedInfo.isVideo ){
        return (

            <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all h-full ">

                <VideoPlayer src={feedInfo.media}  className="w-full min-h-[200px] flex items-center justify-center transition-transform duration-300 col-span-2"
                />
            </div>
        )
    } else {
        return (
            <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all h-full">

                <div>
                    <img
                        src={feedInfo.media}
                        alt={feedInfo.title}
                        width={400}
                        height={600}
                        className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="font-bold text-lg mb-1">{feedInfo.title}</h3>
                            <p className="text-sm opacity-90 mb-2">{feedInfo.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {feedInfo.category.map((category) => (
                                    <span
                                        key={`${feedInfo.title}-${category}`}
                                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-red-500 text-white"
                                    >
                                    #{category}
                                  </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

};
export default FeedCard
