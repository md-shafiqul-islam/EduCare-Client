import { motion as Motion } from "framer-motion";
import Banner from "./Banner";
import PopularServices from "./PopularServices";
import Testimonials from "./Testimonials";
import HowItWorks from "./HowItWorks";
import { useEffect } from "react";
import StatsCounter from "./StatsCounter";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: "easeOut",
    },
  }),
};

const Home = () => {
  useEffect(() => {
    document.title = "Home | EduCare";
  }, []);

  return (
    <div>
      <Motion.section
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <Banner />
      </Motion.section>

      <Motion.section
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <PopularServices />
      </Motion.section>

      <Motion.section
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <Testimonials />
      </Motion.section>

      <Motion.section
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <HowItWorks />
      </Motion.section>

      <Motion.section
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <StatsCounter />
      </Motion.section>
    </div>
  );
};

export default Home;
