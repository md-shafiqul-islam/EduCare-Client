import ServiceCard from "../../components/ServiceCard";
import Spinner from "../../components/Spinner";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const AllServices = () => {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "All Services | EduCare";
  }, []);

  useEffect(() => {
    setLoading(true);
    axios(
      `https://server-nine-tau-39.vercel.app/all-services?searchParams=${search}`
    )
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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

  useEffect(() => {
    let sorted = [...services];
    if (sortOption === "priceLowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setFilteredServices(sorted);
  }, [services, sortOption]);

  return (
    <div className="bg-base-200 px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            All Available Services
          </h2>
          <p className="text-base text-base-content max-w-3xl mx-auto">
            Explore a curated selection of educational services offered by
            experienced and verified providers. Whether you're seeking
            one-on-one home tuition, expert coaching for exams, or skill-based
            training, EduCare connects learners with the right mentors across
            Bangladesh.
          </p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
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

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-bordered w-full md:w-60"
          >
            <option value="default">Sort by: Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Content Display */}
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-2">
            <Spinner />
            <p className="text-sm text-base-content font-medium">
              No services available at the moment.
            </p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center text-lg font-semibold mt-12">
            No services match your search.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
