import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      name: "Ayesha Siddiqua",
      feedback:
        "EduCare helped me find the best tutor for my HSC exams. The platform is easy to use and highly reliable.",
      image: "https://i.pravatar.cc/100?img=1",
      position: "HSC Student",
    },
    {
      name: "Tariq Rahman",
      feedback:
        "I joined a Quran class from here. The experience was wonderful and the teacher was very cooperative.",
      image: "https://i.pravatar.cc/100?img=3",
      position: "Parent",
    },
  ];
  return (
    <section className="py-20 px-4 lg:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            What Our Users Say
          </h2>
          <p className="text-base-content max-w-xl mx-auto">
            Real experiences from students and parents who trusted EduCare for
            learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="relative bg-base-200 p-6 rounded-xl space-y-4 shadow-lg border border-secondary"
            >
              <FaQuoteLeft className="absolute top-4 left-4 text-3xl text-accent" />
              <p className="text-base-content italic mt-8">
                "{review.feedback}"
              </p>
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <h4 className="text-base text-secondary font-semibold">
                    {review.name}
                  </h4>
                  <span className="text-sm font-medium text-base-content">
                    {review.position}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
