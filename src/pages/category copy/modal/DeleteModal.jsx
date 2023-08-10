import React from 'react'
import axios from 'axios'

function DeleteModal({ data, setData, deleteModal, setDeleteModal, Alert, setAlert }) {
    const deleteFunc = (e) => {
        e.preventDefault()
        axios.delete(`http://95.47.127.171/api/Organizations/Delete`, {
            headers: {
                token: deleteModal.token
            }
        }).then((res) => {
            const newData = data.filter((item) => item.token !== deleteModal.token)
            Alert(setAlert, "success", "Muvafaqqiyatli o'chirildi!");
            setData(newData)
            setDeleteModal({ isShow: false, token: "" })
        })
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">O'chirish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setDeleteModal({ isShow: false, token: "" })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={deleteFunc}>
                            <h3 className='text-center mb-3'>Haqiqatdan ham ushbu ma'lumotni <br /> o'chirmoqchimisiz?</h3>
                            <div className="row">
                                <div className="col-lg-6 mb-2">
                                    <button className="btn-lg btn btn-danger w-100" type='submit'>
                                        Ha, Roziman
                                    </button>
                                </div>

                                <div className="col-lg-6">
                                    <button className="btn-lg btn btn-success w-100" type='button'
                                        onClick={() => setDeleteModal({ isShow: false, token: "" })}>
                                        Bekor qilish
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

export default DeleteModal