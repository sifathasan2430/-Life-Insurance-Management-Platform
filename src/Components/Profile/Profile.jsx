import React, { useContext, useEffect, useState } from "react";
import secureAxios from "../../utils/firebaseAxios";
import UserAuthContext from "../../Context/UserAuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const { user, updateUserPhoto, updateUserProfile } = useContext(UserAuthContext);
  const queryClient = useQueryClient();
console.log(user)
  // Fetch backend user (mobile + address)
  const { data: BackendUser } = useQuery({
    queryKey: ["backendUser", user?.email],
    queryFn: async () => {
      const response = await secureAxios.get(`/users?email=${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  // Local states
  const [editingField, setEditingField] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [profileName, setProfileName] = useState(user?.displayName || "");
  const [profileImage, setProfileImage] = useState(user?.photoURL
 || "");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");

  // Sync BackendUser data after load
  useEffect(() => {
    if (BackendUser) {
      setMobileNumber(BackendUser.mobileNumber || "");
      setAddress(BackendUser.address || "");
    }
  }, [BackendUser]);

  // --- Firebase mutation (Name + Image) ---
  const handleFirebaseUpdate = async () => {
    await updateUserProfile(profileName, profileImage);
    queryClient.invalidateQueries(["backendUser"]);
  };

  // --- Backend mutation (Phone + Address) ---
  const updateBackendMutation = useMutation({
    mutationFn: async (updatedData) => {
      const response = await secureAxios.patch(`/users/update?email=${user?.email}`, {
        email: user?.email,
        ...updatedData,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["backendUser"]);
      setEditingField("");
    },
  });

  const handleSave = () => {
    if (editingField === "phone") {
      updateBackendMutation.mutate({ mobileNumber: inputValue });
    } else if (editingField === "address") {
      updateBackendMutation.mutate({ address: inputValue });
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-8 max-w-md mx-auto mt-10 border-t-4 border-[#ff9a68]">
      {/* Firebase profile section */}
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28">
          <img
            src={user?.photoURL
}
            alt="User"
            className="w-28 h-28 rounded-full object-cover border-2 border-[#ff9a68]"
          />
        </div>

        <input
          type="text"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          className="mt-2 border rounded px-3 py-1"
        />
        <button
          onClick={handleFirebaseUpdate}
          className="mt-2 bg-[#ff9a68] text-white px-4 py-2 rounded hover:bg-[#ff7a45]"
        >
          Update Profile (Firebase)
        </button>

        <p className="text-gray-500 mt-2">{user?.email}</p>
      </div>

      {/* Backend fields */}
      <div className="mt-8 space-y-5">
        {[
          { key: "phone", label: "Phone", value: mobileNumber },
          { key: "address", label: "Address", value: address },
        ].map((field) => (
          <div key={field.key} className="flex flex-col">
            <h3 className="text-lg font-semibold">{field.label}</h3>

            {editingField === field.key ? (
              <div className="flex space-x-2 mt-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#ff9a68]"
                />
                <button
                  onClick={handleSave}
                  className="bg-[#ff9a68] text-white px-4 py-2 rounded hover:bg-[#ff7a45]"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center mt-1">
                <p className="text-gray-600">{field.value || "Not available"}</p>
                <button
                  onClick={() => {
                    setEditingField(field.key);
                    setInputValue(field.value || "");
                  }}
                  className="text-[#ff9a68] hover:underline"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
