import AddMeetUpForm from "./AddMeetUpForm";
import PageTransition from "./PageTransition";

export default function AddMeetUp({
  user,
  onMeetupAdded,
  meetups,
  onUserChange,
}) {
  return (
    <PageTransition>
      {user && (
        <>
          <section className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[100px] bg-blue relative overflow-hidden">
            <AddMeetUpForm
              user={user}
              onMeetupAdded={onMeetupAdded}
              meetups={meetups}
              onUserChange={onUserChange}
            />
          </section>
        </>
      )}
    </PageTransition>
  );
}
