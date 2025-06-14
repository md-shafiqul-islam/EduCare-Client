import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManageService = () => {
  const { user } = useAuth();
  const [myServices, setMyServices] = useState([]);

  useEffect(() => {
    axios(`http://localhost:3000/my-added-services?email=${user?.email}`)
      .then((data) => {
        setMyServices(data?.data || []);
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
          Manage My Services
        </h2>
        <p className="text-lg text-base-content">
          Here are all the services you have added.
        </p>
      </div>

      {myServices.length === 0 ? (
        <p className="text-center text-lg text-base-content mt-10">
          You haven’t added any service yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {myServices.map((service) => (
            <div
              key={service._id}
              className="bg-base-200 border border-base-300 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-52 object-cover rounded-t-xl"
              />

              <div className="p-5 space-y-2 text-base-content">
                <p>
                  <span className="font-semibold">Price:</span>{" "}
                  <span className="font-normal">৳ {service.price}</span>
                </p>

                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  <span className="font-normal">{service.name}</span>
                </p>

                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  <span className="font-normal">
                    {service.description?.slice(0, 80)}...
                  </span>
                </p>

                <p>
                  <span className="font-semibold">Service Area:</span>{" "}
                  {service.areas.map((area, index) => (
                    <span
                      key={index}
                      className="inline-block bg-secondary/10 text-secondary px-2 py-1 rounded mr-1"
                    >
                      {area}
                    </span>
                  ))}
                </p>

                <div className="flex justify-between mt-4">
                  <Link className="btn btn-sm btn-primary">Edit</Link>

                  <button className="btn btn-sm btn-error">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageService;
