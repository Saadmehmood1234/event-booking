import { Service } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { services } from "../../lib/data/Services";

interface ServiceTableType {
  services: Service[];
}

export function ServiceTable({ services }: ServiceTableType) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Type</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Description</th>
            <th className="py-3 px-4 text-left">Features</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-purple-600">
                No Service found
              </td>
            </tr>
          ) : (
            services.map((service: Service) => (
              <tr key={service.id} className="border-b">
                <td className="py-3 px-4">{service.name}</td>
                <td className="py-3 px-4">{service.type}</td>
                <td className="py-3 px-4 capitalize">₹{service.price}</td>
                <td className="py-3 px-4">{service.description}</td>
                <td className="py-3 px-4 flex flex-wrap gap-2">
                  {service.features.map((feature, index) => (
                    <span key={index} className="bg-purple-200 text-purple-700 px-2 py-1 rounded-md">
                      {feature}
                    </span>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
