import Banner from "./Banner";
import PageTransition from "./PageTransition";
import MeetupItems from "./MeetupItems";
import BarLoader from "react-spinners/BarLoader";
import { useState } from "react";

export default function Home() {
  return (
    <PageTransition>
      <div>
        <Banner />
      </div>
      <section className="pt-[120px] pb-[80px] lg:pt-[180px] lg:pb-[100px] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="column-div"></div>
        </div>
      </section>
    </PageTransition>
  );
}
