import { motion as Motion } from "framer-motion";
import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  return (
    <Motion.div
      className="bg-base-300 p-6 rounded-xl shadow-lg border border-secondary space-y-6"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Service Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <img
          src={service.image}
          alt={service.name}
          className="w-full md:w-64 object-cover rounded-xl"
        />

        {/* Text Info */}
        <div className="flex-1 space-y-2">
          <h3 className="text-2xl font-semibold text-primary">
            {service.name}
          </h3>
          <p className="text-sm text-base-content">
            {service.description.length > 100
              ? service.description.slice(0, 100) + "..."
              : service.description}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <img
              src={service.serviceProviderImage}
              alt={service.serviceProviderName}
              className="w-10 h-10 rounded-full border"
            />
            <span className="font-medium text-base-content">
              {service.serviceProviderName}
            </span>
          </div>

          <p className="text-sm space-y-1">
            <span className="font-semibold">Area:</span>{" "}
            {service.areas.map((area, index) => (
              <span
                key={index}
                className="inline-block bg-secondary/10 text-secondary px-2 py-1 rounded mr-1"
              >
                {area}
              </span>
            ))}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ৳ {service.price}
          </p>

          {/* View Details */}
          <Link to={`/service/${service._id}`}>
            <button className="btn btn-secondary btn-sm mt-4">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </Motion.div>
  );
};

export default ServiceCard;
