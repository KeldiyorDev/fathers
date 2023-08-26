import React, { useRef, useState } from 'react'
import axiosInstance from '../../../utils/config';
import { useEffect } from 'react';

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert, posts, setPosts, retingModal }) {
    const name = useRef()
    const title = useRef()
    const izoh = useRef()
    const selectRef = useRef()
    const [select, setSelect] = useState(0)
    const [price, setPrice] = useState(editModal?.item?.price)
    const [file, setFile] = useState([])

    console.log(editModal);

    const [category, setCategory] = useState([])

    useEffect(() => {
        axiosInstance.get(`/tumanxtb/Categories/GetAll`)
            .then((res) => {
                setCategory(res.data.elements);
                console.log(res.data.elements);
            })
    }, [])

    const [data1, setData1] = useState({})

    useEffect(() => {
        axiosInstance.get(`/Posts/Get?postid=${editModal?.item?.id}`)
            .then((res) => {
                setData1(res.data);
                console.log(res.data);
            })
    }, [editModal?.item?.id])

    const editFunc = (e) => {
        e.preventDefault()
        console.log({
            name: name.current.value,
            title: title.current.value,
            message: izoh.current.value,
            userId: data?.[0]?.id,
            categoryId: Number(selectRef?.current?.value),
            id: editModal?.item?.id,
        })
        axiosInstance.put(`/Posts/Update?postid=${editModal.item.id}`, {
            name: name.current.value,
            title: title.current.value,
            message: izoh.current.value,
            userId: data?.[0]?.id,
            categoryId: Number(selectRef?.current?.value),
            // id: editModal?.item?.id,
        }).then((res) => {
            Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi!");

            axiosInstance.get(`/Posts/GetByUser?userid=${retingModal?.item?.id}`)
                .then((res) => {
                    setPosts(res.data.elements);
                    console.log(res.data);
                })
            setEditModal({ isShow: false, item: {} })
        })
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
                setPrice(item.value);
                console.log(item.value);
            }
        })
    }

    return (
        <div className="modal">
            <div className="modal-dialog-centered" style={{ width: "60%", margin: "0 auto" }}>
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Postni tahrirlash</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setEditModal({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={editFunc}>
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" ref={name}
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                defaultValue={data1?.name} maxLength={50} />
                                            <label for="floatingInput">Nomi</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" ref={title}
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                defaultValue={data1?.title} maxLength={100} />
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
                                                defaultValue={data1?.message}
                                                maxLength={5000} />
                                            <label for="floatingInput2">Izoh</label>
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
                                                            <option value={item.id} selected={item.id === data1?.categoryId ? true : false}>
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
                                                value={price} />
                                            <label for="floatingInput">Qiymati</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" disabled
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                defaultValue={data1?.description} />
                                            <label for="floatingInput">Status</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" disabled
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                defaultValue={editModal?.item?.dateTime?.substr(0, 10) + " , " + editModal?.item?.dateTime?.substr(11, 5)} />
                                            <label for="floatingInput">Post vaqti</label>
                                        </div>
                                    </div>
                                </div>

                                {
                                    data1?.status === 1 && (
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" disabled
                                                        id="floatingInput" aria-describedby="floatingInputHelp"
                                                        style={{ color: data1?.telegramSending === 1 ? "" : data1?.telegramSending === 2 ? "#ffab00" : data1?.telegramSending === 3 ? "#71dd37" : data1?.telegramSending === 4 ? "#ff3e1d" : data1?.telegramSending === 5 ? "#696cff" : "" }}
                                                        defaultValue={
                                                            data1?.telegramSending === 1 ? "Ruxsat so'ralmadi" : data1?.telegramSending === 2 ? "Ruxsat so'raldi" : data1?.telegramSending === 3 ? "Tasdiqlandi" : data1?.telegramSending === 4 ? "Bekor qilindi" : data1?.telegramSending === 5 ? "Xabar uzatildi" : ""
                                                        } />
                                                    <label for="floatingInput">Telegram</label>
                                                </div>
                                            </div>
                                        </div>


                                    )
                                }

                                {
                                    data1?.status === 1 && (
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" disabled
                                                        id="floatingInput" aria-describedby="floatingInputHelp"
                                                        style={{ color: data1?.webSending === 1 ? "" : data1?.webSending === 2 ? "#ffab00" : data1?.webSending === 3 ? "#71dd37" : data1?.webSending === 4 ? "#ff3e1d" : "" }}
                                                        defaultValue={
                                                            data1?.webSending === 1 ? "Ruxsat so'ralmadi" : data1?.webSending === 2 ? "Ruxsat so'raldi" : data1?.webSending === 3 ? "Tasdiqlandi" : data1?.webSending === 4 ? "Bekor qilindi" : ""
                                                        } />
                                                    <label for="floatingInput">Websayt</label>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label for="formFileMultiple" className="form-label">Rasm yuklang</label>
                                        <input className="form-control" type="file" id="formFileMultiple" multiple={true}
                                            accept="image/*"
                                            title='Rasm yuklang'
                                            onChange={(e) => changeFile(e)} />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <button className="btn-lg btn btn-primary w-100"
                                        type='submit' disabled={data1.status === 0 ? false : true}>
                                        O'zgartirish
                                    </button>

                                    {
                                        data1.status !== 0 && (
                                            <h4 className="modal-title text-center text-danger mt-3">
                                                Siz ushbu postga reaksiya bildirgansiz. <br /> Shu sababli, uni o'zgartira olmaysiz!
                                            </h4>
                                        )
                                    }

                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal