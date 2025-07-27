/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Button from "@/components/ui/Button"
import { useLoginUserMutation } from "@/redux/api/authApi"
import { setToLocalStorage } from "@/utils/localStorage"
import { Eye, EyeOff, Plane } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface LoginFormInputs {
    email: string
    password: string
}

const LoginPage = () => {

    const [loginUser, { isLoading }] = useLoginUserMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<LoginFormInputs>({
        defaultValues: {
            email: 'johndoe@example.com',
            password: 'securePass123',
        }
    })

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()


    const onSubmit = async (data: LoginFormInputs) => {
        const toastId = toast.loading("Logging in...")


        try {
            const res = await loginUser(data).unwrap()

            console.log(res)

            if (res?.ok) {
                toast.success(res?.message, { id: toastId })
                setError(null);

                setToLocalStorage("token", res?.data?.token)
                router.push('/flights')
            }

        } catch (err: any) {
            console.log("Login error:", err)
            toast.error(err?.data?.message, { id: toastId })
        }
    }

    return (
        <div className="h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg border border-zinc-300 drop-shadow-lg">
                <div className="p-4 text-center">
                    <div className="flex justify-center mb-2">
                        <Plane className="h-12 w-12 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900">Welcome Back</h2>
                    <p className="text-zinc-600 mt-1">Sign in to your SkyBook account</p>
                </div>

                <div className="px-6 py-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>}

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm  text-zinc-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                {...register("email", { required: "Email is required" })}
                                className=""
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm  text-zinc-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password", { required: "Password is required" })}
                                    className=""
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            variant="default"
                            size="md"
                            className="w-full mt-2"
                        >
                            Login
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-zinc-600">Don&lsquo;t have an account? </span>
                        <Link href="/register" className="text-indigo-600 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginPage