import Banner from "./Banner";
import PageTransition from "./PageTransition";
import MeetupItems from "./MeetupItems";
import BarLoader from "react-spinners/BarLoader";
import { useState } from "react";

export default function Home({ isLoading, meetups }) {
  return (
    <PageTransition>
      <div>
        <Banner />
      </div>
      <section className="pt-[50px] pb-[50px] lg:pt-[50px] lg:pb-[50px] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="column-div">
            {isLoading ? (
              <BarLoader color="#87AF73" />
            ) : (
              meetups.map((meetup) => (
                <MeetupItems
                  key={meetup.id}
                  title={meetup.title}
                  details={meetup.details}
                  image={meetup.image}
                  id={meetup.id}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
