import { useRouter } from "next/navigation"
import React from "react"

type PropsType = {
    setIsErrorModal: (isModal: boolean) => void
    errorText: string | null

}

const ErrorModal = ({ setIsErrorModal, errorText }: PropsType) => {

    const router = useRouter()

    const errorHandler = () => {
        setIsErrorModal(false)
        router.push("/login")
    }

    return (
        <>
            <div
                className="overscroll-contain opacity-70 inset-0 h-screen w-screen m-0 overflow-y-hidden backdrop-blur-sm z-[99] fixed"
            />

            <div className="z-[100] bg-black/50 ml-0 fixed flex-wrap text-inherit  h-[120%] max-h-none w-[100%] max-w-none flex justify-center content-center">
                {/* <dialog className="modal"> */}
                <div className="modal-box h-auto">

                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={errorHandler}
                        >
                            ✕
                        </button>
                    </form>


                    <h3 className="font-bold text-xl">Ошибка</h3>
                    <div role="alert" className="alert alert-error py-4 mt-3 flex text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-center">{errorText}</span>
                    </div>

                    <div className="mt-[50px] flex justify-center">

                        <button
                            className="btn btn-sm btn-error text-white"
                            onClick={errorHandler}
                        >
                            OK
                        </button>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ErrorModal

