import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Profile from './pages/Profile'; // นำเข้า Profile
import Notification from './pages/Notification'; // นำเข้า Notification

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:shopId" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} /> {/* เพิ่ม route สำหรับ Profile */}
          <Route path="/notifications" element={<Notification />} /> {/* เพิ่ม route สำหรับ Notification */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
