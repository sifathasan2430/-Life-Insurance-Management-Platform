import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const EditPolices = ({ edit = false, initialData = {}, onSubmit }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  })

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true)
      await onSubmit(data)
      setOpen(false)
      reset()
    } catch (error) {
      console.error("Submit failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) reset()
    }}>
      <DialogTrigger asChild>
        <Button variant="default">{edit ? "Edit Policy" : "Add Policy"}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle>{edit ? "Edit Policy" : "Add New Policy"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            {[
              { name: "title", label: "Title", type: "text", placeholder: "Title" },
              { name: "subtitle", label: "Subtitle", type: "text", placeholder: "Subtitle" },
              { name: "category", label: "Category", type: "text", placeholder: "Category" },
              { name: "maxAge", label: "Max Age", type: "number", placeholder: "Max Age" },
              { name: "minAge", label: "Min Age", type: "number", placeholder: "Min Age" },
              { name: "coverage", label: "Coverage Range", type: "text", placeholder: "Coverage Range" },
              { name: "duration", label: "Duration", type: "text", placeholder: "Duration" },
              { name: "baseRate", label: "Base Premium Rate", type: "text", placeholder: "Base Premium Rate" },
              { name: "currency", label: "Currency", type: "text", placeholder: "USD" },
              { name: "image", label: "Image URL", type: "text", placeholder: "https://example.com/image.jpg" },
            ].map((field) => (
              <div key={field.name} className="grid gap-1.5">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name, { required: `${field.label} is required` })}
                />
                {errors[field.name] && (
                  <p className="text-sm text-red-500">{errors[field.name].message}</p>
                )}
              </div>
            ))}

            {/* Description */}
            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Payment Frequency */}
            <div className="grid gap-1.5">
              <Label htmlFor="paymentFrequency">Payment Frequency</Label>
              <select
                id="paymentFrequency"
                {...register("paymentFrequency", { required: "Payment Frequency is required" })}
                className="border border-input bg-background px-3 py-2 rounded-md"
              >
                <option value="">Select Payment Frequency</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              {errors.paymentFrequency && (
                <p className="text-sm text-red-500">{errors.paymentFrequency.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : edit ? "Update" : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditPolices
