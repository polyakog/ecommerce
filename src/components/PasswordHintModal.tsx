import React from "react"

type PropsType = {
    setIsModal: (isModal: boolean) => void

}

const PasswordHintModal = ({ setIsModal }: PropsType) => {



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
                            onClick={() => setIsModal(false)}
                        >
                            ✕
                        </button>
                    </form>

                    <h3 className="font-bold text-xl">Подсказка</h3>
                    <div role="alert" className="alert py-4 mt-3 bg-blue-100 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                        <span className="text-center">
                            <p className="text-xl">Вы входили только через Google аккаунт и у Вас отсутствует пароль</p>
                            <br />
                            <p><i>Чтобы входить с паролем войдите через Google аккаунт
                                и добавьте пароль в разделе редактирования &quot;профиля&quot;</i></p>


                        </span>
                    </div>

                    <div className="mt-[50px] flex justify-center">

                        <button
                            className="btn btn-sm btn-info text-white"
                            onClick={() => setIsModal(false)}
                        >
                            OK
                        </button>

                    </div>
                </div>
            </div>

        </>








    )
}

export default PasswordHintModal

