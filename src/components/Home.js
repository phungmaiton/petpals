import Banner from "./Banner";
import PageTransition from "./PageTransition";
export default function Home() {
  return (
    <PageTransition>
      <div>
        <Banner />
      </div>
    </PageTransition>
  );
}
