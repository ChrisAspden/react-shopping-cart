//frontend routes
import { Routes, Route, } from 'react-router-dom';
import Home from '../Home/Home';
import ConfirmEmail from '../Pages/ConfirmEmail';
import Confirmed from '../Pages/Confirmed';

const appRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/confirm" element={<ConfirmEmail />} />
    <Route path="/confirmed" element={<Confirmed />} />
    {/* Add more routes here */}
     {/*Catch-all route to redirect to confirm page */}
  </Routes>
);

export default appRoutes;
