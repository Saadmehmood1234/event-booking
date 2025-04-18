import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup, // Added SelectGroup import
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// import { Label } from "@radix-ui/react-select"; // Ensure the correct Label import

interface StatusModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (status: string, paymentStatus: string) => void;
  currentStatus: string;
  currentPaymentStatus: string;
}

const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    color: "bg-green-100 text-green-800",
  },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
];

const paymentStatusOptions = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "completed",
    label: "Completed",
    color: "bg-green-100 text-green-800",
  },
  { value: "failed", label: "Failed", color: "bg-red-100 text-red-800" },
];

export const StatusModal = ({
  isOpen,
  onOpenChange,
  onSubmit,
  currentStatus,
  currentPaymentStatus,
}: StatusModalProps) => {
  const [status, setStatus] = useState(currentStatus);
  const [paymentStatus, setPaymentStatus] = useState(currentPaymentStatus);

  const handleSubmit = () => {
    onSubmit(status, paymentStatus);
    onOpenChange(false); // Close modal
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white rounded-lg p-6 shadow-lg">
        <DialogTitle className="text-xl font-semibold text-gray-900">
          Update Booking Status
        </DialogTitle>
        <DialogDescription className="mt-2 text-gray-600">
          Update the booking and payment status for this order.
        </DialogDescription>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="mt-2 border-2 rounded-md py-2 px-3 text-gray-900">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Badge className={option.color}>{option.label}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Payment Status</label>
            <Select value={paymentStatus} onValueChange={setPaymentStatus}>
              <SelectTrigger className="mt-2 border-2 rounded-md py-2 px-3 text-gray-900">
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                {paymentStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Badge className={option.color}>{option.label}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-6 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
