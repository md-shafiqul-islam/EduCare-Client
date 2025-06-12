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
    <section className="py-14 bg-base-200">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary mb-2">
          What Our Users Say
        </h2>
        <p className="text-base-content max-w-xl mx-auto">
          Real experiences from students and parents who trusted EduCare for
          learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-base-100 rounded-xl p-6 shadow-md border border-base-300 space-y-4 relative"
          >
            <FaQuoteLeft className="text-3xl text-accent absolute top-4 left-4" />
            <p className="text-base-content italic mt-8">"{review.feedback}"</p>
            <div className="flex items-center gap-4 mt-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <h4 className="text-base font-semibold">{review.name}</h4>
                <span className="text-sm text-base-content">
                  {review.position}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
