import React from "react";
import Navbar from './Navbar';
import Footer from './Footer';

const Cart = ({ cartItems = [], removeFromCart, updateCartQuantity, onCheckout, notification, setNotification, isAuthenticated, onLogout, cartPulse, favoriteIds }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#F7F9F1]">
      <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} cartItems={cartItems} cartPulse={cartPulse} favoriteIds={favoriteIds} notification={notification} />

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-[#DDEBDC] my-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#293325]">🛒 My Cart</h1>
          <span className="text-sm font-bold text-[#39542C]">{notification}</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-center text-[#39542C] text-lg">
              Your cart is empty.
            </p>
            <button onClick={() => setNotification('No notifications')} className="mt-5 bg-[#4CBB17] text-white px-5 py-2 rounded-full hover:bg-[#48872B]">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:justify-between md:items-center border-b py-6 border-[#DDEBDC] gap-5"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg border border-[#DDEBDC] object-cover"
                  />

                  <div>
                    <h2 className="text-xl font-semibold text-[#293325]">
                      {item.name}
                    </h2>

                    <p className="text-[#39542C]">
                      Category: {item.category}
                    </p>

                    <p className="text-[#39542C]">
                      Listed by: {item.sellerName || 'CampusBazaar Seller'}
                    </p>

                    <p className="text-[#39542C]">
                      Number: {item.sellerPhone || 'Not available'}
                    </p>

                    <p className="font-medium text-[#48872B]">
                      Price: Rs. {item.price}
                    </p>

                    <div className="mt-3">
                      <span className="text-sm font-bold text-[#39542C]">Quantity: {item.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-[#293325]">
                    Rs. {item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 bg-[#39542C] text-white px-4 py-2 rounded hover:bg-[#48872B]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <h2 className="text-2xl font-bold text-[#293325]">
                Total: Rs. {total}
              </h2>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;