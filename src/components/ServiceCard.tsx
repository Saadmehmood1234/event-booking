import Image from "next/image";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/Button";
import { services } from "@/lib/data/Services";
import Link from "next/link";
interface Service {
  id: number;
  name: string;
  type: string;
  price: number;
  capacity?: number;
  image: string;
  features: string[];
}

interface ServiceCardProps {
  service: Service;
}
const ServiceCard = ({ service }: ServiceCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };
  return (
    <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative h-60">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40" />
        <div className="absolute top-4 right-4 bg-amber-400 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold">
          {service.type}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-purple-900">
            {service.name}
          </h3>
          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
            <IndianRupee className="h-5 w-5 text-purple-700" />
            <span className="text-lg font-bold text-purple-900">
              {formatPrice(service.price)}
            </span>
            <span className="text-sm text-purple-600">
              {service.type === "catering" ? "/plate" : "/day"}
            </span>
          </div>
        </div>
        {service.capacity && (
          <div className="flex items-center gap-2 mb-4 text-purple-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
            </svg>
            <span className="text-sm">
              Capacity: {service.capacity.toLocaleString()} guests
            </span>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {service.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-purple-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9.9997 15.1709L19.1927 5.97803L20.6077 7.39203L9.9997 18L3.63574 11.636L5.04974 10.222L9.9997 15.1709Z"></path>
              </svg>
              <span className="text-sm text-purple-900">{feature}</span>
            </div>
          ))}
        </div>
       <Link href={`/register/${service.id}`}>
       <Button className="w-full bg-purple-900 text-white hover:bg-purple-800 h-12 text-lg">
          Book Now
        </Button>
       </Link>
      </div>
    </div>
  );
};

export const ServiceGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 font-playfair text-purple-900">
        Our Premium Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
