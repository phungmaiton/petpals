import PageTransition from "./PageTransition";

export default function Dashboard({ user }) {
  return (
    <PageTransition>
      {user && (
        <>
          <section className="pt-[150px] pb-[20px] lg:pt-[130px] lg:pb-[30px] bg-blue relative overflow-hidden">
            <div className="container mx-auto px-10">
              <div>
                <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3">
                  Hi, {user.username} 👋
                </h1>
              </div>
            </div>
          </section>
          <section className="py-[5%] lg:py-[3%] relative overflow-hidden">
            <div className="container mx-auto px-10">
              <div className="container mx-auto px-10">
                <div className="grid lg:grid-cols-12 grid-cols-1 items-top">
                  <div className="lg:col-span-8 text-left mb-[50px] lg:mb-0">
                    <h2>Personal Information</h2>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Password: ***</p>
                  </div>
                  <div className="lg:col-span-4 text-right mb-[50px] lg:mb-0 lg:ml-[10%] flex justify-end items-top">
                    <div className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square dashboard-icon"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      <p>Edit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-[5%] lg:py-[3%] relative overflow-hidden bg-blue">
            <div className="container mx-auto px-10">
              <div className="container mx-auto px-10">
                <div className="grid lg:grid-cols-12 grid-cols-1 items-top">
                  <div className="lg:col-span-8 text-left mb-[50px] lg:mb-0">
                    <h2>Your Pets</h2>
                    <p>You currently have no pets</p>
                  </div>
                  <div className="lg:col-span-4 text-right mb-[50px] lg:mb-0 lg:ml-[10%] flex justify-end items-top">
                    <div className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square dashboard-icon"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      <p>Edit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </PageTransition>
  );
}
