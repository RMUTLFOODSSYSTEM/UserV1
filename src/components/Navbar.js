import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { cartStore } from "../store/cartstore.js"; // นำเข้า cartStore เพื่อใช้งาน
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    // ฟังก์ชันที่เชื่อมต่อกับ onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // ถ้ามี user อัปเดตสถานะ user
        cartStore.clearCart(); // ล้างตะกร้าทุกครั้งที่ผู้ใช้ล็อกอินใหม่
      } else {
        setUser(null); // ถ้าไม่มี user ลบสถานะ user
      }
    });

    // เชื่อมต่อกับ Firebase Realtime Database เพื่อตรวจสอบ Notifications
    if (user) {
      const db = getDatabase();
      const notificationsRef = ref(db, 'notifications/' + user.uid);
      onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val();
        setNotifications(data ? Object.keys(data).length : 0);
      });
    }

    return () => unsubscribe(); // cleanup เมื่อใช้ useEffect

  }, [user]); // ตรวจสอบเฉพาะเมื่อ `user` เปลี่ยนแปลง

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth); // ล็อกเอาท์ผู้ใช้
    setUser(null); // ลบข้อมูลผู้ใช้ใน state
    navigate("/login"); // ไปที่หน้า login
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-link">User Dashboard</Link>
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" className="navbar-link">Home</Link>
        
        {user ? (
          <>
            <Link to="/cart" className="navbar-link">Cart</Link>
            <Link to="/profile" className="navbar-link">Profile</Link>
            <Link to="/notifications" className="navbar-link">
              Notifications
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </Link>
            <span className="navbar-user">Hello, {user.displayName || "User"}</span>
            <button onClick={handleLogout} className="navbar-link logout-btn">Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} className="navbar-link login-register-btn">Login/Register</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
