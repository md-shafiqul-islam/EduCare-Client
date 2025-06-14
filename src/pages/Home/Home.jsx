import { motion } from "framer-motion";
import Banner from "./Banner";
import PopularServices from "./PopularServices";
import Testimonials from "./Testimonials";
import HowItWorks from "./HowItWorks";
import { useEffect } from "react";

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
    <div className="space-y-16">
      <motion.section
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <Banner />
      </motion.section>

      <motion.section
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <PopularServices />
      </motion.section>

      <motion.section
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <Testimonials />
      </motion.section>

      <motion.section
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <HowItWorks />
      </motion.section>
    </div>
  );
};

export default Home;
