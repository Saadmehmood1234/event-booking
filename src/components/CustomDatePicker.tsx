import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export function ShadCnDatePicker({ field, error }: { field: any; error?: string }) {
  return (
    <div className="relative space-y-1">
      <label className="block text-sm font-medium">Event Date</label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent flex justify-between items-center"
            type="button"
          >
            {field.value ? field.value.toLocaleDateString() : "Select a date"}
            <CalendarIcon className="w-5 h-5 text-gray-500" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto bg-white shadow-lg border rounded-lg z-50"
        >
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
