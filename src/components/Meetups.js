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
                  src="https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*"
                  alt="..."
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
                  src="https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"
                  className="card-img"
                  alt="..."
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
                  src="https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*"
                  className="card-img"
                  alt="..."
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
