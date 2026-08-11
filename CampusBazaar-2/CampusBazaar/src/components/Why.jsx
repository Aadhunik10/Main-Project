import { FaMoneyBillWave, FaRecycle, FaUserShield, FaHandshake } from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      icon: <FaMoneyBillWave size={40} className="text-[#4CBB17]" />,
      title: "Save Money",
      description: "Buy quality second-hand products at student-friendly prices."
    },
    {
      icon: <FaRecycle size={40} className="text-[#4CBB17]" />,
      title: "Eco-Friendly",
      description: "Give products a second life and help reduce unnecessary waste."
    },
    {
      icon: <FaUserShield size={40} className="text-[#4CBB17]" />,
      title: "Trusted Campus Community",
      description: "Connect and trade with fellow students in a safer environment."
    },
    {
      icon: <FaHandshake size={40} className="text-[#4CBB17]" />,
      title: "Easy Buying & Selling",
      description: "Post your item in minutes and find buyers quickly."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-[#293325]">
          Why Choose <span className="text-[#4CBB17]">Campus</span><span className="text-[#48872B]">Baazar?</span>
        </h2>
        <p className="text-[#39542C] mt-4">
          The easiest way for students to buy and sell pre-owned items on campus.
        </p>
      </div>

      <div className="grid gap-8 mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300 border border-[#DDEBDC]"
          >
            <div className="flex justify-center mb-5 text-[#4CBB17]">
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3 text-[#293325]">
              {feature.title}
            </h3>

            <p className="text-[#39542C] text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;