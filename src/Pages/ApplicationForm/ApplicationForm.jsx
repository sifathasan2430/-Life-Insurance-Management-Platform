import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import secureAxios from '../../utils/firebaseAxios';
import Swal from 'sweetalert2';

const ApplicationForm = () => {
  const { state } = useLocation();
console.log(state)
  const policy = state?.policyTitle;
  const policyId = state?.policyId;


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    nid: '',
    nomineeName: '',
    nomineeRelation: '',
    healthConditions: [],
  });

  const healthOptions = ['Diabetes', 'Heart Disease', 'Cancer', 'None'];

  const handleCheckboxChange = (condition) => {
    setFormData((prev) => {
      const isChecked = prev.healthConditions.includes(condition);
      return {
        ...prev,
        healthConditions: isChecked
          ? prev.healthConditions.filter((c) => c !== condition)
          : [...prev.healthConditions, condition],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1️⃣ Fetch policy details using policyId
    const policyRes = await secureAxios.get(`/policy/${policyId}`);
    const policyData = policyRes.data;

    // 2️⃣ Merge everything into the final application data
    const payload = {
      ...formData,
      policyTitle: policyData.title,
      policyId: policyId,
      baseRate: policyData.baseRate,
      paymentFrequency: policyData.paymentFrequency,
      currency: policyData.currency,
      status: 'Pending',
      assignedAgent: null,
      createdAt: new Date().toISOString(),
    };

    // 3️⃣ Submit application
    const res = await secureAxios.post('/applications', payload);

    if (res.status === 200 || res.status === 201) {
      Swal.fire({
        title: 'Success!',
        text: 'Application submitted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff8c00'
      });
    } else {
      Swal.fire({
        title: 'Failed!',
        text: 'Something went wrong while submitting.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: 'Error!',
      text: 'An unexpected error occurred.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};


  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Apply for: {policy}</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Personal Info */}
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nid">NID / SSN</Label>
          <Input name="nid" value={formData.nid} onChange={handleChange} required />
        </div>

        {/* Nominee Info */}
        <div className="grid gap-2">
          <Label htmlFor="nomineeName">Nominee Name</Label>
          <Input name="nomineeName" value={formData.nomineeName} onChange={handleChange} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nomineeRelation">Nominee Relationship</Label>
          <Input name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} required />
        </div>

        {/* Health Disclosure */}
        <div className="grid gap-2">
          <Label>Health Conditions</Label>
          <div className="flex flex-wrap gap-3">
            {healthOptions.map((condition) => (
              <label key={condition} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.healthConditions.includes(condition)}
                  onChange={() => handleCheckboxChange(condition)}
                />
                {condition}
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" className="mt-4 bg-orange-600 text-white hover:bg-orange-700">
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default ApplicationForm;
