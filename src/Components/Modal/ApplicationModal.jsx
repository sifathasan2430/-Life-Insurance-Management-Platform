import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const ApplicationModal = () => {
  const { state } = useLocation();
  const policyTitle = state?.policyTitle;
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
    const payload = {
      ...formData,
      policyTitle,
      policyId,
      status: 'Pending',
    };

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Application submitted successfully!');
      } else {
        alert('Failed to submit.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 bg-orange-600 text-white font-semibold py-2 px-6 rounded hover:bg-orange-700 transition">
          Apply for Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Apply for: {policyTitle}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
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
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
