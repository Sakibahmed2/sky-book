/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import { useCreateBookingMutation } from '@/redux/api/bookingApi'
import { useGetFlightByIdQuery } from '@/redux/api/flightApi'
import { cn } from '@/utils/cn'
import { getFormLocalStorage } from '@/utils/localStorage'
import { MapPin, Plane, Users } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const BookingFlight = () => {

    const { flightId } = useParams()

    const { data, isLoading } = useGetFlightByIdQuery(flightId);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [reservationTimer, setReservationTimer] = useState<number>(0)
    const [createBooking] = useCreateBookingMutation()


    const flight = data?.data?.flight
    const seats = data?.data?.seats





    useEffect(() => {
        if (!reservationTimer) return;

        const interval = setInterval(() => {
            setReservationTimer(prev => {
                if (prev <= 1) {
                    setSelectedSeats([]);
                    toast.error("Your seat reservation has expired. Please select a seat again.");
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [reservationTimer]);

    if (isLoading) {
        return <Loading />
    }


    const handleSelectSeat = (seatNumber: string) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seatNumber)) {
                return prev.filter((s) => s !== seatNumber);
            }
            return [...prev, seatNumber];
        });

        setReservationTimer(120);
    }


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    const handleConfirmBooking = async () => {
        const toastId = toast.loading("Creating booking...");
        const token = getFormLocalStorage('token')

        const payload = {
            flightId: flight._id,
            seatIds: selectedSeats,
        }

        if (!token) {
            toast.error("You must be logged in to book a flight", { id: toastId })
            return;
        }

        try {

            const res = await createBooking({ payload, token }).unwrap()

            if (res?.ok) {
                toast.success(res?.message, { id: toastId })
                setSelectedSeats([]);
                setReservationTimer(0);

            }
        } catch (err) {
            console.log(err)
            toast.error("Failed to create booking", { id: toastId })
        }
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Flight Details */}

            <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-zinc-300">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">{flight.airline}</h2>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{flight.airline}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">Flight Details</p>
                </div>

                {/* In the flight details section, replace with: */}
                <div className="p-6 space-y-4">
                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                            <p className="font-medium">{flight.origin}</p>
                            <p className="text-sm text-gray-600">{flight.time}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center py-2">
                        <Plane className="h-6 w-6 text-blue-600" />
                    </div>

                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                            <p className="font-medium">{flight.destination}</p>
                            <p className="text-sm text-gray-600">Arrival</p>
                        </div>
                    </div>

                    <div className="border-t border-zinc-300 pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Flight Number:</span>
                            <span className="font-medium">{flight.flight_number}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Date:</span>
                            <span className="font-medium">{flight.date}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Price:</span>
                            <span className="text-xl font-bold text-blue-600">${flight.price}</span>
                        </div>
                    </div>

                    {/* Rest of the reservation timer and booking button code remains the same */}

                    {
                        selectedSeats.length > 0 && (
                            <Button size='md' className='w-full' variant='outline'>
                                Seat reserved for {formatTime(reservationTimer)}
                            </Button>
                        )
                    }
                    <Button size='md' className='w-full' onClick={() => handleConfirmBooking()}>
                        Confirm Booking
                    </Button>
                </div>

            </div >

            {/* Seat Map */}
            <div className="lg:col-span-2" >
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b border-zinc-300">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            Select Your Seat
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">Click on an available seat to reserve it for 2 minutes</p>
                    </div>

                    <div className="p-6">
                        <div className="mb-4 flex items-center justify-center space-x-6 text-sm">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                                <span>Available</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                                <span>Occupied</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                                <span>Selected</span>
                            </div>
                        </div>


                    </div>

                    <div className='grid grid-cols-8 gap-2 p-2 place-items-start '>
                        {
                            seats.map((seat: any) => (
                                <button
                                    key={seat._id}
                                    className={cn(
                                        "w-8 h-8 rounded text-xs font-medium transition-colors cursor-pointer",
                                        seat.isBooked
                                            ? "bg-red-500 text-white cursor-not-allowed"
                                            : selectedSeats.includes(seat._id)
                                                ? "bg-blue-500 text-white"
                                                : "bg-green-500 text-white hover:bg-green-600"
                                    )}
                                    onClick={() => handleSelectSeat(seat._id)}
                                >
                                    {seat.seatNumber}
                                </button>
                            ))}

                    </div>

                </div>
            </div >
        </div >
    )
}

export default BookingFlight