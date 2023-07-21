import AddPetForm from "./AddPetForm";
import PageTransition from "./PageTransition";

export default function AddPet({ user, onPetChange }) {
  return (
    <PageTransition>
      {user && (
        <>
          <section className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[100px] bg-blue relative overflow-hidden">
            <AddPetForm user={user} onPetChange={onPetChange} />
          </section>
        </>
      )}
    </PageTransition>
  );
}
