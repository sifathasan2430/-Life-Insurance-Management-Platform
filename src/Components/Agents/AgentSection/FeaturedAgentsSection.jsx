import React from "react";
import AgentCard from "../AgentsCard/AgentCard";
import { useQuery } from "@tanstack/react-query";
import secureAxios from "../../../utils/firebaseAxios";

const fetchFeaturedAgents = async () => {
  const response = await secureAxios.get("/users");

  // Optional debug log
  console.log("Fetched users:", response.data);

  // Only include agents with `featured: true`
  return response.data.filter((agent) => agent.featured === true);
};

const FeaturedAgentsSection = () => {
  const {
    data: featuredAgents = [], // Default to empty array
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featuredAgents"], // ✅ CORRECT format!
    queryFn: fetchFeaturedAgents,
    retry: false, // Prevents retry on error for debugging
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>Loading featured agents...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    console.error("React Query Error:", error);
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Featured Insurance Agents
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our top-rated insurance professionals ready to help you find the perfect coverage.
          </p>
        </div>

        {/* Grid or Fallback */}
        {featuredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAgents.map((agent) => (
              <AgentCard key={agent.email} agent={agent} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No featured agents found.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedAgentsSection;
