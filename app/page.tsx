import HomePage from "@/app/(components)/home/page";
import AboutPage from "@/app/(components)/about/page";
import MediaFeed from "@/app/(components)/mediafeed/page";
import SchedulePage from "@/app/(components)/schedule/page";
import PaegentPage from "@/app/(components)/paegent/page";
import ContactSection from "@/app/(components)/contact/page";
import Footer from "@/app/(components)/footer/page";
import InvolvementSection from "@/app/(components)/involvement/page";


export default async function Home()
{

  // const query = (await searchParams).query;
  // const params = {search: query || null}
  // const { data: feedList }  = await sanityFetch({query: FEED_QUERY, params})

  return (
      <section className={'max-w-screen '}>

          <HomePage />;
        <MediaFeed  />;
        <AboutPage />;
        <SchedulePage />
        <PaegentPage />
        <InvolvementSection />
        <ContactSection />
        <Footer />
      </section>
  )

}
