import { useLoaderData } from "react-router";
import ServiceCard from "../../components/ServiceCard";

const AllServices = () => {
  const { data: allServices } = useLoaderData();

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

        {allServices.length === 0 ? (
          <div className="text-center text-lg font-semibold mt-12">
            No services available at the moment.
          </div>
        ) : (
          allServices.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))
        )}
      </div>
    </div>
  );
};

export default AllServices;
