import PageTransition from "./PageTransition";
import Pagination from "./Pagination";
import MeetupItems from "./MeetupItems";

export default function Meetups({ meetups }) {
  return (
    <PageTransition>
      <section className="pt-[120px] pb-[80px] lg:pt-[180px] lg:pb-[100px] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="column-div">
            {meetups.map((meetup) => (
              <MeetupItems
                key={meetup.id}
                title={meetup.title}
                details={meetup.details}
                image={meetup.image}
              />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
