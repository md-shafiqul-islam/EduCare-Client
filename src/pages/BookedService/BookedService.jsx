import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookedService = () => {
  useEffect(() => {
    document.title = "Booked Service | EduCare";
  }, []);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookedService, setBookedService] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure(`/booked-services/${user?.email}`)
      .then((data) => {
        setBookedService(data?.data || []);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text:
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong while fetching your booked services!",
        });
      });
  }, [user?.email]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-primary mb-2">
          My Booked Services
        </h2>
        <p className="text-base-content text-lg">
          Here's a list of all services you’ve booked so far.
        </p>
      </div>

      {bookedService.length === 0 ? (
        <p className="text-center text-lg text-base-content mt-10">
          You haven’t booked any service yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookedService.map((service) => (
            <div
              key={service._id}
              className="bg-base-200 border border-base-300 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={service.serviceImage}
                alt={service.serviceName}
                className="w-full h-52 object-cover rounded-t-xl"
              />

              <div className="p-5 space-y-2 text-base-content">
                <h3 className="text-2xl font-semibold text-primary">
                  {service.serviceName}
                </h3>

                <p>
                  <span className="font-semibold">Price:</span>{" "}
                  <span className="font-normal">৳ {service.servicePrice}</span>
                </p>

                <div className="mt-2">
                  <p>
                    <span className="font-semibold">Provider Name:</span>{" "}
                    <span className="font-normal">{service.providerName}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Provider Email:</span>{" "}
                    <span className="font-normal">{service.providerEmail}</span>
                  </p>
                </div>

                <p>
                  <span className="font-semibold">Service Date:</span>{" "}
                  <span className="font-normal">
                    {new Date(service.serviceTakingDate).toLocaleDateString(
                      "en-BD",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                </p>

                {service.specialInstructions && (
                  <p>
                    <span className="font-semibold">Instruction:</span>{" "}
                    <span className="font-normal">
                      {service.specialInstructions}
                    </span>
                  </p>
                )}

                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="inline-block px-3 py-1 rounded-full text-secondary text-sm font-medium">
                    {service.serviceStatus}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedService;
