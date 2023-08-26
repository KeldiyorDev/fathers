import React from 'react'
import axiosInstance from '../../../utils/config'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function AddReting({ data, setData, posts, setPosts, addReting, setAddReting, Alert, setAlert, retingModal }) {
    const name = useRef()
    const title = useRef()
    const izoh = useRef()
    const selectRef = useRef()
    const [select, setSelect] = useState(0)
    const [file, setFile] = useState([])

    const [base64Strings, setBase64Strings] = useState([]);

    const [category, setCategory] = useState([])
    const [price, setPrice] = useState("")

    useEffect(() => {
        axiosInstance.get(`/tumanxtb/Categories/GetAll`)
            .then((res) => {
                console.log(res.data);
                setCategory(res?.data?.elements);
                setPrice(res?.data?.elements?.[0]?.value)
            })
    }, [])

    const addFunc = (e) => {
        e.preventDefault()

        console.log({
            name: name.current.value,
            title: title.current.value,
            message: izoh.current.value,
            userId: data?.[0]?.id,
            categoryId: Number(selectRef?.current?.value),
            id: retingModal?.item?.id,
            base64String: base64Strings
        })

        axiosInstance.post("/Posts/UploadImage", base64Strings)
            .then((res) => {
                console.log(res.data);
                axiosInstance.post(`Posts/Add`, {
                    name: name.current.value,
                    title: title.current.value,
                    message: izoh.current.value,
                    userId: data?.[0]?.id,
                    categoryId: Number(selectRef?.current?.value),
                    imageIds: res.data
                }).then((res) => {
                    Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");
                    setAddReting({ isShow: false, item: {} });
                    console.log(res.data);
                    axiosInstance.get(`/Posts/GetByUser?userid=${retingModal?.item?.id}`)
                        .then((res) => {
                            setPosts(res.data.elements);
                            console.log(res.data);
                        })
                }).catch((error) => {
                    Alert(setAlert, "danger", "Xatolik");
                })
            })
            .catch((err) => {
                Alert(setAlert, "danger", "Rasm yuklashda xatolik!");
            })




        // Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");
        // setAddReting({ isShow: false, item: {} });
    }

    const changeFile = (e) => {
        // let img = new Image()
        // img.src = window.URL.createObjectURL(e.target.files)
        setFile(e.target.files);
        console.log(e.target.files);
    }

    const selected = (e) => {
        setSelect(e?.target.value)

        category?.forEach((item) => {
            if (item.id === Number(e?.target.value)) {
                setPrice(item.value)
            }
        })
    }

    // const handleImageChange = (event) => {

    //     for (let i = 0; i < event?.target?.files?.length; i++) {
    //         const selectedFile = event.target.files[i];

    //         if (selectedFile) {
    //             const reader = new FileReader();
    //             reader.onload = (e) => {
    //                 const imageData = e.target.result;
    //                 setBase64String([...base64String, imageData]);
    //             };

    //             reader.readAsDataURL(selectedFile);
    //         }

    //     }
    // };


    const handleFileInputChange = async (event) => {
        for (let i = 0; i < event?.target?.files.length; i++) {
            const file = event.target.files[i];

            if (file) {
                const base64String = await readFileAsBase64(file);
                setBase64Strings((prevBase64Strings) => [
                    ...prevBase64Strings.slice(0, i),
                    base64String,
                    ...prevBase64Strings.slice(i + 1),
                ]);
            }
        }
    };

    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = () => {
                reject(new Error('File reading failed.'));
            };

            reader.readAsDataURL(file);
        });
    };


    return (
        <div className="modal">
            <div className="modal-dialog-centered" style={{ width: "60%", margin: "0 auto" }}>
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Yangi post qo'shish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setAddReting({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={addFunc}>
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" ref={name}
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                maxLength={50} />
                                            <label for="floatingInput">Nomi</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <select className="form-select w-100"
                                                id="floatingInput"
                                                aria-describedby="floatingInputHelp"
                                                ref={selectRef}
                                                style={{ height: "58px" }}
                                                onChange={(e) => selected(e)}
                                            >
                                                {
                                                    category.map((item, index) => {
                                                        return (
                                                            <option value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <label for="floatingInput">Kategoriya</label>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" disabled
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                value={price}
                                            />
                                            <label for="floatingInput">Qiymati</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" ref={title}
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                maxLength={100} />
                                            <label for="floatingInput">Sarlavha</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <textarea className="form-control form-control-lg"
                                                ref={izoh} type="text"
                                                aria-describedby="floatingInputHelp"
                                                id="floatingInput2"
                                                maxLength={5000} />
                                            <label for="floatingInput2">Izoh</label>
                                        </div>

                                    </div>
                                </div>

                                {/* <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label for="formFileMultiple" className="form-label">Rasm yuklang</label>
                                        <input className="form-control" type="file" id="formFileMultiple" multiple={true}
                                            accept="image/*"
                                            title='Rasm yuklang'
                                            onChange={(e) => changeFile(e)} />
                                    </div>
                                </div> */}
                                <div>
                                    {base64Strings.map((base64String, index) => (
                                        <img key={index} style={{ width: "200px", display: "inline" }} src={base64String} alt="" />
                                    ))}
                                    <input style={{display: "block"}}
                                        type="file" multiple 
                                        onChange={(event) => handleFileInputChange(event)} // Change the index as needed
                                    />
                                </div>

                                <div className="col-lg-12">
                                    <button className="btn-lg btn btn-primary w-100" type='submit'>
                                        Qo'shish
                                    </button>
                                </div>


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddReting
