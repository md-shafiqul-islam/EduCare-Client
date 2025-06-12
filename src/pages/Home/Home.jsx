import { motion } from "framer-motion";
import Banner from "./Banner";
import { Fade, Slide } from "react-awesome-reveal";
import PopularServices from "./PopularServices";

const pageVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Home = () => {
  return (
    <motion.div
      className="space-y-12"
      initial="hidden"
      animate="visible"
      variants={pageVariant}
    >
      <Fade direction="up" delay={100} triggerOnce>
        <Banner />
      </Fade>

      <Slide direction="left" delay={150} triggerOnce>
        <PopularServices />
      </Slide>
    </motion.div>
  );
};

export default Home;
