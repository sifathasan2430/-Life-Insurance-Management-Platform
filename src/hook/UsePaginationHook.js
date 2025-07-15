import { useQuery } from "@tanstack/react-query";
import secureAxios from "@/utils/firebaseAxios";

const UsePaginationHook = (page, limit, search, category) => {
  return useQuery({
    queryKey: ["policies", page, limit, search, category],
    queryFn: async () => {
      const res = await secureAxios.get("/policies", {
        params: { page, limit, search, category },
      });
      return res.data;
    },
    keepPreviousData: true,
  });
};

export default UsePaginationHook;
