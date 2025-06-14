import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const ManageService = () => {
  const { user } = useAuth();
  const [myServices, setMyServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

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

  const handleUpdateService = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const updatedService = Object.fromEntries(formData.entries());

    updatedService.areas = updatedService.areas
      .split(",")
      .map((area) => area.trim());

    Swal.fire({
      title: "Update Service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:3000/update-service/${selectedService._id}`,
            updatedService
          )
          .then((data) => {
            if (data?.data?.modifiedCount > 0) {
              Swal.fire({
                title: "Updated!",
                text: "Service has been updated.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });

              // Update UI immediately
              setMyServices(
                myServices.map((service) =>
                  service._id === selectedService._id
                    ? { ...service, ...updatedService }
                    : service
                )
              );

              // Close modal and clear selection
              form.reset();
              setSelectedService(null);
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
      }
    });
  };

  const handleDeleteService = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/delete-service/${id}`)
          .then((data) => {
            if (data?.data?.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Service deleted successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });

              // Update UI immediately
              setMyServices(
                myServices.filter((myService) => myService._id !== id)
              );
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Delete Failed!",
              text:
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong while deleting the service.",
            });
          });
      }
    });
  };

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
                  <span className="font-normal text-secondary">
                    ৳ {service.price}
                  </span>
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
                  <button
                    onClick={() => {
                      setSelectedService(service);
                    }}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedService && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <form
            method="dialog"
            onSubmit={handleUpdateService}
            className="modal-box bg-base-300 text-base-content"
          >
            <h3 className="font-bold text-lg text-primary mb-4">
              Update{" "}
              <span className="text-secondary">{selectedService.name}</span>{" "}
              Service
            </h3>

            <div>
              <label className="block text-sm font-medium text-secondary">
                Image URL
              </label>
              <p className="text-base-content/60 mb-1">
                Provide a link to an image for your service.
              </p>
              <input
                type="text"
                name="image"
                defaultValue={selectedService.image}
                className="input input-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-secondary">
                Service Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={selectedService.name}
                className="input input-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-secondary">
                Description
              </label>
              <p className="text-xs text-base-content/60 mb-1">
                Briefly describe your service (max 300 characters).
              </p>
              <textarea
                name="description"
                defaultValue={selectedService.description}
                className="textarea textarea-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-secondary">
                Price (in ৳)
              </label>
              <input
                type="number"
                name="price"
                defaultValue={selectedService.price}
                className="input input-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-secondary">
                Service Areas
              </label>
              <p className="text-xs text-base-content/60 mb-1">
                Separate areas with commas (e.g., Dhaka, Mymensingh)
              </p>
              <input
                type="text"
                name="areas"
                defaultValue={selectedService.areas?.join(", ")}
                className="input input-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="modal-action mt-6">
              <button
                type="submit"
                className="btn bg-accent hover:bg-accent-focus text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="btn bg-base-200 text-base-content border border-primary hover:bg-primary hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ManageService;
