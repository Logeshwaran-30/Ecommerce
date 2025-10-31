import{BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home.jsx'
import Category from "./Pages/Category.jsx"
import './style.css'
import Productdetails from "./Pages/Productdetails.jsx"
import Cart from "./Pages/Cart.jsx"
import Orderconfirmation from "./Pages/Orderconfirmation.jsx"
import { CartProvider } from "./CartContext.jsx"
import ScrollToTop from "./components/ScrollToTopButon.jsx"

function App() {
  return (
 <CartProvider>
 <BrowserRouter>
 <ScrollToTop />
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/category" element={<Category />} />
 <Route path="/Productdetails/:id" element={<Productdetails/>} />
 <Route path="/addtocart/:id" element={<Cart/>} />
 <Route path="/orderconfirmation" element={<Orderconfirmation/>} />
 </Routes>
 </BrowserRouter>
 </CartProvider>
  )
}

export default App