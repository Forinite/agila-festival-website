import CategoryBtn from "@/app/components/ui/categoryBtn";
import FeedGrid from "@/app/(components)/mediafeed/MediaFeedClient";

export default function MediaFeed() {
    return (
        <section id="media" className="py-16 bg-[#defdfd]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
                        Cultural <span className="text-red-500">Highlights</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Experience the vibrant moments, traditional dances, colorful parades, and cultural celebrations that make Ijega Festival unforgettable
                    </p>
                </div>

                {/* Category buttons */}
                <CategoryBtn />

                {/* CLIENT COMPONENT BELOW */}
                <FeedGrid />
            </div>
        </section>
    );
}
