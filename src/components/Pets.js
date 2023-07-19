import PetItems from "./PetItems";
import PageTransition from "./PageTransition";
// import Pagination from "./Pagination";

export default function Pets({ pets }) {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(6);
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // const paginate = ({ selected }) => {
  //   setCurrentPage(selected + 1);
  // };
  console.log(pets)
  return (
    <PageTransition>
      <section className="pt-[120px] pb-[80px] lg:pt-[180px] lg:pb-[100px] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="column-div">
            {pets.map((pet) => (
              <PetItems
                key={pet.id}
                name={pet.name}
                profilePic={pet.profile_pic}
                city={pet.city}
                state={pet.state}
                country={pet.country}
                availability={pet.availability}
              />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
