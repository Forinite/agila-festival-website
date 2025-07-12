import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { feedFilterBtnList } from "@/app/constants/feedInfo";
interface FeedItem {
  title: string;
  desc: string;
  image: StaticImageData;
  tags: string[];
}

const Feed: React.FC<{ feedInfo: FeedItem }> = ({ feedInfo }) => {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all h-full">
      <div className="aspect-auto relative">
        <Image
          src={feedInfo.image}
          alt={feedInfo.title}
          className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
          width={600}
          height={400}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-bold text-lg mb-1">{feedInfo.title}</h3>
          <p className="text-sm opacity-90 mb-2">{feedInfo.desc}</p>
          <div className="flex flex-wrap gap-2">
            {feedInfo.tags.map((tag) => (
              <span
                key={`${feedInfo.title}-${tag}`}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-red-500 text-white"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MediaFeedProps {
  initialItems: FeedItem[];
  currentFilter?: string;
}

async function FilterForm({ currentFilter = 'All' }: { currentFilter?: string }) {
  async function handleFilter(formData: FormData) {
    'use server';
    const filter = formData.get('filter') as string;
    revalidatePath('/');
    return filter;
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      <form action={handleFilter}>
        <input type="hidden" name="filter" value="All" />
        <button
          type="submit"
          className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${currentFilter === 'All' ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
        >
          All Moments
        </button>
      </form>

      {feedFilterBtnList.map((filter) => (
        <form key={filter} action={handleFilter}>
          <input type="hidden" name="filter" value={filter} />
          <button
            type="submit"
            className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${currentFilter === filter ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
          >
            #{filter}
          </button>
        </form>
      ))}
    </div>
  );
}

export default async function MediaFeed({ searchParams }: { searchParams: { filter?: string } }) {
  const currentFilter = searchParams.filter || 'All';
  const items = await getFilteredMedia(currentFilter);

  return (
    <section id="media" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
            Cultural <span className="text-red-500">Highlights</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the vibrant moments, traditional dances, colorful parades, and cultural celebrations that make Ijega Festival unforgettable
          </p>
        </div>

        <FilterForm currentFilter={currentFilter} />

        <div className="masonry-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} className="masonry-item break-inside-avoid group cursor-pointer mb-4">
              <Feed feedInfo={item} />
            </div>
          ))}
        </div>

        {items.length > 8 && (
          <div className="text-center mt-12">
            <button className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-colors">
              Load More Moments
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

