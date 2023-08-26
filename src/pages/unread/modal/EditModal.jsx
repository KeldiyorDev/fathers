import React, { useRef, useState } from 'react'
import axiosInstance from '../../../utils/config';
import { useEffect } from 'react';

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert }) {
    const name = useRef()
    const title = useRef()
    const izoh = useRef()
    const selectRef = useRef()
    const [file, setFile] = useState([])
    const [telegram, setTelegram] = useState(false)
    const [web, setWeb] = useState(false)

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

    const changeFile = (e) => {
        // let img = new Image()
        // img.src = window.URL.createObjectURL(e.target.files)
        setFile(e.target.files);
        console.log(e.target.files);
    }

    const cancelFunc = () => {
        axiosInstance.get(`/Posts/Cancel?postid=${editModal?.item?.id}`)
            .then((res) => {
                Alert(setAlert, "info", "Post bekor qilindi!");

                axiosInstance.get(`/Posts/GetPosts?isseen=false&page=1&limit=10`)
                    .then((res) => {
                        setData(res.data.elements);
                        console.log(res.data);
                    })
                setEditModal({ isShow: false, item: {} })
            })
    }

    const deleteFunc = () => {
        axiosInstance.delete(`/Posts/Delete?postid=${editModal?.item?.id}`)
            .then((res) => {
                Alert(setAlert, "danger", "Post o'chirildi!");

                axiosInstance.get(`/Posts/GetPosts?isseen=false&page=1&limit=10`)
                    .then((res) => {
                        setData(res.data.elements);
                        console.log(res.data);
                    })
                setEditModal({ isShow: false, item: {} })
            })
    }

    const accessFunc = () => {
        axiosInstance.get(`/Posts/Access?postid=${editModal?.item?.id}&telegram_bot=${telegram}&web=${web}`)
            .then((res) => {
                Alert(setAlert, "success", "Post tasdiqlandi!");

                axiosInstance.get(`/Posts/GetPosts?isseen=false&page=1&limit=10`)
                    .then((res) => {
                        setData(res.data.elements);
                        console.log(res.data);
                    })
                setEditModal({ isShow: false, item: {} })
            })
    }

    return (
        <div className="modal">
            <div className="modal-dialog-centered" style={{ width: "60%", margin: "0 auto" }}>
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Postni ko'rish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setEditModal({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body pb-2">
                        <form>
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
                                            <input type="text" className="form-control" disabled
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                value={editModal?.item?.categoryName} />
                                            <label for="floatingInput">Kategoriya</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" disabled
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                value={editModal?.item?.price} />
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

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <div class="form-check form-check-lg">
                                            <input class="form-check-input" type="checkbox"
                                                id="defaultCheck3" checked={telegram}
                                                defaultChecked={editModal?.item?.telegramSending}
                                                onChange={() => setTelegram(!telegram)} />
                                            <label class="form-check-label" for="defaultCheck3"> Telegram kanalga e'lon berish uchun ruxsat so'rash</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <div class="form-check form-check-lg">
                                            <input class="form-check-input" type="checkbox"
                                                value="" id="defaultCheck4" checked={web}
                                                defaultChecked={editModal?.item?.web}
                                                onChange={() => setWeb(!web)} />
                                            <label class="form-check-label" for="defaultCheck4"> Websaytga e'lon berish uchun ruxsat so'rash</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label for="formFileMultiple" className="form-label">Rasm yuklang</label>
                                        <input className="form-control" type="file" id="formFileMultiple" multiple={true}
                                            accept="image/*"
                                            title='Rasm yuklang'
                                            onChange={(e) => changeFile(e)} />
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="mb-3">
                                        <button className="btn-lg btn btn-success w-100"
                                            type='button'
                                            onClick={() => accessFunc()}>
                                            Tasdiqlash
                                        </button>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="mb-3">
                                        <button className="btn-lg btn btn-danger w-100"
                                            type='button'
                                            onClick={() => deleteFunc()}>
                                            O'chirish
                                        </button>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="mb-3">
                                        <button className="btn-lg btn btn-info w-100"
                                            type='button'
                                            onClick={() => cancelFunc()}>
                                            Bekor qilish
                                        </button>
                                    </div>
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