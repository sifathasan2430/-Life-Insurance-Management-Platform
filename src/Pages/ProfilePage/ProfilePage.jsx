import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import secureAxios from "../../utils/firebaseAxios";
import { BadgeCheck, Mail, Clock, Save, UserRound } from "lucide-react";
import UserAuthContext from "../../Context/UserAuthContext";

const ProfilePage = () => {
  const { user} = useContext(UserAuthContext); // from Firebase context
  const queryClient = useQueryClient();

  const email = user?.email;

  // Fetch user data from your DB
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const { data } = await secureAxios.get(`/users?email=${email}`);
      return data;
    },
    enabled: !!email,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      photoURL: "",
    },
  });

  // Update form when data is loaded
  React.useEffect(() => {
    if (userInfo) {
      setValue("name", userInfo.name || "");
      setValue("photoURL", userInfo.photoURL || "");
    }
  }, [userInfo, setValue]);

  // Mutation for update
  const mutation = useMutation({
    mutationFn: async (data) =>
      secureAxios.patch(`/users/update/${email}`, {
        name: data.name,
        photoURL: data.photoURL,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", email]);
      alert(" Profile updated!");
    },
    onError: () => {
      alert(" Failed to update profile.");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Profile</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow space-y-6"
      >
        {/* Photo URL Input */}
        <div className="flex items-center gap-4">
          <img
            src={
              userInfo?.photoURL ||
              user?.photoURL ||
              `https://ui-avatars.com/api/?name=${userInfo?.name || "User"}`
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <input
            type="text"
            placeholder="Photo URL"
            {...register("photoURL")}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* Name Input */}
        <div>
          <label className="block font-medium text-sm mb-1">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="border rounded px-3 py-2 w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-sm mb-1">Email</label>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded text-gray-600">
            <Mail className="w-4 h-4" />
            {email}
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium text-sm mb-1">Role</label>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff8c00] text-white text-xs font-semibold rounded-full">
            <BadgeCheck className="w-4 h-4" />
            {userInfo?.role || "Customer"}
          </div>
        </div>

        {/* Last Login */}
        <div>
          <label className="block font-medium text-sm mb-1">Last Login</label>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded text-gray-600">
            <Clock className="w-4 h-4" />
            {new Date(user?.metadata?.lastSignInTime).toLocaleString()}
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          className="bg-[#ff8c00] hover:bg-[#e67a00] text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
};

export default ProfilePage;
