import { FaBoxOpen, FaUsers, FaShoppingCart, FaTags } from "react-icons/fa";

const Statistics = () => {
  const stats = [
    {
      icon: <FaBoxOpen size={34} />,
      number: "500+",
      label: "Products Listed"
    },
    {
      icon: <FaUsers size={34} />,
      number: "300+",
      label: "Students"
    },
    {
      icon: <FaShoppingCart size={34} />,
      number: "150+",
      label: "Successful Sales"
    },
    {
      icon: <FaTags size={34} />,
      number: "10+",
      label: "Categories"
    }
  ];

  return (
    <section className="text-[#39542C] py-20 mt-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14 text-[#293325]">
          <h2 className="text-4xl font-bold">
            CampusBaazar in Numbers
          </h2>

          <p className="mt-3 text-[#48872B]">
            Connecting students through a smarter marketplace.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-[#F7F9F1] backdrop-blur rounded-xl p-8 text-center border border-[#DDEBDC]"
            >
              <div className="flex justify-center mb-5 text-[#4CBB17]">
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold text-[#293325]">
                {item.number}
              </h3>

              <p className="mt-3 text-[#48872B]">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Statistics;