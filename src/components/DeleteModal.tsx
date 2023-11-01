import React from "react"

type PropsType = {
    setIsModal: (isModal: boolean) => void
}

const DeleteModal = ({ setIsModal }: PropsType) => {

    return (
        <>
            <div
                className="overscroll-contain opacity-60 inset-0 h-screen w-screen m-0 grid overflow-y-hidden backdrop-blur-sm z-[99] fixed"
            />
            
            <div className="z-[100] fixed h-screen w-screen flex justify-center content-center">
                <div className="modal-box h-[300px]">
                    <h3 className="font-bold text-lg">Удаление продукта</h3>
                    <div className="alert py-4 mt-3 alert-error flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span className="text-center ">You may be deleting user data. After you delete this, it can`t be recovered.</span>
                    </div>

                    <div className="mt-[50px] flex justify-end gap-2">
                        <button
                            className="btn btn-sm"
                            onClick={() => setIsModal(false)}
                        >
                            Отменить
                        </button>
                        <button className="btn btn-sm btn-error">Удалить</button>
                    </div>
                </div>
            </div>

        </>








    )
}

export default DeleteModal

