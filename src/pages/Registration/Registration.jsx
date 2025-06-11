import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Registration = () => {
  const [showEye, setShowEye] = useState(false);
  const { setUser, createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const { name, email, password, photo } = Object.fromEntries(
      formData.entries()
    );

    createUser(email, password)
      .then((result) => {
        // Update user profile
        const userProfile = { displayName: name, photoURL: photo };
        updateUserProfile(userProfile)
          .then(() => {
            setUser({ ...result.user, displayName: name, photoURL: photo });
          })
          .catch((error) => {
            console.log(error);
          });

        // Fire sweet alert
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Account Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-base-200 via-base-300 to-base-200 dark:from-base-300 dark:to-base-200 py-10 px-4">
      <div className="max-w-md w-full bg-base-100 p-10 rounded-3xl shadow-2xl border border-base-300 backdrop-blur-sm">
        <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
          Join <span className="text-primary">Edu</span>
          <span className="text-accent">Care</span>
        </h2>
        <p className="text-center text-base-content/70 mb-6">
          Create your account to access and share educational services, connect
          with learners and educators, and start your journey with EduCare.
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              className="input input-bordered input-primary w-full bg-base-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered input-primary w-full bg-base-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showEye ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="input input-bordered input-primary w-full bg-base-200"
                required
              />
              <div
                className="absolute top-2 right-5 z-50 cursor-pointer text-accent"
                onClick={() => setShowEye(!showEye)}
              >
                {showEye ? <Eye /> : <EyeOff />}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Photo URL
            </label>
            <input
              type="url"
              name="photo"
              placeholder="https://your-photo-url.com"
              className="input input-bordered input-primary w-full bg-base-200"
            />
          </div>

          <button
            type="submit"
            className="btn bg-gradient-to-r from-primary to-accent hover:from-primary-focus hover:to-accent-focus border-0 w-full text-white font-semibold transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6 text-base-content/80">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-primary font-semibold hover:text-accent hover:underline"
          >
            Login
          </Link>
        </div>

        <div className="divider">OR</div>

        <button className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white w-full flex items-center justify-center gap-2 transition duration-300">
          <FcGoogle className="text-xl" /> Register with Google
        </button>
      </div>
    </div>
  );
};

export default Registration;
