// import React from "react";

// const categories = [
//   { name: "Books", icon: "📚" },
//   { name: "Electronics", icon: "💻" },
//   { name: "Mobiles", icon: "📱" },
//   { name: "Calculators", icon: "🧮" },
//   { name: "Notes", icon: "📄" },
//   { name: "Furniture", icon: "🪑" },
//   { name: "Bags", icon: "🎒" },
//   { name: "Bicycle", icon: "🚲" },
// ];

// const products = [
//   {
//     id: 1,
//     name: "HP Laptop",
//     price: "$350",
//     image: "https://picsum.photos/300?1",
//   },
//   {
//     id: 2,
//     name: "Engineering Book",
//     price: "$12",
//     image: "https://picsum.photos/300?2",
//   },
//   {
//     id: 3,
//     name: "Scientific Calculator",
//     price: "$18",
//     image: "https://picsum.photos/300?3",
//   },
//   {
//     id: 4,
//     name: "Study Chair",
//     price: "$25",
//     image: "https://picsum.photos/300?4",
//   },
//   {
//     id: 5,
//     name: "Backpack",
//     price: "$20",
//     image: "https://picsum.photos/300?5",
//   },
//   {
//     id: 6,
//     name: "Monitor",
//     price: "$120",
//     image: "https://picsum.photos/300?6",
//   },
// ];

<!-- // function Navbar() {
//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
//         <h1 className="text-3xl font-bold text-orange-600">
//           CampusBazaar
//         </h1>

//         <div className="hidden md:flex gap-8 font-medium">
//           <a href="#">Home</a>
//           <a href="#">Browse</a>
//           <a href="#">Categories</a>
//           <a href="#">Sell</a>
//           <a href="#">Wishlist</a>
//         </div>

//         <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg">
//           Login
//         </button>
//       </div>
//     </nav>
//   );
// } -->

// function Hero() {
//   return (
//     <section className="bg-orange-50 py-20">
//       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">

//         <div>
//           <h2 className="text-5xl font-bold leading-tight">
//             Buy & Sell <span className="text-orange-600">College Items</span>
//           </h2>

//           <p className="mt-6 text-gray-600 text-lg">
//             CampusBazaar helps students buy and sell books,
//             laptops, calculators, furniture, bicycles and many
//             more used items at affordable prices.
//           </p>

//           <div className="mt-8 flex gap-4">
//             <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
//               Browse Items
//             </button>

//             
//           </div>
//         </div>

//         <img
//           src="https://picsum.photos/600/400"
//           alt=""
//           className="rounded-xl shadow-lg"
//         />
//       </div>
//     </section>
//   );
// }

// function Categories() {
//   return (
//     <section className="max-w-7xl mx-auto py-16 px-6">

//       <h2 className="text-3xl font-bold mb-10">
//         Browse Categories
//       </h2>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//         {categories.map((cat) => (
//           <div
//             key={cat.name}
//             className="bg-white rounded-xl shadow hover:shadow-xl transition p-8 text-center cursor-pointer"
//           >
//             <div className="text-5xl">{cat.icon}</div>

//             <h3 className="mt-4 text-xl font-semibold">
//               {cat.name}
//             </h3>
//           </div>
//         ))}

//       </div>

//     </section>
//   );
// }

// function ProductCard({ product }) {
//   return (
//     <div className="bg-white rounded-xl shadow hover:shadow-xl overflow-hidden">

//       <img
//         src={product.image}
//         alt={product.name}
//         className="h-56 w-full object-cover"
//       />

//       <div className="p-5">

//         <h3 className="font-bold text-xl">
//           {product.name}
//         </h3>

//         <p className="text-orange-600 text-lg mt-2">
//           {product.price}
//         </p>

//         <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
//           View Details
//         </button>

//       </div>

//     </div>
//   );
// }

// function FeaturedProducts() {
//   return (
//     <section className="bg-gray-100 py-16">

//       <div className="max-w-7xl mx-auto px-6">

//         <h2 className="text-3xl font-bold mb-10">
//           Featured Products
//         </h2>

//         <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">

//           {products.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//             />
//           ))}

//         </div>

//       </div>

//     </section>
//   );
// }

// function SellBanner() {
//   return (
//     <section className="bg-orange-500 py-16 text-white text-center">

//       <h2 className="text-4xl font-bold">
//         Have Something to Sell?
//       </h2>

//       <p className="mt-4 text-lg">
//         Turn unused items into cash by posting them on CampusBazaar.
//       </p>

//       <button className="mt-8 bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
//         Post an Item
//       </button>

//     </section>
//   );
// }

// function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white py-8">

//       <div className="max-w-7xl mx-auto text-center">

//         <h2 className="text-2xl font-bold text-orange-500">
//           CampusBazaar
//         </h2>

//         <p className="mt-3 text-gray-400">
//           Buy & Sell Used College Items Easily.
//         </p>

//         <p className="mt-5 text-gray-500">
//           © 2026 CampusBazaar
//         </p>

//       </div>

//     </footer>
//   );
// }

// export default function Home() {
//   return (
//     <div className="bg-gray-50 min-h-screen">

//       <Navbar />

//       <Hero />

//       <Categories />

//       <FeaturedProducts />

//       <SellBanner />

//       <Footer />

//     </div>
//   );
// }