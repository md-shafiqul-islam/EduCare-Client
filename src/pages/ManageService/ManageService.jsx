import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";

const ManageService = () => {
  useEffect(() => {
    document.title = "Manage Service | EduCare";
  }, []);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [myServices, setMyServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/my-added-services?email=${user?.email}`)
      .then((data) => {
        setMyServices(data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
        axiosSecure
          .put(`/update-service/${selectedService._id}`, updatedService)
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
        axiosSecure
          .delete(`/delete-service/${id}`)
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
    <div className="bg-base-200">
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Manage My Services
          </h2>
          <p className="text-base text-base-content">
            Here are all the services you have added. You can edit or delete
            them below.
          </p>
        </div>

        {loading ? (
          <>
            <Spinner />
            <p className="text-sm text-base-content font-medium text-center mt-4">
              Loading services, please wait...
            </p>
          </>
        ) : myServices.length === 0 ? (
          <div className="text-center text-lg font-semibold mt-12">
            You haven’t added any services yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-base-100 shadow border border-secondary">
            <table className="table w-full">
              <thead>
                <tr className="text-base text-accent">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Areas</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myServices.map((service) => (
                  <tr key={service._id} className="hover:bg-base-200">
                    <td>
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-20 h-16 object-cover rounded"
                      />
                    </td>
                    <td>{service.name}</td>
                    <td>৳ {service.price}</td>
                    <td>
                      {service.areas.map((area, index) => (
                        <span
                          key={index}
                          className="inline-block bg-secondary/10 text-secondary px-2 py-1 rounded mr-1 text-xs"
                        >
                          {area}
                        </span>
                      ))}
                    </td>
                    <td className="space-x-2">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="btn btn-xs btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    </div>
  );
};

export default ManageService;
