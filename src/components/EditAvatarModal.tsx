import Image from "next/image"
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png"
import { ChangeEvent } from "react"
import { array } from "zod"

type EditAvatarModalType = {
    image: string | null | undefined
    setImage: (image: string) => void
    setIsEditAvatarModal: (isEditAvatarModal: boolean) => void
    setError: (error: string) => void

}

export const EditAvatarModal = ({ image, setImage, setIsEditAvatarModal, setError }: EditAvatarModalType) => {

    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {

        const files = Array.from(e.target.files!)
        console.log(files)
    }

    return (
        <>

            <div
                className="overscroll-contain opacity-70  bg-black/50 inset-0 h-screen w-screen p-0 overflow-y-hidden backdrop-blur-sm z-[99] fixed"
            />

            <div className="z-[100] h-auto fixed top-8 ml-[calc((100vw-500px)/2)] max-[450px]:ml-[-25px]">
                <div className="modal-box h-fit w-screen ">

                    <form method="dialog" >
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => setIsEditAvatarModal(false)}
                        >
                            ✕
                        </button>


                        <h3 className="font-bold text-xl">Изменение аватарки</h3>

                        <div role="form"
                            className="hero rounded-xl bg-base-200 py-4 mt-4 flex flex-col"
                        >
                            <div className="avatar mb-3">
                                <div className="h-[100px] sm:h-[150px] lg:h-[250px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <Image
                                        priority
                                        alt="User avatar"
                                        src={image || profilePicPlaceholder}
                                        height={200}
                                        width={200}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row gap-2">
                                <input
                                    // multiple
                                    name="imageFile"
                                    onChange={handleSelect}
                                    type="file"
                                    className="file-input file-input-bordered w-full max-w-xs"
                                />

                                <button
                                    tabIndex={0}
                                    className="btn btn-md btn-primary"
                                    onClick={() => { }}
                                >
                                    Загрузить
                                </button>

                            </div>



                            <span className="mt-2 mb-2"> или укажите ссылку на файл картинки</span>

                            <input
                                name="image"
                                value={image as string}
                                onChange={(e) => {
                                    setImage(e.target.value)
                                    setError("")
                                }}
                                className={"input input-bordered w-full mb-3 max-w-xs "}
                                placeholder="image"
                                type="text"
                            />

                        </div>




                        <div className="mt-[20px] flex justify-center gap-2">

                            <button
                                className="btn btn-md btn-primary"
                                onClick={() => { }}
                                tabIndex={0}
                            >
                                OK
                            </button>

                            <button
                                className="btn btn-md btn-neutral"
                                onClick={() => setIsEditAvatarModal(false)}
                                tabIndex={0}
                            >
                                Отменить
                            </button>

                        </div>



                    </form>
                </div>


            </div>
        </>

    )

}