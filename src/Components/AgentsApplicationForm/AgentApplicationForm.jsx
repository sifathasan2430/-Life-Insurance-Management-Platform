import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import secureAxios from "../../utils/firebaseAxios";

const AgentApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    resumeLink: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      status: "pending",
      appliedAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const res = await secureAxios.post("/agent-applications", payload);
      if (res.status === 200 || res.status === 201) {
        toast.success("Application submitted! You’ll be contacted after review.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          experience: "",
          resumeLink: "",
        });
      } else {
        toast.error("Failed to submit application.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Apply to Become an Insurance Agent</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
        />
        <Input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <Input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Current Address"
          required
        />
        <Textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Describe your insurance or sales experience"
          rows={4}
          required
        />
        <Input
          name="resumeLink"
          value={formData.resumeLink}
          onChange={handleChange}
          placeholder="Link to your resume (Google Drive, etc)"
        />

        <Button
          type="submit"
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 text-white w-full"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
};

export default AgentApplicationForm;