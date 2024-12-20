import Breadcrumbs from "../components/Breadcrumbs";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ScrollToTopButton from "../components/ScrollToTopButon";

const Category = () => {
  return (
    <div>
      <Navbar />

      <div className="mx-6 my-5 ">
        <div className="flex flex-col ml-3"> {/* Using flex-col to stack breadcrumbs and h1 vertically */}
          <Breadcrumbs />
          <h1 className="text-4xl font-bold mt-6 ml-3">All Products</h1> {/* Added mt-4 to add space */}
        </div>
      </div>
        
      <div className="flex max-w-screen-xl mx-auto p-2">
        {/* Left Side: Filters */}
        <div className="w-1.5/4 ml-2 mt-[-2px]"> {/* Adjusted mt-4 to move it up */}
          <Filters />
        </div>

        {/* Right Side: ProductCard */}
        <div className="flex-1 ml-4 mt-10">
          <ProductCard />
        </div>
      </div>
     <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Category;
