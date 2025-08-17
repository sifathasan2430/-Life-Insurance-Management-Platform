import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import secureAxios from "@/utils/firebaseAxios";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import Section from "../Section/Section";
const Newsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await secureAxios.post("/newsletter", data);
      toast.success("Subscribed successfully!");
      reset();
    } catch (err) {
      console.error("Newsletter subscription failed", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Section className="">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#8c4a27]">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-8">Stay updated with our latest news and offers.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: "Name is required" })}
            className="bg-white text-gray-800 border-gray-300 focus:ring-[#ff9a68]"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          <Input
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="bg-white text-gray-800 border-gray-300 focus:ring-[#ff9a68]"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          <Button
            type="submit"
            className="bg-[#ff9a68] hover:bg-[#e67c00] text-white w-full"
          >
            <Mail className="w-4 h-4 mr-2" /> Subscribe
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default Newsletter;