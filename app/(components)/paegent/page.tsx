import React from 'react'

import Image from "next/image";
import {pastQueensData} from "@/app/constants/pastQueens";
import QueenCard from "@/app/components/ui/queenCard";
import PaegentApplicationSection from "@/app/components/PaegentApplicationSection";
import {paegentQueenImgList} from "@/app/constants";

const PaegentPage = () => {
    return (
        <section id={'pageant'} className={`mt-16`}>
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                    Face of <span className="text-red-500">Idoma</span>
                </h2>
                <p className="md:text-lg text-sm text-gray-600 max-w-3xl mx-auto">
                    Six days of cultural celebration, traditional performances, and community festivities. December
                    23-26, 2024
                </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12 commonPadding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <div
                            className="items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm inline-block mb-4">
                            CURRENT QUEEN 2023
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Adaobi Blessing Enechojo
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed italic">
                            "As Face of Idoma 2023, I am committed to promoting our rich cultural heritage while
                            empowering young women across Idoma Land. My mission is to bridge tradition with modernity,
                            ensuring our customs remain relevant for future generations."
                        </p>
                        <div className="space-y-3">
                            <div>
                                <span className="font-bold text-gray-900">Education:</span>
                                <span className="text-gray-600 ml-2">Mass Communication, University of Abuja</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-900">Initiative:</span>
                                <span className="text-gray-600 ml-2">" Idoma Girl Child Education Project "</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-900">Tenure:</span>
                                <span className="text-gray-600 ml-2">December 2023 - December 2024</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <Image
                            src={paegentQueenImgList[2]}
                            alt="Face of Idoma 2023 winner"
                            width={800}
                            height={600}
                            className="rounded-2xl shadow-xl w-full h-auto"
                        />
                    </div>
                </div>

                <div className="mt-24">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                        Past Queens
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pastQueensData.map((queen, index) => (
                            <QueenCard
                                key={queen.year}
                                name={queen.name}
                                year={queen.year}
                                role={queen.role}
                                imageUrl={queen.imageUrl}
                            />
                        ))}
                    </div>
                </div>

                <div className={'mt-12'}>
                    <PaegentApplicationSection />
                </div>

            </div>
        </section>
    )
}
export default PaegentPage
