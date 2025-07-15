import { useQuery } from "@tanstack/react-query";
import secureAxios from "../../utils/firebaseAxios";
 // or however you get user info
import { useContext } from "react";
import { User } from "lucide-react";
import UserAuthContext from "../../Context/UserAuthContext";

const AgentStatusSection = () => {
  const { user } = useContext(UserAuthContext)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["agentApplication", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await secureAxios.get(`/agent-applications/by-email?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading status...</p>;
  if (isError) return <p>Error loading your application status.</p>;

  if (!data) return null;

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-xl font-semibold mb-2">Agent Application Status</h2>
      <p>Status: <span className="font-medium">{data.status}</span></p>

      {data.status === "rejected" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded">
          <p className="text-red-700 font-medium">Feedback from Admin:</p>
          <p className="text-gray-700 mt-1">{data.rejectionMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AgentStatusSection;