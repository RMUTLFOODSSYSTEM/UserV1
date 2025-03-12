import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // CSS
// ไม่ต้อง import Navbar ที่นี่

const shops = [
  { id: 1, name: "ร้านเส้น" },
  { id: 2, name: "ร้านอาหารตามสั่ง1" },
  { id: 3, name: "ร้านไก่ Lover" },
  { id: 4, name: "ร้านลุงกับป้าตามสั่ง" },
];

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">เลือกร้านค้า</h1>
      <div className="shops-list">
        {shops.map((shop) => (
          <Link key={shop.id} to={`/menu/${shop.id}`} className="shop-link">
            {shop.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
