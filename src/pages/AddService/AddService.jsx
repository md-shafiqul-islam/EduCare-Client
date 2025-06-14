import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const AddService = () => {
  useEffect(() => {
    document.title = "Add Service | EduCare";
  }, []);

  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddService = (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading(true);

    const formData = new FormData(form);
    const service = Object.fromEntries(formData.entries());

    service.areas = service.areas.split(",").map((area) => area.trim());

    const newService = {
      ...service,
      serviceProviderImage: user?.photoURL,
      serviceProviderName: user?.displayName,
      serviceProviderEmail: user?.email,
    };

    axios
      .post("http://localhost:3000/add-service", newService)
      .then((data) => {
        if (data?.data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Service Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          form.reset();
          setLoading(false);

          setTimeout(() => {
            navigate("/");
          }, 1600);
        }
      })
      .catch((error) => {
        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Adding Service Failed",
          text:
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong!",
        });
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-3xl bg-base-100 p-10 rounded-xl shadow-lg border border-base-300">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">
          Add a New Service
        </h2>

        <p className="text-center text-base text-gray-500 mb-8 max-w-2xl mx-auto">
          Empower your community by offering valuable services! As a trusted
          provider, your expertise can now reach more people through EduCare.
          Fill in the form below with accurate details about your service — our
          users are waiting to benefit from your skills.
        </p>

        <form
          onSubmit={handleAddService}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        >
          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered"
              required
            />
          </div>

          {/* Service Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Service Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Service name"
              className="input input-bordered"
              required
            />
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price (BDT)</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="input input-bordered"
              required
            />
          </div>

          {/* Service Area */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Service Area</span>
            </label>
            <input
              type="text"
              name="areas"
              placeholder="E.g. Dhaka, Chittagong"
              className="input input-bordered"
              required
            />
          </div>

          {/* Description with space */}
          <div className="form-control md:col-span-2 mt-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              rows="5"
              placeholder="Short description of the service"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control md:col-span-2">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
