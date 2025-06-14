import { useEffect } from "react";
import { Link, useLoaderData } from "react-router";

const ServiceDetails = () => {
  useEffect(() => {
    document.title = "Service Details | EduCare";
  }, []);

  const { data: specificService } = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 my-10">
      {/* Heading and Subtext */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold text-primary">Service Details</h1>
        <p className="text-base text-base-content/70">
          Explore complete information about this service and book it with
          confidence.
        </p>
      </div>

      {/* Provider Info Section */}
      <section className="bg-base-200 p-6 rounded-xl border border-base-300 shadow-sm">
        <h2 className="text-xl font-bold text-primary mb-4">
          Service Provider
        </h2>
        <div className="flex items-center gap-4">
          <img
            src={specificService.serviceProviderImage}
            alt={specificService.serviceProviderName}
            className="w-14 h-14 rounded-full border"
          />
          <div>
            <p className="font-medium text-lg text-base-content">
              {specificService.serviceProviderName}
            </p>
            <div className="flex flex-wrap gap-2 mt-1 text-sm">
              {specificService.areas.map((area, idx) => (
                <span
                  key={idx}
                  className="bg-secondary/10 text-secondary px-2 py-1 rounded"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className="bg-base-200 p-6 rounded-xl border border-base-300 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-primary">{name}</h2>
        <img
          src={specificService.image}
          alt={specificService.name}
          className="w-full max-h-[400px] object-cover rounded-xl border"
        />
        <p className="text-lg font-semibold text-primary">
          {specificService.name}
        </p>
        <p className="text-base-content">{specificService.description}</p>
        <div className="flex items-center gap-2">
          <img
            src={specificService.serviceProviderImage}
            alt={specificService.serviceProviderName}
            className="w-10 h-10 rounded-full border"
          />
          <span className="text-base font-medium text-base-content">
            {specificService.serviceProviderName}
          </span>
        </div>
        <p className="text-lg font-semibold text-secondary">
          Price: ৳ {specificService.price}
        </p>
        <Link to={`/book-service/${specificService._id}`}>
          <button className="btn btn-primary">Book Now</button>
        </Link>
      </section>
    </div>
  );
};

export default ServiceDetails;
