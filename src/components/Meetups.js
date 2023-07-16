import PageTransition from "./PageTransition";
import Pagination from "./Pagination";

export default function Meetups() {
  return (
    <PageTransition>
      <section className="pt-[120px] pb-[80px] lg:pt-[180px] lg:pb-[100px] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="column-div">
            {/* Remove the following 3 divs and replace with PetItems when we have data */}
            <div className="card" style={{ width: "100%" }}>
              <div className="card-img">
                <img
                  src="img/small_meeting_placeholder.png"
                  className="card-img"
                  alt="Placeholder image"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="px-btn px-btn-theme">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card" style={{ width: "100%" }}>
              <div className="card-img">
                <img
                  src="img/small_meeting_placeholder.png"
                  className="card-img"
                  alt="Placeholder image"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="px-btn px-btn-theme">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card" style={{ width: "100%" }}>
              <div className="card-img">
                <img
                  src="img/small_meeting_placeholder.png"
                  className="card-img"
                  alt="Placeholder image"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="px-btn px-btn-theme">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
