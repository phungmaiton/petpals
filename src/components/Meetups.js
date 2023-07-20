import PageTransition from "./PageTransition";
import Pagination from "./Pagination";
import MeetupItems from "./MeetupItems";
import BarLoader from "react-spinners/BarLoader";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Meetups({ meetups, isLoading, user, pets, onLogin }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const sorted_meetup = meetups.sort((a, b) => a.date - b.date);

  const currentPosts = () => {
    return sorted_meetup.slice(indexOfFirstPost, indexOfLastPost);
  };

  return (
    <PageTransition>
      <section className="pt-[150px] pb-[20px] lg:pt-[150px] lg:pb-[50px] bg-blue relative overflow-hidden">
        <div className="container mx-auto px-10">
//<<<<<<< katherine
//           <div>
//             <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3 flex items-center justify-center">
//               Explore Meetups
//             </h1>
//             <h4 className="text-[#424040] font-[580] text-[10px] lg:text-[20px] xl:text-[25px] leading-[1] mb-[25px] md:mb-[32px] px-3 flex items-center justify-center">
//               Click on a meetup to check out the details and sign your pet up to attend.
//             </h4>
// main=======
          <div className="grid gril-cols-2 md:grid-cols-3 items-center">
            <div className="col-span-1 md:col-span-2">
              <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3">
                Explore Meetups
              </h1>
            </div>
            <div className="col-span-1 flex justify-end">
              {user && (
                <NavLink to={"/add-meetup"} className="px-btn px-btn-theme">
                  Add Meetup
                </NavLink>
              )}
            </div>
//>>>>>>> main
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
