import PetItems from "./PetItems";
import PageTransition from "./PageTransition";
import Pagination from "./Pagination";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";

export default function Pets({ pets, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const currentPosts = () => {
    return pets.slice(indexOfFirstPost, indexOfLastPost);
  };

  return (
    <PageTransition>
      <section className="pt-[150px] pb-[20px] lg:pt-[150px] lg:pb-[50px] bg-blue relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div>
            <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3 flex items-center justify-center">
              Meet New Friends
            </h1>
            <h4 className="text-[#424040] font-[580] text-[10px] sm:text-[16px] md:text-[18px] lg:text-[22px] xl:text-[25px] leading-[1] mb-[25px] md:mb-[32px] px-3 flex items-center justify-center">
              Click on a profile to view more information about a pet and send their human a meetup request.
            </h4>
          </div>
        </div>
      </section>
      <section className="py-[5%] lg:py-[3%] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="column-div">
            {isLoading ? (
              <BarLoader color="#87AF73" />
            ) : (
              currentPosts().map((pet) => (
                <PetItems
                  key={pet.id}
                  id={pet.id}
                  name={pet.name}
                  birthYear={pet.birth_year}
                  species={pet.species}
                  breed={pet.breed}
                  profilePic={pet.profile_pic}
                  city={pet.city}
                  state={pet.state}
                  country={pet.country}
                  availability={pet.availability}
                />
              ))
            )}
          </div>
          <Pagination
            paginate={paginate}
            array={pets}
            postsPerPage={postsPerPage}
          />
        </div>
      </section>
    </PageTransition>
  );
}
