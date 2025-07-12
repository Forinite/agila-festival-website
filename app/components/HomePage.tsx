import React from 'react';
import MediaFeed from './MediaFeed';
import { heroImages } from '@/app/constants';
import Hero from "@/app/components/Hero";

export default function HomePage({ searchParams }: { searchParams: { filter?: string } }) {
  return (
    <>
      <Hero
        imageList={heroImages}
        title="Ijega Festival"
      />
      <MediaFeed searchParams={searchParams} />
    </>
  );
}
