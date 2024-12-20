import{BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home.jsx'
import Category from "./Pages/Category.jsx"
import './style.css'
import Productdetails from "./Pages/Productdetails.jsx"
import Cart from "./Pages/Cart.jsx"
import Orderconfirmation from "./Pages/Orderconfirmation.jsx"
import { CartProvider } from "./CartContext.jsx"
import Catergorydetails from "./Pages/Categorydetails.jsx"
import Addtocart from "./Pages/Addtocart.jsx"

function App() {
  return (
 <CartProvider>
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/category" element={<Category />} />
 <Route path="/Productdetails/:id" element={<Productdetails/>} />
 <Route path="/addtocart/:id" element={<Cart/>} />
 <Route path="/orderconfirmation" element={<Orderconfirmation/>} />
 <Route path="/category/:category" element={<Catergorydetails />} />
 <Route path='/addtocart' element={<Addtocart />} />
 </Routes>
 </BrowserRouter>
 </CartProvider>
  )
}

export default App