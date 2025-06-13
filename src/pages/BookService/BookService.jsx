import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const BookService = () => {
  const { data: specificService } = useLoaderData();
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [instructions, setInstructions] = useState("");

  return (
    <div className="max-w-2xl mx-auto bg-base-200 p-8 rounded-2xl shadow-md my-10 space-y-6 border border-base-300">
      <h2 className="text-3xl font-bold text-center text-primary">
        Book Service
      </h2>
      <p className="text-center text-base-content">
        Fill out the form to complete your booking.
      </p>

      <form className="space-y-4">
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
