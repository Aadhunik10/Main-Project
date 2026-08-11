import React from 'react'
import {useState} from 'react'
import Navbar from './Navbar'
import Categories from './Categories'
import background from '../assets/back1.jpg'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'
import Why from './Why'
import Stats from './Stats'
import laptop from "../assets/laptop.jpg";
import books from "../assets/books.jpg";
import cycle from "../assets/cycle.jpg";
import geometry from "../assets/geometry.jpg";
import chair from "../assets/chair.jpg";


const Homepage = ({ isAuthenticated, onLogout, products, cartItems, favoriteIds, onAddToCart, onToggleFavorite, onCheckout, cartPulse, notification, searchTerm, onSearchTermChange, activeCategory, onCategoryChange, selectedProduct, onSelectProduct, onDeleteProduct }) => {
  const [showSearch,setshowSearch] = useState(false)
  const navigate = useNavigate();
  const currentUserEmail = typeof window !== 'undefined' ? localStorage.getItem('campusBazaarEmail') || '' : '';

  if (isAuthenticated) {
    const categories = ['All', 'Books', 'Laptops', 'Bicycles', 'Furniture', 'Electronics', 'Others'];
    const filteredProducts = products.filter((product) => {
      const normalizedSearchTerm = (searchTerm || '').trim().toLowerCase();
      const normalizedProductCategory = (product.category || '').trim().toLowerCase();
      const normalizedActiveCategory = (activeCategory || '').trim().toLowerCase();
      const categoryMatches = normalizedActiveCategory === 'all'
        || normalizedProductCategory === normalizedActiveCategory
        || (['other', 'others'].includes(normalizedActiveCategory) && ['other', 'others'].includes(normalizedProductCategory));
      const exactMatch = product.name.toLowerCase() === normalizedSearchTerm;
      const partialMatch = product.name.toLowerCase().includes(normalizedSearchTerm);
      const matchesSearch = !normalizedSearchTerm || exactMatch || partialMatch;

      return categoryMatches && matchesSearch;
    });

    return (
      <div className="min-h-screen bg-[#F7F9F1]">
        <Navbar 
          setshowSearch={setshowSearch}
          showSearch={showSearch}
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
          cartItems={cartItems}
          cartPulse={cartPulse}
          favoriteIds={favoriteIds}
          notification={notification}
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
        />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#48872B]">Marketplace</span>
              <h1 className="text-4xl font-black text-[#293325] mt-2">CampusBazaar</h1>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => navigate('/sellproduct')} className="px-6 py-3 rounded-full border border-[#4CBB17] text-[#48872B] font-bold hover:bg-[#EEF9EA]">
                Sell Item
              </button>
            </div>
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-[#DDEBDC]">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#293325]">Filter Products</h2>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-[#39542C] mb-2">Categories</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button key={category} onClick={() => onCategoryChange(category)} className={`block w-full text-left px-3 py-2 rounded-lg ${activeCategory === category ? 'bg-[#4CBB17] text-white' : 'hover:bg-[#EEF9EA] text-[#39542C]'}`}>{category}</button>
                  ))}
                </div>
              </div>
            </aside>

            <main className="lg:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#DDEBDC]">
                    <div className="relative h-48 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      <button
                        aria-label="Add to favourites"
                        onClick={() => onToggleFavorite(product.id)}
                        className="absolute top-3 right-3 bg-white/90 hover:bg-white border border-[#DDEBDC] rounded-full px-3 py-2 text-lg font-black shadow-sm transition text-[#39542C] hover:text-[#4CBB17]"
                      >
                        {favoriteIds.includes(product.id) ? '♥' : '♡'}
                      </button>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wide text-[#48872B]">{product.category}</span>
                        <span className="text-[#4CBB17] font-black">Rs {product.price}</span>
                      </div>
                      <h3 className="text-xl font-bold mt-3 text-[#293325]">{product.name}</h3>
                      <div className="flex items-center justify-between mt-6">
                        <button onClick={() => onSelectProduct(product)} className="bg-[#39542C] text-white px-4 py-2 rounded-full text-sm hover:bg-[#48872B]">View Details</button>
                        <div className="flex items-center gap-3">
                          <button onClick={() => onAddToCart(product)} className="text-[#48872B] font-bold text-sm hover:text-[#4CBB17]">Add to cart</button>
                          {product.sellerEmail === currentUserEmail && (
                            <button onClick={() => onDeleteProduct(product.id)} className="text-red-600 font-bold text-sm hover:text-red-800">Delete</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </main>
          </section>
        </section>

        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-[#DDEBDC]">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-[#293325]">{selectedProduct.name}</h2>
                <button onClick={() => onSelectProduct(null)} className="text-[#39542C] hover:text-[#4CBB17] font-black">×</button>
              </div>
              <div className="mt-4 grid md:grid-cols-[180px_minmax(0,1fr)] gap-4">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-40 object-cover rounded-xl border border-[#DDEBDC]" />
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold text-[#39542C]">Category:</span> {selectedProduct.category}</p>
                  <p><span className="font-bold text-[#39542C]">Listed date:</span> {selectedProduct.listedDate}</p>
                  <p><span className="font-bold text-[#39542C]">Listed by:</span> {selectedProduct.sellerName}</p>
                  <p><span className="font-bold text-[#39542C]">Phone:</span> {selectedProduct.sellerPhone}</p>
                  <p><span className="font-bold text-[#39542C]">Email:</span> {selectedProduct.sellerEmail}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end items-center gap-3">
                {selectedProduct.sellerEmail === currentUserEmail && (
                  <button onClick={() => { onDeleteProduct(selectedProduct.id); onSelectProduct(null); }} className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700">Delete Item</button>
                )}
                <button onClick={() => { onAddToCart(selectedProduct); onSelectProduct(null); }} className="bg-[#4CBB17] text-white px-5 py-2 rounded-full hover:bg-[#48872B]">Add to cart</button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar setshowSearch={setshowSearch} showSearch={showSearch} isAuthenticated={isAuthenticated} onLogout={onLogout} searchTerm={searchTerm} onSearchTermChange={onSearchTermChange} />

      <section className="bg-[#EEF9EA] p-30">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left ">
            <h2 className="text-7xl font-bold leading-tight text-[#293325]">
              Buy & Sell <span className="text-[#4CBB17]">College Items</span>
            </h2>

            <p className="mt-6 text-[#48872B] text-lg">
              CampusBazaar helps students buy and sell books,
              laptops, calculators, furniture, bicycles and many
              more used items at affordable prices.
            </p>

            <div className="mt-8 flex justify-center md:justify-start">
              <button
                className="bg-[#4CBB17] text-white px-6 py-3 rounded-lg hover:bg-[#48872B] cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Browse Items
              </button>
            </div>

            <div className="mt-8 text-center md:text-left">
              <p className="text-lg text-[#39542C]">
                Login to unlock the full marketplace experience.
              </p>
            </div>
          </div>

          <div className="category-panel logged-out-category-panel">
            {[
              { label: 'Books', image: books },
              { label: 'Laptops', image: laptop },
              { label: 'Bicycles', image: cycle },
              { label: 'Furniture', image: chair },
              { label: 'Calculators', image: geometry },
            ].map((item) => (
              <div
                key={item.label}
                role="button"
                tabIndex={0}
                onClick={() => navigate('/login')}
                onKeyDown={(event) => event.key === 'Enter' && navigate('/login')}
                className="category-card"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="category-card-overlay">
                  <span className="category-card-title">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Why />
      <Stats />
      <Footer />
    </div>
  );
}

export default Homepage
