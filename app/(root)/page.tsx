import Hero from "@/components/Hero";

import { NewsLetter } from "@/components/NewsLetter";
import Partnership from "@/components/Partnership";
import Services from "@/components/Services";
import Vision from "@/components/Vision";

const HomePage = () => {
  return (
    <>
      <section className="bg-APP_ASH dark:bg-transparent">
        
        <div className="border-b">
          <Hero />
        </div>
      </section>

      <Vision />

      <div className="bg-APP_ASH dark:bg-transparent border-y">
        <Services />
      </div>

      <div className="dark:bg-transparent">
        <Partnership />
      </div>

      <div className="bg-APP_ASH dark:bg-transparent border-t-1 border-t">
        <NewsLetter />
      </div>
    </>
  );
};

export default HomePage;
