"use client";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { z } from "zod";
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { User, Mail, Phone, CalendarDays } from "lucide-react";
import { services } from "@/lib/data/Services";
import { useState, useEffect } from "react";
import { createBooking } from "@/actions/register.action";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Service } from "@/lib/types";
const formSchema = z.object({
  guest: z.string().min(2),
  phone: z.string().min(10),
  eventDate: z.date(),
  guests: z.number().min(1),
  eventType: z.enum(["wedding", "corporate", "birthday", "other"]),
  duration: z.number().min(1),
  customRequests: z.string().optional(),
});

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;
  const serviceName = services.filter((serv) => serv.id === Number(serviceId));
  console.log(serviceName[0].name);
  const [serviceData, setServiceData] = useState<Service | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guest: "",
      // email: "",
      phone: "",
      guests: 100,
      duration: 1,
      eventDate: new Date(),
      eventType: "wedding",
      customRequests: "",
    },
  });

  useEffect(() => {
    if (serviceId) {
      const serviceByID = services.find(
        (service) => service.id === Number(serviceId)
      );
      setServiceData(serviceByID || null);
    }
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = form.getValues();

    try {
      const res = await createBooking({
        serviceId,
        serviceName: serviceName[0].name,
        ...values,
      });

      if (res?.error) {
        toast.error("Failed to create booking. Please try again.");
        console.error("Booking error:", res.error);
        return;
      }

      toast.success("Booking created successfully!");
      form.reset(); // Clear the form
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-purple-900 mb-4 font-playfair">
              Book Your Perfect Event
            </h1>
            <p className="text-lg text-purple-700">
              Fill in the details to reserve your dream venue and services
            </p>
          </header>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="pb-4 border-b border-purple-100">
                  <h2 className="text-xl font-semibold text-purple-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                      1
                    </span>
                    Contact Information
                  </h2>
                </div>

                {/* <Input
                  label="Full Name"
                  {...form.register("name")}
                  error={form.formState.errors.name}
                  icon={<User className="h-5 w-5 text-purple-500" />}
                />
                */}
                <Input
                  label="Guest"
                  type="guest"
                  {...form.register("guest")}
                  error={form.formState.errors.guest}
                  icon={<Mail className="h-5 w-5 text-purple-500" />}
                />
                <Input
                  label="Duration (Days)"
                  type="number"
                  {...form.register("duration", { valueAsNumber: true })}
                  error={form.formState.errors.duration}
                  icon={<CalendarDays className="h-5 w-5 text-purple-500" />}
                />
                <Input
                  label="Phone"
                  type="tel"
                  {...form.register("phone")}
                  error={form.formState.errors.phone}
                  icon={<Phone className="h-5 w-5 text-purple-500" />}
                />
              </div>
              <div className="space-y-6">
                <div className="pb-4 border-b border-purple-100">
                  <h2 className="text-xl font-semibold text-purple-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                      2
                    </span>
                    Event Details
                  </h2>
                </div>

                <Select
                  label="Event Type"
                  options={[
                    { value: "wedding", label: "Wedding" },
                    { value: "corporate", label: "Corporate" },
                    { value: "birthday", label: "Birthday" },
                    { value: "other", label: "Other" },
                  ]}
                  {...form.register("eventType")}
                  error={form.formState.errors.eventType}
                />
                <label className="block text-sm font-medium text-purple-600">
                  Event Date
                </label>
                <input
                  type="date"
                  {...form.register("eventDate")}
                  className="w-full px-4 py-2 border rounded-lg text-purple-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {form.formState.errors.eventDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.eventDate.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div className="pb-4 border-b border-purple-100">
                <h2 className="text-xl font-semibold text-purple-900 flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    3
                  </span>
                  Additional Information
                </h2>
              </div>
              <Textarea
                label="Special Requests"
                {...form.register("customRequests")}
                error={form.formState.errors.customRequests}
                rows={4}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg font-semibold rounded-xl transition-transform hover:scale-[1.02]"
            >
              Confirm Booking
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
