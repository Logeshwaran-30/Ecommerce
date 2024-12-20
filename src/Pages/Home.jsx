import Navbar from "../components/Navbar";
import Banner1 from "../components/Banner1";
import Footer from "../components/Footer";
import Banner2 from "../components/Banner2";
import Categorycard from "../components/Categorycard";
import ScrollToTopButton from "../components/ScrollToTopButon";

const Home = () => {
  return (
    <div>
        <Navbar className="mb-8" /> {/* Margin bottom for Navbar */}
        <Banner1 className="mb-8" /> {/* Margin bottom for Banner1 */}
    
        <div className="flex flex-col items-center my-8">
          <h1 className="text-3xl font-bold text-center mb-4">Shop By Category</h1>
          <Categorycard />
        </div>
        <Banner2 className="mb-8" /> {/* Margin bottom for Banner2 */}
        <ScrollToTopButton />
        <Footer className="mt-8" /> {/* Margin top for Footer */}
    </div>
  );
}

export default Home;
