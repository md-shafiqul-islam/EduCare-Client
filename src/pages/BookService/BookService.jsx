import { Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BookService = () => {
  useEffect(() => {
    document.title = "Book Service | EduCare";
  }, []);

  const location = useLocation();
  const specificService = location.state?.service;

  const { user } = useAuth();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();

    const bookingService = {
      serviceId: specificService._id,
      serviceName: specificService.name,
      serviceImage: specificService.image,
      providerEmail: specificService.serviceProviderEmail,
      providerName: specificService.serviceProviderName,
      currentUserEmail: user?.email,
      currentUserName: user?.displayName,
      serviceTakingDate: date,
      specialInstructions: instructions,
      servicePrice: specificService.price,
      serviceStatus: "pending",
    };

    axios
      .post("http://localhost:3000/booking-service", bookingService)
      .then((data) => {
        if (data?.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Service Booked Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(() => {
            navigate("/all-services");
          }, 1600);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Booking Service Failed",
          text:
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong!",
        });
      });
  };

  if (!specificService) {
    Swal.fire({
      icon: "warning",
      title: "No Service Found",
      text: "Redirecting to service list...",
      timer: 1500,
      showConfirmButton: false,
    });

    return <Navigate to="/all-services" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-base-200 p-8 rounded-2xl shadow-md my-10 space-y-6 border border-base-300">
      <h2 className="text-3xl font-bold text-center text-primary">
        Book Service
      </h2>
      <p className="text-center text-base-content">
        Fill out the form to complete your booking.
      </p>

      <form onSubmit={handleBooking} className="space-y-4">
        {/* Service ID */}
        <div>
          <label className="label font-medium">Service ID</label>
          <input
            type="text"
            value={specificService._id}
            readOnly
            className="input input-bordered w-full cursor-not-allowed"
          />
        </div>

        {/* Service Name */}
        <div>
          <label className="label font-medium">Service Name</label>
          <input
            type="text"
            value={specificService.name}
            readOnly
            className="input input-bordered w-full cursor-not-allowed"
          />
        </div>

        {/* Service Image */}
        <div>
          <label className="label font-medium">Service Image</label>
          <img
            src={specificService.image}
            alt={specificService.name}
            className="w-full h-60 object-cover rounded-lg border cursor-not-allowed"
          />
        </div>

        {/* Provider Email */}
        <div>
          <label className="label font-medium">Provider Email</label>
          <input
            type="text"
            value={specificService.serviceProviderEmail}
            readOnly
            className="input input-bordered w-full cursor-not-allowed"
          />
        </div>

        {/* Provider Name */}
        <div>
          <label className="label font-medium">Provider Name</label>
          <input
            type="text"
            value={specificService.serviceProviderName}
            readOnly
            className="input input-bordered w-full cursor-not-allowed"
          />
        </div>

        {/* Current User Email */}
        <div>
          <label className="label font-medium">Your Email</label>
          <input
            type="text"
            value={user?.email}
            readOnly
            className="input input-bordered w-full cursor-not-allowed"
          />
        </div>

        {/* Current User Name */}
        <div>
          <label className="label font-medium">Your Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full cursor-not-allowed"
          />
        </div>

        {/* Service Taking Date */}
        <div>
          <label className="label font-medium">Service Taking Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Special Instruction */}
        <div>
          <label className="label font-medium">Special Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="e.g., area, address, customized service plan"
            required
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="label font-medium">Price</label>
          <input
            type="text"
            value={`৳ ${specificService.price}`}
            readOnly
            className="input input-bordered w-full cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Purchase
        </button>
      </form>
    </div>
  );
};

export default BookService;
