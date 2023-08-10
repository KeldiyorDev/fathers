import React, { useRef } from 'react'
import axiosInstance from '../../../utils/config';

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert }) {
    const name = useRef()
    const fathersName = useRef()

    const editFunc = (e) => {
        e.preventDefault()
        console.log({
            "name": name.current.value,
            "fathersName": fathersName.current.value,
        });
        axiosInstance.put(`/director/Classes/Update?leaderid=${editModal.item.id}`, {
            "name": name.current.value,
            "fathersName": fathersName.current.value,
        }).then((res) => {
            Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi!");

            const newData = data.filter((item) => {
                if (item.id === editModal.item.id) {
                    item.name = name.current.value
                    item.fathersName = fathersName.current.value
                }

                return item
            })

            setData(newData)
            setEditModal({ isShow: false, item: {} })
        })
    }
    return (
        <div className="modal">
            <div className="modal-dialog-centered" style={{ width: "60%", margin: "0 auto" }}>
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">O'quvchini tahrirlash</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setEditModal({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={editFunc}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={name} type="text"
                                            defaultValue={editModal?.item?.name}
                                            placeholder='Ism familiyasi' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={fathersName} type="text"
                                            defaultValue={editModal?.item?.fathersName}
                                            placeholder='Otasining ism familiyasi' />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <button className="btn-lg btn btn-primary w-100" type='submit'>
                                        O'zgartirish
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

export default EditModal