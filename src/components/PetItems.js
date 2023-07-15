export default function PetItems() {
  return (
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
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" className="px-btn px-btn-theme">
          Go somewhere
        </a>
      </div>
    </div>
  );
}
