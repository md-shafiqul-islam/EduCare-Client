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
    <div className="bg-base-200">
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Services To Handle
          </h1>
          <p className="text-base text-base-content">
            This page lists all the booked services where you are the provider.
            You can manage the current status of each service using the dropdown
            below.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl bg-base-100 shadow border border-secondary">
          <table className="table w-full">
            <thead>
              <tr className="text-base text-accent">
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Date</th>
                <th>Client</th>
                <th>Instructions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-base-200">
                  <td>
                    <img
                      src={booking.serviceImage}
                      alt={booking.serviceName}
                      className="w-20 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{booking.serviceName}</td>
                  <td>৳ {booking.servicePrice}</td>
                  <td>{booking.serviceTakingDate}</td>
                  <td>
                    <div className="font-medium">{booking.currentUserName}</div>
                    <div className="text-xs text-base-content/60">
                      {booking.currentUserEmail}
                    </div>
                  </td>
                  <td>{booking.specialInstructions}</td>
                  <td>
                    <select
                      value={booking.serviceStatus}
                      onChange={(e) =>
                        handleStatusChange(booking._id, e.target.value)
                      }
                      className="select select-bordered bg-base-100 border-secondary focus:outline-primary"
                    >
                      <option value="pending">Pending</option>
                      <option value="working">Working</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceToDo;
