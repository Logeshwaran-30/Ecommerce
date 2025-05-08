import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  SfButton,
  SfRating,
  SfCounter,
  SfLink,
  SfIconShoppingCart,
} from "@storefront-ui/react";
 
const Menuitems = () => {
  const { category } = useParams(); // Get category from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };
 
    fetchProducts();
  }, []);
 
  const getCategoryProducts = () => {
    if (!category) return products;
    if (category === "mens-clothing") return products.filter((p) => p.category === "men's clothing");
    if (category === "womens-clothing") return products.filter((p) => p.category === "women's clothing");
    if (category === "electronics") return products.filter((p) => p.category === "electronics");
    if (category === "jewellery") return products.filter((p) => p.category === "jewelery");
    return [];
  };
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
 
  return (
    <div>
     <h1 className="text-4xl font-bold mb-10 -mt-16 ml-8">Products in {category.replace("-", " ")}:</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 ml-8">
        {getCategoryProducts().map((product) => (
          <div
            key={product.id}
            className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]"
          >
            <div className="relative">
              <SfLink href="#" className="block">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover h-auto rounded-md aspect-square"
                  width="300"
                  height="300"
                />
              </SfLink>
        
            </div>
            <div className="p-4 border-t border-neutral-200">
              <SfLink href="#" variant="secondary" className="no-underline">
                {product.title}
              </SfLink>
              <div className="flex items-center pt-1">
                <SfRating size="xs" value={Math.floor(product.rating?.rate || 0)} max={5} />
                <SfLink href="#" variant="secondary" className="pl-1 no-underline">
                  <SfCounter size="xs">{product.rating?.count || 0}</SfCounter>
                </SfLink>
              </div>
              <p className="block py-2 font-normal typography-text-sm text-neutral-700">
                {product.description.slice(0, 50)}...
              </p>
              <span className="block pb-2 font-bold typography-text-lg">
                ${product.price.toFixed(2)}
              </span>
              <SfButton size="sm" slotPrefix={<SfIconShoppingCart size="sm" />}>
                Add to cart
              </SfButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Menuitems;