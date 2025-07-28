'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserInfo } from '@/app/services/authService'
import { useDeleteFlightMutation } from '@/redux/api/flightApi'
import { TFlight } from '@/types/global'
import { Edit, MapPin, Plane, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import Button from './Button'

const FlightCard = ({ flight }: { flight: TFlight }) => {

    const [deleteFlight,] = useDeleteFlightMutation()



    const userInfo = getUserInfo() as any

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem('token')

        if (!token) {
            return;
        }

        try {
            const res = await deleteFlight({ id, token }).unwrap()

            if (res?.ok) {
                toast.success(res?.message)
            }
        } catch (err: any) {
            console.error("Error deleting flight:", err)
            toast.error(err?.data?.message || "Failed to delete flight")
        }
    }

    return (
        <div className="border border-zinc-300 rounded-lg  p-6 flex flex-col justify-between h-full">
            {/* Top: Flight Info */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {flight.airline}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                            <p className="font-medium">{flight.origin}</p>
                            <p className="text-sm text-gray-600">{flight.time}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <Plane className="h-6 w-6 text-indigo-600 mx-auto mb-1" />
                            <p className="text-xs text-gray-500">{flight.date}</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                            <p className="font-medium">{flight.destination}</p>
                            <p className="text-sm text-gray-600">Arrival</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom: Price + Actions */}
            <div className="flex items-center justify-between mt-4">
                <p className="text-2xl font-bold text-indigo-600">${flight.price}</p>

                <div className="flex items-center gap-2">

                    {
                        userInfo?.role === 'ADMIN' ? (
                            <>


                                <Button
                                    variant="outline"
                                    className="bg-red-50 border-red-300 text-red-500 hover:bg-red-100"
                                    onClick={() => handleDelete(flight._id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <Link href={`/booking/${flight._id}`}>
                                <Button>
                                    Book Now
                                </Button>
                            </Link>
                        )
                    }


                </div>
            </div>
        </div>
    )
}

export default FlightCard
