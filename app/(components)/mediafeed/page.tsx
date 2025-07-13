import FeedCard from "@/app/components/ui/feed";
import SearchForm from "@/app/components/ui/SearchForm";
import CategoryBtn from "@/app/components/ui/categoryBtn";


//export type FeedType = Omit<Feed, "author"> & {author?: Author }

export default async function MediaFeed({feedList, query}:{
    feedList: any,
    query: string

})
{

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
                {/*<div className={`flex flex-wrap justify-center gap-3 mb-8 px-32` } >*/}
                {/*    <SearchForm query={query} />*/}
                {/*</div>*/}

                <CategoryBtn />


                {/*<section className="px-4 py-4">*/}
                {/*    <p className=" font-medium text-base lg:text-lg">*/}
                {/*        {query ?  `Search results for "${query}" `: "All Media" }*/}
                {/*    </p>*/}
                {/*</section>*/}

                <div className="masonry-grid columns-2 sm:columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
                    {feedList.map((item) => (
                        <div key={`${item.title}`} className="masonry-item break-insie-avoid group cursor-pointer mb-4">

                            <FeedCard feedInfo={item} />
                        </div>
                    ))}
                </div>

                {feedList.length > 8 && (
                    <div className="text-center mt-12">
                        <a href={'/mediapage'} className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-colors cursor-pointer">
                            Load More Moments
                        </a>
                    </div>
                )}
            </div>

        </section>
    );
}

