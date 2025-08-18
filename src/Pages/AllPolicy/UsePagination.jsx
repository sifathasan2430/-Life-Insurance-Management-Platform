import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
const UsePaginationHook = (page, limit, search, category, sort) => {
  return useQuery({
    queryKey: ["policies", page, limit, search, category, sort],
    queryFn: async () => {
      const { data } = await axios.get("https://life-insurance-server.vercel.app/api/policies", {
        params: { page, limit, search, category, sort },
      });
      return data;
    },
  });
};
export default UsePaginationHook
