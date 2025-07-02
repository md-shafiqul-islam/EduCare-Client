import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

const PopularServices = () => {
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios("https://server-nine-tau-39.vercel.app/all-services")
      .then((data) => {
        const topEight = data?.data.slice(0, 8);
        setPopularServices(topEight);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.message || "Something went wrong!",
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="py-20 px-4 lg:px-10 bg-base-200">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Popular Educational Services
          </h2>
          <p className="text-base-content max-w-xl mx-auto">
            Choose from the most trusted and in-demand learning services
            available on EduCare.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularServices.map((service) => (
            <Fade key={service._id} triggerOnce cascade damping={0.1}>
              <div className="bg-base-100 border border-secondary rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 h-full flex flex-col">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-base-content mb-3">
                      {service.description.slice(0, 80)}...
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={service.serviceProviderImage}
                        alt="Provider"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-base-content">
                        {service.serviceProviderName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-secondary">
                        ৳ {service.price}
                      </span>
                      <Link
                        to={`/service/${service._id}`}
                        className="btn btn-primary text-sm hover:underline font-medium"
                      >
                        See More →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        {/* Show All Button */}
        <div className="text-center">
          <Link to="/all-services" className="btn btn-primary btn-wide">
            Show All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
