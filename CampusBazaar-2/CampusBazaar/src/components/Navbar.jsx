import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCommentDots, FaHeart, FaUserCircle, FaShoppingCart, FaSearch } from 'react-icons/fa';

export default function Navbar({ setshowSearch, showSearch, isAuthenticated, onLogout, cartItems = [], cartPulse = false, favoriteIds = [], notification = 'No notifications', onToggleFavorite, onSetNotification, searchTerm = '', onSearchTermChange }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userName, setUserName] = useState('Campus Student');
  const [userPhone, setUserPhone] = useState('+977 9800000000');
  const [userEmail, setUserEmail] = useState('student@campusbazaar.com');

  useEffect(() => {
    const name = localStorage.getItem('campusBazaarName') || 'Campus Student';
    const phone = localStorage.getItem('campusBazaarPhone') || '+977 9800000000';
    const email = localStorage.getItem('campusBazaarEmail') || 'student@campusbazaar.com';
    setUserName(name);
    setUserPhone(phone);
    setUserEmail(email);
  }, [isAuthenticated]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (!isAuthenticated) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="ani text-3xl font-bold text-[#4CBB17] ">
            <span className='CB'>C</span>ampus<span className=' text-[#48872B]'>Bazaar</span>
          </h1>

          <div className="hidden md:flex gap-8 font-medium ">
            <ul className="flex gap-8 ml-24"></ul>
          </div>

          <div className="bt flex items-center gap-10">
            <button className="bg-[#4CBB17] hover:bg-[#48872B] text-white px-5 py-2 rounded-lg">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-[#DDEBDC] px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-[180px]">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-[#4CBB17]">Campus</span><span className="text-[#48872B]">Bazaar</span>
          </span>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xl">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#48872B]">
              <FaSearch size={16} />
            </span>
            <input
              type="text"
              placeholder="Search for products…"
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-[#B8D8AF] bg-[#F8FBF6] outline-none focus:ring-2 focus:ring-[#4CBB17]"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button onClick={() => setShowNotifications((value) => !value)} aria-label="Notifications" className="text-[#39542C] hover:text-[#4CBB17]">
              <FaCommentDots size={23} />
            </button>
            {showNotifications && (
              <div className="absolute top-10 right-0 w-64 p-3 rounded-xl border border-[#DDEBDC] bg-white shadow-xl z-50">
                <p className="text-sm font-bold text-[#293325]">Notifications</p>
                <p className="text-xs text-[#39542C] mt-2">{notification}</p>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setShowFavorites((value) => !value)} aria-label="Favorites" className="text-[#39542C] hover:text-[#4CBB17]">
              <FaHeart size={22} />
            </button>
            {showFavorites && (
              <div className="absolute top-10 right-0 w-72 p-3 rounded-xl border border-[#DDEBDC] bg-white shadow-xl z-50">
                <p className="text-sm font-bold text-[#293325]">Favourites</p>
                {favoriteIds.length === 0 ? (
                  <p className="text-xs text-[#39542C] mt-2">No favourites yet</p>
                ) : (
                  <ul className="mt-2 space-y-2">
                    {favoriteIds.map((id) => (
                      <li key={id} className="text-xs text-[#39542C]">Product #{id}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setShowProfile((value) => !value)} aria-label="Profile" className="text-[#39542C] hover:text-[#4CBB17]">
              <FaUserCircle size={24} />
            </button>
            {showProfile && (
              <div className="absolute top-10 right-0 w-72 p-4 rounded-xl border border-[#DDEBDC] bg-white shadow-xl z-50">
                <div className="flex items-center gap-3">
                  <div className="bg-[#EEF9EA] p-3 rounded-full">
                    <FaUserCircle size={30} className="text-[#4CBB17]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#293325]">{userName}</p>
                    <p className="text-xs text-[#39542C]">{userEmail}</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-[#DDEBDC] pt-4">
                  <p className="text-sm text-[#39542C] font-semibold">Phone: {userPhone}</p>
                  <p className="text-sm text-[#39542C] font-semibold mt-2">Name: {userName}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/cart" aria-label="Cart" className={`relative text-[#39542C] hover:text-[#4CBB17] ${cartPulse ? 'cart-bump' : ''}`}>
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4CBB17] text-white rounded-full text-[10px] px-2 py-1 border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <button onClick={onLogout} className="bg-[#39542C] hover:bg-[#48872B] text-white px-4 py-2 rounded-lg text-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}