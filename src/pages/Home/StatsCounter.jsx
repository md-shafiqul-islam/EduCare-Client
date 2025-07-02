import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion as Motion } from "framer-motion";
import { Users, BookOpenCheck, GraduationCap, Landmark } from "lucide-react";

const statsClass = "w-6 h-6";
const stats = [
  { label: "Tutors", end: 700, icon: <Users className={statsClass} /> },
  {
    label: "Students",
    end: 8500,
    icon: <GraduationCap className={statsClass} />,
  },
  {
    label: "Subjects",
    end: 25,
    icon: <BookOpenCheck className={statsClass} />,
  },
  {
    label: "Institutions",
    end: 272,
    icon: <Landmark className={statsClass} />,
  },
];

const StatsCounter = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section ref={ref} className="py-20 px-4 lg:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Our Impact in Numbers
          </h2>

          <p className="text-base-content max-w-xl mx-auto">
            At EduCare, we take pride in our growing community of learners and
            educators. These numbers reflect our dedication to delivering
            quality tuition services, fostering academic success, and empowering
            students across the nation.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <Motion.div
              key={stat.label}
              className="bg-base-300 p-6 rounded-xl space-y-3 shadow-lg border border-secondary hover:scale-[1.03] transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex justify-center text-primary">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-accent">
                {inView ? <CountUp end={stat.end} duration={5} /> : "0"}+
              </h3>
              <p className="text-secondary font-medium">{stat.label}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
