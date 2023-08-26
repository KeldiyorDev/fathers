import React from 'react'
import axiosInstance from '../../../utils/config'

function DeleteModal({ data, setData, deleteModal, setDeleteModal, Alert, setAlert, schoolId }) {
    const deleteFunc = (e) => {
        e.preventDefault()

        axiosInstance.get(`/Posts/CancelAllPosts`).then((res) => {
            console.log(res?.data);
            
            if (schoolId === "0") {
                axiosInstance.get(`/Posts/GetAllPosts?limit=10&page=1&isseen=false`)
                    .then((res) => {
                        console.log(res.data?.elements);
                        setData(res.data?.elements);
                        Alert(setAlert, "success", "Muvafaqqiyatli o'chirildi!");
                        setDeleteModal(false)
                    })
            }
            else {
                axiosInstance.get(`/Posts/GetSchoolPostsForTXTB?limit=10&page=1&schoolid=${schoolId}`)
                    .then((res) => {
                        setData(res.data.elements);
                        console.log(res.data);
                        Alert(setAlert, "success", "Muvafaqqiyatli o'chirildi!");
                        setDeleteModal(false)
                    })
            }
        })


    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">O'chirish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setDeleteModal(false)}></button>
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
                                        onClick={() => setDeleteModal(false)}>
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