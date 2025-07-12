import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const QuotePage = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    coverageAmount: "",
    duration: "",
    smoker: "no",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const policy = location.state?.policyTitle || {};
  const policyId = location.state?.policyId || "";

  const [premium, setPremium] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePremium = () => {
    const coverage = Number(formData.coverageAmount);
    const age = Number(formData.age);
    const smokerFactor = formData.smoker === "yes" ? 1.5 : 1;
    const ageFactor = age > 30 ? 1 + (age - 30) * 0.01 : 1;

    if (!coverage || !age || !formData.duration) {
      alert("Please fill all required fields");
      return;
    }

    const baseMonthly = coverage * 0.0005;
    const monthlyPremium = baseMonthly * smokerFactor * ageFactor;
    const annualPremium = monthlyPremium * 12;

    setPremium({
      monthly: monthlyPremium.toFixed(2),
      annual: annualPremium.toFixed(2),
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculatePremium();
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Life Insurance Quote</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Age */}
        <div>
          <label className="block font-medium mb-1">
            Age <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="age"
            min="18"
            max="100"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Coverage Amount */}
        <div>
          <label className="block font-medium mb-1">
            Coverage Amount <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="coverageAmount"
            min="100000"
            step="10000"
            value={formData.coverageAmount}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Example: 2000000"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium mb-1">
            Duration (years) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="duration"
            min="1"
            max="30"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Smoker */}
        <div>
          <label className="block font-medium mb-1">Smoker</label>
          <select
            name="smoker"
            value={formData.smoker}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="no">Non-smoker</option>
            <option value="yes">Smoker</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            type="submit"
            className="w-full sm:w-1/2 bg-orange-600 text-white font-semibold py-3 rounded hover:bg-orange-700"
          >
            Calculate Premium
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-1/2 border-[#ff8c00] text-[#ff8c00] hover:bg-[#ff8c00]/10"
            onClick={() =>
              navigate("/application", {
                state: {
                  policyId,
                  policy,
                },
              })
            }
          >
            Apply for Policy
          </Button>
        </div>
      </form>

      {/* Modal for Premium */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#ff8c00]">Estimated Premium</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-2">
            {premium && (
              <>
                <p className="text-lg">
                  Monthly: <span className="font-bold">{premium.monthly} BDT</span>
                </p>
                <p className="text-lg">
                  Annual: <span className="font-bold">{premium.annual} BDT</span>
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuotePage;
