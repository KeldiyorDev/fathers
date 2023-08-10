import React, { useRef } from 'react'
import axiosInstance from '../../../utils/config';

function AddModal({ data, setData, addModal, setAddModal, Alert, setAlert }) {
    const directorName = useRef()
    const name = useRef()
    const login = useRef()
    const password = useRef()
    const passwordHint = useRef()
    const telegramToken = useRef()
    const phoneNumber = useRef()
    const businessSphere = useRef()

    const addFunc = (e) => {
        e.preventDefault()
        console.log({
            "directorName": directorName.current.value,
            "name": name.current.value,
            "login": login.current.value,
            "password": password.current.value,
            "passwordHint": passwordHint.current.value,
            "telegramToken": telegramToken.current.value,
            "phoneNumber": phoneNumber.current.value,
            "businessSphere": businessSphere.current.value,
            "sourcePath": "",
            "licenseKey": "QWERTYUI",
            "productKey": "Bbuc5TgWGBgELJ",
        });
        axiosInstance.post(`/Organizations/Registration`, {
            "directorName": directorName.current.value,
            "name": name.current.value,
            "login": login.current.value,
            "password": password.current.value,
            "passwordHint": passwordHint.current.value,
            "telegramToken": telegramToken.current.value,
            "phoneNumber": phoneNumber.current.value,
            "businessSphere": businessSphere.current.value,
            "sourcePath": "",
            "licenseKey": "QWERTYUI",
            "productKey": "Bbuc5TgWGBgELJ",
        }).then((res) => {
            Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");
            setAddModal(false);
            console.log(res.data);
            setData([...data, res.data])
        })
    }
    return (
        <div className="modal">
            <div className="modal-dialog-centered" style={{ width: "60%", margin: "0 auto" }}>
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Yangi organ qo'shish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setAddModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={addFunc}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={name} type="text"
                                            placeholder='Organizatsiya nomi' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={directorName} type="text"
                                            placeholder='Direktori' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={phoneNumber} type="text"
                                            placeholder='Telefon raqami' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={businessSphere} type="text"
                                            placeholder='Tashkilot turi' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={telegramToken} type="text"
                                            placeholder='Telegram id' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={login} type="text"
                                            placeholder='Login' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={password} type="text"
                                            placeholder='Parol' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={passwordHint} type="text"
                                            placeholder='Eslatma parol' />
                                    </div>
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

export default AddModal