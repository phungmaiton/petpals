import PetItems from "./PetItems";
import PageTransition from "./PageTransition";
import Pagination from "./Pagination";
import { useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { NavLink} from "react-router-dom";

export default function Pets({ pets, isLoading, user }) {
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
          <div className="grid gril-cols-2 md:grid-cols-3 items-center">
            <div className="col-span-1 md:col-span-2">
              <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3">
                Meet New Friends
              </h1>
            </div>
            <div className="col-span-1 flex justify-end">
              {user && (
                <NavLink to={"/add-pet"} className="px-btn px-btn-theme">
                  Add Pet
                </NavLink>
              )}
            </div>
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
