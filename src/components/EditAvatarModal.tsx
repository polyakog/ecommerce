import Image from "next/image"
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png"
import { ChangeEvent, useEffect, useState } from "react"
import { ProgressBar } from "./ProgressBar"


type EditAvatarModalType = {
    image: string | null | undefined
    setImage: (image: string) => void
    setIsEditAvatarModal: (isEditAvatarModal: boolean) => void
    setError: (error: string) => void

}

type ImageFileType = {
    name: string,
    size: number,
    url: string | ArrayBuffer | null
}

export const EditAvatarModal = ({ image, setImage, setIsEditAvatarModal, setError }: EditAvatarModalType) => {

    const [uploadImageFile, setUploadImageFile] = useState<ImageFileType | undefined>()
    const [uploadImage, setUploadImage] = useState()
    const [progressValue, setProgressValue] = useState("100")

    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
        // console.clear()

        if (e.target.files) {
            const files = Array.from(e.target.files)
            files.forEach(file => {
                const reader = new FileReader()

                reader.onload = (er) => {
                    // console.log("file loading finished", er.currentTarget)
                    setUploadImageFile(() => {
                        return {
                            name: file.name,
                            size: file.size,
                            url: reader.result

                        }
                    }
                    )
                    // if (imageLoad?.url) {
                    //     setImage(imageLoad?.url as string)
                    // }


                }

                reader.readAsDataURL(file)
            })

        }
    }

    useEffect(() => {
        if (uploadImageFile?.url) {
            setImage(uploadImageFile?.url as string)
        }

    }, [uploadImageFile?.url])

    const handleDeleteImage = () => {
        // setIsEditAvatarModal(false)


    }

    const handleLoadImage = () => {


    }

    console.log("imageLoad", uploadImageFile)

    if (progressValue === "100") {
        setTimeout(
            () => setProgressValue("")

            , 5000)
    }



    return (
        <>

            <div
                className="overscroll-contain opacity-70  bg-black/50 inset-0 h-screen w-screen p-0 overflow-y-hidden backdrop-blur-sm z-[99] fixed"
            />

            <div className="z-[100]  fixed top-8 ml-[calc((100vw-500px)/2)] max-[450px]:ml-[-25px]">
                <div className="modal-box w-[calc(100vw-15px)] max-h-screen">
                    <div className="">
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



                                <div className="avatar mb-5">
                                    <div className="h-[100px] sm:h-[150px] lg:h-[250px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <Image
                                            priority
                                            alt="User avatar"
                                            src={image || profilePicPlaceholder}
                                            height={200}
                                            width={200}
                                        />
                                    </div>

                                    {/* Удаление картинки */}
                                    <button
                                        className="btn btn-xs btn-circle btn-ghost absolute top-[-10px] right-[-10px]"
                                        onClick={handleDeleteImage}
                                    >
                                        ✕
                                    </button>
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
                                        onClick={handleLoadImage}
                                    >
                                        Загрузить
                                    </button>

                                </div>

                                <div className="flex flex-col text-center h-40 w-full mb-3">
                                    {/* _____Сообщение о загрузке_____ */}

                                    <div className="text-center h-20 mb-3">
                                        {progressValue &&
                                            <div>
                                                <ProgressBar progressValue={progressValue} />
                                                {progressValue === "100" &&
                                                    <span className="text-success "> Картинка аватарки загружена</span>
                                                }
                                            </div>
                                        }
                                    </div>


                                    <div className="h-10">
                                        {!progressValue && <span className="mt-2 mb-2 "> или укажите ссылку на файл картинки</span>}


                                    </div>

                                    <div className="">

                                        <input
                                            name="image"
                                            value={image as string}
                                            onChange={(e) => {
                                                setImage(e.target.value)
                                                setError("")
                                            }}
                                            className={`input input-bordered w-full max-w-sm` +
                                                (!!progressValue ? " input-ghost pointer-events-none " : "") +
                                                (progressValue === "100" ? " border-success" : "")
                                            }
                                            placeholder="image"
                                            type="text"
                                        />

                                    </div>

                                </div>

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

            </div>
        </>

    )

}