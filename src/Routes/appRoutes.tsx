//frontend routes
import { Routes, Route, } from 'react-router-dom';
import Home from '../Home/Home';
import ConfirmEmail from '../Pages/ConfirmEmail';
import Confirmed from '../Pages/Confirmed';
import ResetPassword from '../Pages/ResetPassword';
import PaintByNumbers from '../Products/Paintings/PaintByNumbers';
import CheckoutPage from "../Components/CheckoutPage";
//import PlainLayout from '../Layouts/PlainLayout';

const appRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/confirm" element={<ConfirmEmail />} />
    <Route path="/confirmed" element={<Confirmed />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/products/paintings/paintByNumbers" element={<PaintByNumbers />} />
    <Route path="/checkout" element={<CheckoutPage />} />
  </Routes>
);

export default appRoutes;
