const About = () => {
  const tutors = [
    {
      name: "Raihan Ahmed",
      subject: "Mathematics Specialist",
      desc: "An experienced math tutor helping students simplify complex problems through practical approaches.",
    },
    {
      name: "Fatima Noor",
      subject: "English & Literature",
      desc: "Specializes in grammar, vocabulary, and board exam writing strategies for classes 6-12.",
    },
    {
      name: "Imran Hossain",
      subject: "ICT & Web Development",
      desc: "A tech-savvy tutor guiding students through ICT basics and modern web technologies.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 space-y-12">
      {/* About Intro */}
      <div>
        <h2 className="text-3xl font-bold text-primary text-center mb-4">
          About Us
        </h2>
        <div className="space-y-5 text-base text-base-content leading-relaxed">
          <p>
            <strong>EduCare</strong> is a trusted online tuition platform
            dedicated to building a better academic future for students across
            Bangladesh. Whether you're preparing for school exams, learning a
            new skill, or exploring creative arts—EduCare matches you with the
            right tutor.
          </p>
          <p>
            Our platform is designed to offer customized learning experiences,
            flexible timing, and one-on-one mentorship. With verified, expert
            tutors and real progress tracking, EduCare ensures quality education
            reaches every home.
          </p>
          <p>
            We cover a wide range of subjects—Bangla, English, Math, Science,
            ICT, Quran, and even creative arts like Drawing and Web Development.
            Our approach combines modern tech with traditional values.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div>
        <h3 className="text-2xl font-bold text-secondary mb-4">
          Our Mission & Vision
        </h3>
        <div className="space-y-4 text-base-content text-base">
          <p>
            <strong>Mission:</strong> To make quality education accessible and
            affordable for all students, regardless of location or financial
            background.
          </p>
          <p>
            <strong>Vision:</strong> To become Bangladesh’s leading online
            tuition service by combining expert guidance, digital innovation,
            and student-centered support.
          </p>
        </div>
      </div>

      {/* Meet Tutors */}
      <div>
        <h3 className="text-2xl font-bold text-secondary mb-6">
          Meet Our Tutors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div
              key={tutor.name}
              className="bg-base-200 dark:bg-base-300 rounded-xl p-5 shadow hover:shadow-md transition-all duration-300"
            >
              <h4 className="text-lg font-semibold text-primary">
                {tutor.name}
              </h4>
              <p className="text-sm text-accent mb-2">{tutor.subject}</p>
              <p className="text-sm text-base-content">{tutor.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
