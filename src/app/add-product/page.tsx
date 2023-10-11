import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Добавление продукта - Mozoni',
    colorScheme: "dark"
}


const AddProduct = () => {
    return (
        <div>
            <h1 className="mb-3 font-bold text-lg">Добавление продукта</h1>
            <form >
                <input
                    required
                    name="productName"
                    placeholder="Название продукта"
                    className="input input-bordered mb-3 w-full"
                />
                <textarea
                    required
                    name="description"
                    placeholder="Описание"
                    className="textarea textarea-bordered mb-3 w-full"
                />

                <input
                    required
                    name="imageUrl"
                    placeholder="Адрес картинки"
                    type="url"
                    className="input input-bordered mb-3 w-full"
                />
                <input
                    required
                    name="price"
                    placeholder="Цена"
                    type="number"
                    className="input input-bordered mb-3 w-full"
                />

                <button className="btn btn-primary btn-block" type="submit">Добавить продукт</button>
            </form>
        </div>
    )
}

export default AddProduct