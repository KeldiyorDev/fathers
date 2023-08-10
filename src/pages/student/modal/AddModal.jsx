import React, { useRef } from 'react'
import axiosInstance from '../../../utils/config';

function AddModal({ data, setData, addModal, setAddModal, Alert, setAlert }) {
    const name = useRef()
    const fathersName = useRef()

    const addFunc = (e) => {
        e.preventDefault()
        console.log({
            "name": name.current.value,
            "fathersName": fathersName.current.value,
        });
        axiosInstance.post(`/classes/Users/Add`, {
            "name": name.current.value,
            "fathersName": fathersName.current.value,
        }).then((res) => {
            Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");
            setAddModal(false);
            console.log(res.data);
            axiosInstance.get(`/classes/Users/GetAll`)
                .then((res) => {
                    setData(res.data.elements);
                    console.log(res.data);
                })
        }).catch((error) => {
            Alert(setAlert, "danger", "Xatolik");
        })
    }
    return (
        <div className="modal">
            <div className="modal-dialog-centered" style={{ width: "60%", margin: "0 auto" }}>
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Yangi o'quvchi qo'shish</h5>
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
                                            placeholder='Ism familiyasi' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={fathersName} type="text"
                                            placeholder='Otasining ism familiyasi' />
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