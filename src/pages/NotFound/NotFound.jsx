import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found | EduCare";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <AlertTriangle className="text-error mb-4" size={48} />
      <h1 className="text-5xl font-bold text-error mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-base-content mb-6 max-w-xl">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-wide">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
