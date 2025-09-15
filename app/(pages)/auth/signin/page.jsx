import SigninForm from "@/components/molecules/auth/signin-form"
// import ForgetPassword from '@/components/organisms/auth/forget-password'
import { GalleryVerticalEnd } from 'lucide-react'
import React from 'react'
import Image from "next/image"
import Link from 'next/link'
const page = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium font-stretch-125% text-primary">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                      Agemi_v1
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SigninForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    src="/images/mosque.png"
                    alt="Image"
                    width={250}
                    height={250}
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}

export default page
