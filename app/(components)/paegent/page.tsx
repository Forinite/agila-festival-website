import QueenCard from "@/app/components/ui/queenCard";
import PaegentApplicationSection from "@/app/components/PaegentApplicationSection";
import { getQueens, Queen } from "@/app/libs/queries/getQueens";
import React from "react";
import Image from "next/image";

const PaegentPage = async () => {
    let currentQueen = null;
    let pastQueens: Queen[] = [];

    try {
        const queensData = await getQueens();
        currentQueen = queensData.currentQueen || null;
        pastQueens = queensData.pastQueens || [];
    } catch (error) {
        console.error("Failed to fetch queens:", error);
    }

    return (
        <section id="pageant" className={`mt-16`}>
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                    Past <span className="text-red-500">Leadership</span>
                </h2>
                <p className="md:text-lg text-sm text-gray-600 max-w-3xl mx-auto">
                    Two days of cultural celebration, traditional performances, and community festivities. December
                    27–28, 2024
                </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12 commonPadding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="inline-block mb-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                            CURRENT LEADER {currentQueen?.year || "2XXX"} - Till Date
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            {currentQueen?.name || "Leader's Name"}
                        </h3>
                    </div>
                    <div className="order-1 lg:order-2">
                        <Image
                            src={currentQueen?.imageUrl ?? '/NOIMAGE.png'}
                            alt={`Chairman ${currentQueen?.year ?? "unknown"} - till date`}
                            width={800}
                            height={600}
                            className="rounded-2xl shadow-xl w-full h-auto"
                        />
                    </div>
                </div>

                <div className="mt-24">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                        Past Leaders
                    </h3>
                    {pastQueens.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pastQueens.map((queen, index) => (
                                <QueenCard
                                    key={queen.year + '-' + index}
                                    name={queen.name}
                                    year={queen.year}
                                    role={queen.role}
                                    imageUrl={queen.imageUrl ?? '/NOIMAGE.png'}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-red-500 text-center">Information not available.</p>
                    )}
                </div>

                <div className="mt-12">
                    <PaegentApplicationSection year={currentQueen?.year} />
                </div>
            </div>
        </section>
    );
};

export default PaegentPage;
