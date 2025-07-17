import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Corrected from 'react-router'
import UserAuthContext from "@/Context/UserAuthContext";
import secureAxios from "@/utils/firebaseAxios"; // ✅ You missed this import
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

const Login = () => {
  const { signInUser, loginWithGoogle } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
   const redirectByRole = (role) => {
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "agent") navigate("/agent/dashboard");
    else navigate("/");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await signInUser(data.email, data.password);
      const user = result.user; // ✅ Now we have access to user.email
      
 
      // ✅ Get role from backend
      const res = await secureAxios.get(`/users?email=${user.email}`);
      const role = res.data.role;
      redirectByRole(role || "customer");
await secureAxios.post('/jwt', { email: user.email });
      toast.success("Login successful!");

      // ✅ Redirect based on role
    

    } catch (err) {
      console.error("Login error:", err);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
     setLoading(true);
     try {
       const result = await loginWithGoogle();
       const user = result.user;
      
        
       // Check if user exists in DB
       const res = await secureAxios.get("/users", {
         params: { email: user.email, checkExists: "true" },
       });
 
       if (!res.data.exists) {
         // Create user if not exists
         await secureAxios.post("/users", {
           name: user.displayName,
           email: user.email,
           photo: user.photoURL || "",
           role: "customer",
           created_at: new Date().toISOString(),
         });
       }
 
       // Get user info for role redirect
       const userInfo = await secureAxios.get("/users", {
         params: { email: user.email },
       });
        await secureAxios.post('/jwt', { email: user.email });
 
       toast.success("Google login successful!");
       redirectByRole(userInfo.data.role || "customer");
     } catch (err) {
       toast.error("Google login failed!");
       console.error(err);
     } finally {
       setLoading(false);
     }
   };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl md:text-3xl font-semibold text-gray-800">
            Login to Your Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <Label className='my-2' htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label className='my-2' htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <FcGoogle className="text-xl" />
              Login with Google
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?
            <Link to="/register" className="text-orange-600 font-medium ml-1 hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
