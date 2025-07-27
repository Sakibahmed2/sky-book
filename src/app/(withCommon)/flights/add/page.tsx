/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Button from "@/components/ui/Button"
import { useCreateFlightMutation } from "@/redux/api/flightApi"
import { getFormLocalStorage } from "@/utils/localStorage"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type FlightFormValues = {
    airline: string
    flight_number: string
    origin: string
    destination: string
    date: string
    time: string
    price: number
    seats: string
}

const AddFlightPage = () => {

    const [createFlight] = useCreateFlightMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FlightFormValues>()

    const router = useRouter()

    const token = getFormLocalStorage('token')

    const onSubmit = async (data: FlightFormValues) => {
        const toastId = toast.loading("Creating flight...")

        const seatArray = data.seats.split(',').map(seat => seat.trim())

        const payload = {
            ...data,
            seats: seatArray,
            price: Number(data.price),
        }


        try {
            const res = await createFlight({ payload, token: token }).unwrap()

            if (res?.ok) {
                toast.success(res?.message, { id: toastId })

                router.push("/flights")
            }

        } catch (err: any) {
            console.log("Error creating flight:", err)
            toast.error(err?.data?.message, { id: toastId })
        }
    }



    return (
        <div className=" rounded-lg border border-zinc-300 w-full md:max-w-9/12 mx-auto mt-5" >
            <div className="p-6 ">
                <h2 className="text-2xl font-bold text-zinc-900">Add New Flight</h2>
                <p className="text-zinc-600 mt-2">Create a new flight listing for passengers to book</p>
            </div>


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">Flight Number *</label>
                        <input
                            {...register("flight_number", { required: true })}
                            placeholder="e.g., AW123"
                            className="input"
                        />
                        {errors.flight_number && <p className="text-sm text-red-600">Required</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">Airline *</label>
                        <input {...register("airline", { required: true })} placeholder="Airways" className="input" />
                        {errors.airline && <p className="text-sm text-red-600">Required</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">Origin *</label>
                        <input {...register("origin", { required: true })} placeholder="New York" className="input" />
                        {errors.origin && <p className="text-sm text-red-600">Required</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">Destination *</label>
                        <input {...register("destination", { required: true })} placeholder="London" className="input" />
                        {errors.destination && <p className="text-sm text-red-600">Required</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">Date *</label>
                        <input type="date" {...register("date", { required: true })} className="input" />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">Time *</label>
                        <input type="time" {...register("time", { required: true })} className="input" />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-700">Price ($) *</label>
                        <input
                            type="number"
                            {...register("price", { required: true, min: 1 })}
                            className="input"
                            placeholder="500"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-700">Seats *</label>
                    <input
                        {...register("seats", { required: true })}
                        placeholder="e.g., 1A, 1B, 1C, 2A"
                        className="input"
                    />
                    <p className="text-xs text-zinc-500">Enter seats as comma separated values.</p>
                </div>

                <div className="flex gap-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                        size="lg"

                    >
                        {isSubmitting ? "Submitting..." : "Add Flight"}
                    </Button>
                    <Link href="/flights">
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                        >
                            Cancel
                        </Button>
                    </Link>
                </div>
            </form>

        </div >


    )
}

export default AddFlightPage