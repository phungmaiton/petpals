import PageTransition from "./PageTransition";
import Pagination from "./Pagination";
import MeetupItems from "./MeetupItems";
import BarLoader from "react-spinners/BarLoader";
import { useState } from "react";

export default function Meetups({ meetups, isLoading, user, pets, onLogin }) {
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
      <section className="pt-[150px] pb-[20px] lg:pt-[150px] lg:pb-[50px] bg-blue relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div>
            <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3">
              Explore Meetups
            </h1>
          </div>
        </div>
      </section>
      <section className="py-[5%] lg:py-[3%] relative overflow-hidden">
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
