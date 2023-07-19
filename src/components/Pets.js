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
      <section className="pt-[120px] pb-[80px] lg:pt-[180px] lg:pb-[100px] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="column-div">
            {isLoading ? (
              <BarLoader color="#87AF73" />
            ) : (
              currentPosts().map((pet) => (
                <PetItems
                  key={pet.id}
                  name={pet.name}
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
