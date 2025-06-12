import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const PopularServices = () => {
  const [popularServices, setPopularServices] = useState([]);

  useEffect(() => {
    axios("http://localhost:3000/all-services")
      .then((data) => {
        const topSix = data?.data.slice(0, 6);
        setPopularServices(topSix);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error || "Something went wrong!",
        });
      });
  }, []);

  return (
    <section className="py-12 px-4 md:px-10 bg-base-200">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Popular Educational Services
        </h2>
        <p className="text-base-content max-w-xl mx-auto">
          Choose from the most trusted and in-demand learning services available
          on EduCare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {popularServices.map((service) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-base-100 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row border border-base-300"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full md:w-1/3 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-primary">
                  {service.name}
                </h3>
                <p className="text-base-content mt-2 text-sm">
                  {service.description.slice(0, 100)}...
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <img
                    src={service.serviceProviderImage}
                    alt="Provider"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-base-content">
                    {service.serviceProviderName}
                  </span>
                </div>
                <span className="text-sm font-semibold text-secondary">
                  ৳ {service.price}
                </span>
              </div>

              <div className="mt-4 text-right">
                <Link
                  to={`/services/${service._id}`}
                  className="text-sm text-secondary font-semibold hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/all-services" className="btn btn-primary btn-wide">
          Show All
        </Link>
      </div>
    </section>
  );
};

export default PopularServices;
