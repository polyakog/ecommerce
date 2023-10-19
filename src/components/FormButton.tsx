"use client"

import { ComponentProps } from "react"

// ts-ignore because experimental_useFormStatus is not in the types
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom"


type FromButtonType = {
    children: React.ReactNode
    className?: string
} & ComponentProps<"button">

export default function FormButton({
    children,
    className,
    ...props
}: FromButtonType) {
    const { pending } = useFormStatus()

    return (
        <button
            {...props}
            className={`btn btn-primary ${className}`}
            type="submit"
            disabled={pending}
        >
            {pending &&
                <span className="loading loading-ring loading-md" />
            }
            {children}
        </button>
    )


}