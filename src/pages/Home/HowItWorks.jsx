import { FaSearch, FaUserCheck, FaChalkboardTeacher } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-3xl text-secondary" />,
      title: "Browse Services",
      desc: "Search from hundreds of verified educational services across Bangladesh.",
    },
    {
      icon: <FaUserCheck className="text-3xl text-secondary" />,
      title: "Compare & Choose",
      desc: "View profiles, compare ratings, and choose the best fit for your needs.",
    },
    {
      icon: <FaChalkboardTeacher className="text-3xl text-secondary" />,
      title: "Connect & Learn",
      desc: "Directly contact your selected tutor or provider and start your journey.",
    },
  ];

  return (
    <section className="py-14 px-6 md:px-10 bg-base-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary">How EduCare Works</h2>
        <p className="text-base-content max-w-2xl mx-auto mt-2">
          A simple and efficient way to connect learners with trusted
          educational service providers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-base-200 p-6 rounded-lg shadow-sm hover:shadow-md transition space-y-4"
          >
            <div className="flex justify-center">{step.icon}</div>
            <h4 className="text-xl font-semibold">{step.title}</h4>
            <p className="text-base-content text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
