import { useEffect } from "react";

const ServiceToDo = () => {
  useEffect(() => {
    document.title = "Service To Do | EduCare";
  }, []);

  return <div>ServiceToDo</div>;
};

export default ServiceToDo;
