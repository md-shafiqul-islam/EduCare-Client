import { FaSearch, FaUserCheck, FaChalkboardTeacher } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-3xl text-primary" />,
      title: "Browse Services",
      desc: "Search from hundreds of verified educational services across Bangladesh.",
    },
    {
      icon: <FaUserCheck className="text-3xl text-primary" />,
      title: "Compare & Choose",
      desc: "View profiles, compare ratings, and choose the best fit for your needs.",
    },
    {
      icon: <FaChalkboardTeacher className="text-3xl text-primary" />,
      title: "Connect & Learn",
      desc: "Directly contact your selected tutor or provider and start your journey.",
    },
  ];

  return (
    <section className="py-20 px-4 lg:px-10 bg-base-200">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            How EduCare Works
          </h2>
          <p className="text-base-content max-w-xl mx-auto">
            A simple and efficient way to connect learners with trusted
            educational service providers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-base-100 p-6 rounded-xl space-y-4 shadow-lg border border-secondary hover:scale-[1.03] transition-transform duration-300"
            >
              <div className="flex justify-center">{step.icon}</div>
              <h4 className="text-xl text-accent font-semibold">
                {step.title}
              </h4>
              <p className="text-secondary text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
