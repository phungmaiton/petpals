import PageTransition from "./PageTransition";
import Pagination from "./Pagination";
import MeetupItems from "./MeetupItems";
import BarLoader from "react-spinners/BarLoader";
import { useState } from "react";

export default function Meetups({ meetups, isLoading, user, pets }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const currentPosts = () => {
    return meetups.slice(indexOfFirstPost, indexOfLastPost);
  };

  return (
    <PageTransition>
      <section className="pt-[120px] pb-[80px] lg:pt-[180px] lg:pb-[100px] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="column-div">
            {isLoading ? (
              <BarLoader color="#87AF73" />
            ) : (
              currentPosts().map((meetup) => (
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
          <Pagination
            paginate={paginate}
            array={meetups}
            postsPerPage={postsPerPage}
          />
        </div>
      </section>
    </PageTransition>
  );
}
