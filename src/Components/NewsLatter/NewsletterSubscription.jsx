import { useForm } from "react-hook-form";
import secureAxios from "@/utils/firebaseAxios"; // Adjust if needed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NewsletterSubscription = () => {
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
      console.error("Subscription failed", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-orange-50 py-10 px-4 rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
        Subscribe to our Newsletter
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div>
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
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <Button type="submit" className="bg-[#ff8c00] hover:bg-[#e67c00] w-full text-white">
          Subscribe
        </Button>
      </form>
    </section>
  );
};

export default NewsletterSubscription;
