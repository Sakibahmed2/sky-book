'use client'

import Button from '@/components/ui/Button'
import FlightCard from '@/components/ui/FlightCard'
import { useGetFlightsQuery } from '@/redux/api/flightApi'
import { TFlight } from '@/types/global'
import { Plane, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const FlightsPage = () => {
    const [searchDestination, setSearchDestination] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchDate, setSearchDate] = useState('');


    const { data, isLoading } = useGetFlightsQuery({
        destination: searchDestination,
        origin: searchLocation,
        date: searchDate,
    });


    if (isLoading) {
        return <div className="text-center py-8">Loading flights...</div>
    }

    const flights = data?.data?.flights || [];


    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Flights</h1>
                    <p className="text-gray-600">Find and book your perfect flight</p>
                </div>

                <Link href="/flights/add">
                    <Button>
                        Add Flight
                    </Button>
                </Link>
            </div>

            {/* Search and Filters */}
            <div className="rounded-lg  mb-8 border border-zinc-300 p-6">

                <h2 className="text-lg font-semibold text-gray-900 flex items-center ">
                    <Search className="h-5 w-5 mr-2" />
                    Search & Filter Flights
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

                    <input
                        type="text"
                        placeholder="Search flights, destinations..."
                        value={searchDestination}
                        onChange={(e) => setSearchDestination(e.target.value)}
                    />
                    <input
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Filter by location..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                    />

                </div>
            </div>

            {/* Flights List */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {flights.length === 0 ? (
                    <div className="text-center py-12 col-span-12">
                        <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
                        <p className="text-gray-600">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    flights.map((flight: TFlight) => (
                        <FlightCard flight={flight} key={flight._id} />
                    ))
                )}
            </div>
        </main >
    )
}

export default FlightsPage