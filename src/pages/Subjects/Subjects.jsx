import {
  BookOpen,
  Globe,
  Code,
  PenTool,
  Atom,
  FlaskConical,
  Brain,
  BookMarked,
  Paintbrush2,
  Laptop2,
} from "lucide-react";

const iconClass = "w-8 h-8 text-secondary";

const subjectList = [
  { name: "Bangla", icon: <PenTool className={iconClass} /> },
  { name: "English", icon: <BookOpen className={iconClass} /> },
  { name: "Mathematics", icon: <Brain className={iconClass} /> },
  { name: "Physics", icon: <Atom className={iconClass} /> },
  { name: "Chemistry", icon: <FlaskConical className={iconClass} /> },
  { name: "Biology", icon: <Globe className={iconClass} /> },
  { name: "ICT", icon: <Laptop2 className={iconClass} /> },
  { name: "Drawing", icon: <Paintbrush2 className={iconClass} /> },
  { name: "Quran", icon: <BookMarked className={iconClass} /> },
  { name: "Web Development", icon: <Code className={iconClass} /> },
];

const Subjects = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Subjects We Offer
        </h2>
        <p className="text-base md:text-lg text-base-content max-w-3xl mx-auto leading-relaxed">
          At <span className="font-semibold text-accent">EduCare</span>, we aim
          to make education accessible and engaging across all age groups and
          levels. Our subject offerings range from foundational academics to
          creative and technical disciplines. Whether you're a school student
          looking to master the core curriculum or someone exploring skill-based
          learning, we have expert tutors ready to guide you.
        </p>
      </div>

      {/* Subject Grid */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjectList.map((subject) => (
          <li
            key={subject.name}
            className="bg-base-200  p-6 rounded-xl shadow hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-default text-center space-y-3"
          >
            <div className="flex justify-center">{subject.icon}</div>
            <h4 className="text-lg font-semibold text-primary">
              {subject.name}
            </h4>
            <p className="text-sm text-base-content">
              High-quality guidance in{" "}
              <span className="font-medium">{subject.name}</span> from
              experienced and dedicated tutors.
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Subjects;
