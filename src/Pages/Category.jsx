import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const Category = () => {
  return (
    <div>
      <Navbar />

      <div className="mx-6 my-5 ">
        <div className="flex flex-col ml-3"> {/* Using flex-col to stack breadcrumbs and h1 vertically */}
          <Breadcrumbs />
        </div>
      </div>      
      <div className="flex max-w-screen-xl mx-auto p-2">
        {/* Right Side: ProductCard */}
        <div className="flex-1 ml-4 mt-10">
          <ProductCard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;
