import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { Calendar, MapPin, Plane, Users } from "lucide-react";
import Link from "next/link";

export const features = [
  {
    icon: Calendar,
    color: "text-blue-600",
    title: "Easy Booking",
    description: "Book flights in just a few clicks with our intuitive interface",
  },
  {
    icon: MapPin,
    color: "text-green-600",
    title: "Global Destinations",
    description: "Fly to hundreds of destinations worldwide",
  },
  {
    icon: Users,
    color: "text-purple-600",
    title: "Seat Selection",
    description: "Choose your preferred seat with our interactive seat map",
  },
  {
    icon: Plane,
    color: "text-orange-600",
    title: "Real-time Updates",
    description: "Get instant notifications about your flight status",
  },
];


export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <main className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 sm:text-5xl md:text-6xl">
            Book Your Next Flight with Ease
          </h1>
          <p className="mt-3 max-w-md mx-auto  text-zinc-500 md:mt-5 text-xs md:text-lg md:max-w-3xl">
            Discover the world with our seamless flight booking experience. Whether you&lsquo;re traveling for business or leisure, we make it easy to find and book your perfect flight.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">


          {
            features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-lg drop-shadow-lg p-6 hover:drop-shadow-xl transition-all ease-in-out border border-zinc-300">
                <div className="text-center">
                  <feature.icon className={cn("h-8 w-8  mx-auto mb-4",
                    feature.color
                  )} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))
          }


        </div>

        <div className="text-center">
          <Link href="/flights">
            <Button size="lg">
              Browse Flights
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
