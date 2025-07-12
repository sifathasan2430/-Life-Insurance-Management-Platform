import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAuthContext from "@/Context/UserAuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import axios from "axios";
import secureAxios from "../../../../Persel/persel-client-app/src/utils/firebaseAxios";

const Register = () => {
  const { registerUser, loginWithGoogle } = useContext(UserAuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userCredential = await registerUser(data.email, data.password);
      const user = userCredential.user;

      await secureAxios.post('/users', {
        name: data.name,
        email: data.email,
        photo: data.photo || "",
        role: "customer",
        created_at: new Date().toISOString(),
      });

      toast.success("Registration successful!");
      reset();
      navigate("/");
    } catch (err) {
      toast.error("Registration failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
  try {
    const result = await loginWithGoogle();
    const user = result.user;

    // ✅ Step 1: Check if user exists
    const res = await secureAxios.get(
      `/users`,
      {
        params: { email: user.email },
      }
    );

    //  Step 2: Save user if not exist
    if (!res.data.exists) {
      await secureAxios.post( '/users', {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL || "",
        role: "customer",
      });
    }

    toast.success("Google login successful!");
    navigate("/dashboard");
  } catch (err) {
    toast.error("Google login failed!");
    console.error(err);
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl md:text-3xl font-semibold text-gray-800">
            Create Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
             <div  className="space-y-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="Jhon Doe"
                {...register("name", { required: "Name is required" })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div  className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div  className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                 {...register("password", {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters"
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    message: "Must contain uppercase, lowercase, and a number"
  }
})}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <Label htmlFor="photo">Photo URL</Label>
              <Input
                id="photo"
                type="text"
                placeholder="https://example.com/photo.jpg"
                {...register("photo")}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignup}
            >
              <FcGoogle className="text-xl" />
              Register with Google
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <Link to="/login" className="text-orange-600 font-medium ml-1 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
