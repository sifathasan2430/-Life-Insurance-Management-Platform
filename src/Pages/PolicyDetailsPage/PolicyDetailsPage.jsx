import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import secureAxios from '../../utils/firebaseAxios';

const fetchPolicy = async (id) => {
  const res = await secureAxios.get(`/policy/${id}`);
  return res.data;
};

const PolicyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: policy, isLoading, isError } = useQuery({
    queryKey: ['policy', id],
    queryFn: () => fetchPolicy(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoaderCircle className="animate-spin w-8 h-8 text-[#ff8c00]" />
      </div>
    );
  }

  if (isError || !policy) {
    return <div className="text-center mt-10 text-red-600">Policy not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Column - Image */}
        {policy.image && (
          <div className="w-full">
            <img
              src={'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgOQMYLCT-LJ0onoJtdi6j2cap51fdF_6adhlBJ0ScIK7xC54WfT4OEkUtX8Oteii9k8KsJNburtilGfWRsSUyl4Ctei1IM9LYVOyqP01fgNGLPXYw-egReJFE6moYdT28BWLDlHVlx6W0/s1600/MediShield+Life.jpg'}
              alt={policy.title}
              className="rounded-lg w-full max-h-[500px] object-cover shadow-md"
            />
          </div>
        )}

        {/* Right Column - Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{policy.title}</h1>
            <Badge className="mt-2 bg-[#ff8c00] text-white">{policy.category}</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Coverage</p>
              <p className="text-base font-medium text-gray-800">{policy.coverage}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="text-base font-medium text-gray-800">{policy.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Eligibility</p>
              <p className="text-base font-medium text-gray-800">
                Age {policy.minAge} - {policy.maxAge}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Base Premium</p>
              <p className="text-base font-medium text-gray-800">{policy.baseRate}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{policy.description}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              className="bg-[#ff8c00] text-white hover:bg-[#e67300]"
              onClick={() => navigate(`/quote/${policy._id}`,{
                state: {
    policyTitle: policy.title,
    policyId: policy._id, 
  },
              })}
            >
              Get Quote
            </Button>
            <Button
              variant="outline"
              className="border-[#ff8c00] text-[#ff8c00] hover:bg-[#ff8c00]/10"
              onClick={() => navigate("/application", {
  state: {
    policyId: policy._id,
    policyTitle: policy.title,
  },
})}
            >
              Apply for Policy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailsPage;
