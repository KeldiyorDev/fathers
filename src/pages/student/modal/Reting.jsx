import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../../../utils/config';
import { AiFillEdit, AiFillEye } from 'react-icons/ai';
import AddReting from './AddReting';
import EditModal from './EditModal';

function Reting({ data, setData, retingModal, setRetingModal, Alert, setAlert }) {
    const [addReting, setAddReting] = useState({ isShow: false, item: {} })
    const [editModal, setEditModal] = useState({ isShow: false, item: {} })

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axiosInstance.get(`/Posts/GetByUser?userid=${retingModal?.item?.id}`)
            .then((res) => {
                setPosts(res.data.elements);
                console.log(res.data);
            })
    }, [retingModal?.item?.id])
    return (
        <div className="modal">
            <div className="modal-dialog-centered" style={{ width: "60%", margin: "0 auto" }}>
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">O'quvchining postlari</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setRetingModal({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-sm-flex align-items-center justify-content-between mb-3">
                            <h4 className="mb-sm-0 font-size-24">{retingModal?.item?.name} ning postlari ro'yxati</h4>

                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <button className="btn btn-primary"
                                    onClick={() => setAddReting({ isShow: true, item: data?.[0] })}
                                >
                                    Yangi qo'shish
                                </button>
                            </div>
                        </div>

                        <table className="table table-primary table-bordered align-middle mb-0 table-striped">
                            <thead>
                                <tr className='text-center'>
                                    <th>№</th>
                                    <th>Nomi</th>
                                    <th>Baholash me`zoni</th>
                                    <th>Ball</th>
                                    <th>Qo'shilgan sanasi</th>
                                    <th>Status</th>
                                    <th>Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    posts?.length > 0 && posts?.map((item, index) => {
                                        return (
                                            <tr className={`text-center ${item?.description === "Tasdiqlandi" ? "table-success" : item?.description === "Bekor qilindi!" ? "table-danger" : "table-warning"}`} key={index}>
                                                <th>{index + 1}</th>
                                                {/* <td onClick={() => setRetingModal({ isShow: true, item: item })} style={{ cursor: "pointer" }}>{item.name}</td> */}
                                                <td>{item.name}</td>
                                                <td>{item.categoryName}</td>
                                                <td>{item.price}</td>
                                                <td>{item.dateTime?.substr(0, 10)?.split("-")?.reverse().join(".")}</td>
                                                <td>{item.description}</td>
                                                <td className="text-center">
                                                    <AiFillEye fontSize={"24px"} cursor={"pointer"} color='#696cff' style={{ margin: "0 8px" }}
                                                    onClick={() => setEditModal({ isShow: true, item: item })} 
                                                    />

                                                    {/* <AiFillEdit fontSize={"24px"} cursor={"pointer"} color='#71dd37' style={{ margin: "0 8px" }}
                                                        onClick={() => setEditModal({ isShow: true, item: item })}
                                                    /> */}

                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {
                addReting.isShow && (
                    <AddReting
                        posts={posts}
                        setPosts={setPosts}
                        data={data}
                        setData={setData}
                        retingModal={retingModal}
                        addReting={addReting}
                        setAddReting={setAddReting}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {
                editModal.isShow && (
                    <EditModal
                        data={data}
                        setData={setData}
                        retingModal={retingModal}
                        posts={posts}
                        setPosts={setPosts}
                        editModal={editModal}
                        setEditModal={setEditModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }
        </div>
    )
}

export default Reting