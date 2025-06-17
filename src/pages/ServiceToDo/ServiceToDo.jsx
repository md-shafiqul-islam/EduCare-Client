import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ServiceToDo = () => {
  useEffect(() => {
    document.title = "Service To Do | EduCare";
  }, []);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosSecure(`/bookings/${user?.email}`)
      .then((data) => {
        setBookings(data?.data || []);
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
  }, [user?.email, axiosSecure]);

  const handleStatusChange = (id, updatedStatus) => {
    axiosSecure
      .patch(`/service-to-do/${id}`, {
        serviceStatus: updatedStatus,
      })
      .then((data) => {
        if (data?.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Status Updated",
            text: "Service status has been successfully updated.",
            timer: 1500,
            showConfirmButton: false,
          });

          // Update UI immediately
          setBookings(
            bookings.map((booking) =>
              booking._id === id
                ? { ...booking, serviceStatus: updatedStatus }
                : booking
            )
          );
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text:
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong while updating the service.",
        });
      });
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center text-primary mt-16">
        <h2 className="text-2xl font-semibold mb-2">Service To Do</h2>
        <p className="text-center text-lg text-base-content mt-10">
          No services found where you are listed as the provider.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-primary mb-2">
          Services To Handle
        </h1>
        <p className="text-lg text-base-content max-w-xl mx-auto">
          This page lists all the booked services where you are the provider.
          You can manage the current status of each service using the dropdown
          below.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border border-base-300 rounded-xl p-4 shadow-md bg-base-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-primary">
              {booking.serviceName}
            </h2>

            <img
              src={booking.serviceImage}
              alt={booking.serviceName}
              className="w-full h-48 object-cover rounded-md mb-2"
            />

            <p className="text-base-content">
              <span className="font-medium text-secondary">Price:</span>{" "}
              {booking.servicePrice} ৳
            </p>

            <p className="text-base-content">
              <span className="font-medium text-secondary">Service Date:</span>{" "}
              {booking.serviceTakingDate}
            </p>

            <p className="text-base-content">
              <span className="font-medium text-secondary">Client Name:</span>{" "}
              {booking.currentUserName}
            </p>

            <p className="text-base-content">
              <span className="font-medium text-secondary">Client Email:</span>{" "}
              {booking.currentUserEmail}
            </p>

            <p className="text-base-content">
              <span className="font-medium text-secondary">Instructions:</span>{" "}
              {booking.specialInstructions}
            </p>

            <div className="mt-3">
              <label className="block font-medium mb-1 text-secondary">
                Service Status:
              </label>
              <select
                value={booking.serviceStatus}
                onChange={(e) =>
                  handleStatusChange(booking._id, e.target.value)
                }
                className="border border-base-300 p-2 rounded-md w-full focus:border-primary focus:ring-primary"
              >
                <option value="pending">Pending</option>
                <option value="working">Working</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceToDo;
