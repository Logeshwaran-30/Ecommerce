import Cartpage from '../components/Cartpage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Backtoshopping from '../components/Backtoshopping';
import { useCart } from '../CartContext';
import ScrollToTopButton from '../components/ScrollToTopButon';

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Back to Shopping button */}
      <div className="absolute top-20 right-6 md:right-12">
        <Backtoshopping />
      </div>

     
        {/* Cart Items */}
        <div className="w-full pt-28">
  <Cartpage />
</div>


      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Footer */}
      <Footer className="mt-12" />
    </div>
  );
};

export default Cart;
