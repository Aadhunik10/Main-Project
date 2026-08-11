import React from 'react'

const categories = [
  { name: "Books", icon: "📚" },
  { name: "Electronics", icon: "💻" },
  { name: "Mobiles", icon: "📱" },
  { name: "Calculators", icon: "🧮" },
  { name: "Notes", icon: "📄" },
  { name: "Furniture", icon: "🪑" },
  { name: "Bags", icon: "🎒" },
  { name: "Bicycle", icon: "🚲" },
  { name: "Instruments", icon: "📐" },
];

export const Categories = () => {
   
   return (
     <section  id="categories" className="max-w-7xl mx-auto mt-16 mb-16 py-16 px-6 bg-[#EEF9EA] rounded-lg shadow-md">
      <h2 className="text-3xl text-[#48872B] font-bold mb-10">          Categories       </h2>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {categories.map((e) => (
          <div
            key={e.name}
             className="bg-white rounded-xl shadow hover:shadow-xl transition p-8 text-center cursor-pointer border border-[#DDEBDC]"
           >
            <div className="text-5xl text-[#4CBB17]">{e.icon}</div>

            <h3 className="mt-4 text-xl font-semibold text-[#293325]">
              {e.name}
            </h3>
          </div>
        ))}

      </div>

     </section>
   )}



   
  


export default Categories
