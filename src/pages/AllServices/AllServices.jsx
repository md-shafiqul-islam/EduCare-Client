import ServiceCard from "../../components/ServiceCard";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const AllServices = () => {
  useEffect(() => {
    document.title = "All Services | EduCare";
  }, []);

  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios(
      `https://server-nine-tau-39.vercel.app/all-services?searchParams=${search}`
    )
      .then((data) => {
        setServices(data?.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Search Failed",
          text:
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong while fetching services.",
        });
      });
  }, [search]);

  return (
    <div className="min-h-screen bg-base-200 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary">
          All Available Services
        </h2>

        <p className="text-base text-center max-w-3xl mx-auto text-base-content mb-8">
          Explore a curated selection of educational services offered by
          experienced and verified providers. Whether you're seeking one-on-one
          home tuition, expert coaching for exams, or skill-based training,
          EduCare connects learners with the right mentors across Bangladesh.
          Scroll down to find the service that fits your needs and location.
        </p>

        <div className="relative w-full max-w-md mx-auto mb-6">
          <Search
            className="absolute z-50 left-3 top-1/2 -translate-y-1/2 text-base-content"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by service name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-10"
          />
        </div>

        {services.length === 0 ? (
          <div className="text-center text-lg font-semibold mt-12">
            No services available at the moment.
          </div>
        ) : (
          services.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))
        )}
      </div>
    </div>
  );
};

export default AllServices;
