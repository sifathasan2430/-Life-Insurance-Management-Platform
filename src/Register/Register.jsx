import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import secureAxios from "../utils/firebaseAxios";
import UserAuthContext from "../Context/UserAuthContext";

const Register = () => {
  const { registerUser, loginWithGoogle } = useContext(UserAuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const redirectByRole = (role) => {
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "agent") navigate("/agent/dashboard");
    else navigate("/");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userCredential = await registerUser(data.email, data.password);
      const user = userCredential.user;

      // Save user to DB as customer
      await secureAxios.post("/users", {
        name: data.name,
        email: data.email,
        photo: data.photo || "",
        role: "customer",
        created_at: new Date().toISOString(),
      });

      // Get JWT for secure access
      await secureAxios.post("/jwt", { email: data.email });

      toast.success("Registration successful!");

      // Small delay to ensure cookie is set before redirect
      setTimeout(() => {
        redirectByRole("customer");
      }, 300);

      reset();
    } catch (err) {
      toast.error("Registration failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      // Check if user exists
      const res = await secureAxios.get("/users", {
        params: { email: user.email, checkExists: "true" },
      });

      if (!res.data.exists) {
        await secureAxios.post("/users", {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL || "",
          role: "customer",
          created_at: new Date().toISOString(),
        });
      }

      // Get JWT
      await secureAxios.post("/jwt", { email: user.email });

      // Get role for redirect
      const userInfo = await secureAxios.get("/users", {
        params: { email: user.email },
      });

      toast.success("Google login successful!");

      // Delay for cookie to be set
      setTimeout(() => {
        redirectByRole(userInfo.data.role || "customer");
      }, 300);
    } catch (err) {
      toast.error("Google login failed!");
      console.error(err);
    } finally {
      setLoading(false);
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
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email", { required: "Email is required" })} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message: "Include uppercase, lowercase, and number",
                  },
                })}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo URL</Label>
              <Input id="photo" type="text" {...register("photo")} />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              <FcGoogle className="text-xl" />
              Register with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
