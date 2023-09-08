import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import axiosInstance from '../../utils/config';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AlertContent, { Alert } from '../../components/Alert';
import DeleteModal from './modal/DeleteModal';
import EditModal from './modal/EditModal';
import AddModal from './modal/AddModal';
import { Link } from 'react-router-dom';
import AddReting from './modal/AddReting';
import Reting from './modal/Reting';

function Student() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const [addModal, setAddModal] = useState(false)
    const [addReting, setAddReting] = useState({ isShow: false, item: {} })
    const [retingModal, setRetingModal] = useState({ isShow: false, item: {} })
    const [editModal, setEditModal] = useState({ isShow: false, item: {} })
    const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })

    const [data, setData] = useState([])

    useEffect(() => {
        axiosInstance.get(`/classes/Users/GetAll`)
            .then((res) => {
                setData(res.data.elements);
                console.log(res.data);
            })
    }, [])

    return (
        <Wrapper>
            <div className="card">
                <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                        <h2 className="mb-sm-0 font-size-24">O'quvchilar ro'yxati</h2>

                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <button className="btn btn-primary btn-lg"
                                onClick={() => setAddModal(true)}>
                                Yangi qo'shish
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <table className="table table-primary table-bordered align-middle mb-0 table-striped">
                        <thead>
                            <tr className='text-center'>
                                <th>№</th>
                                <th>Ism familiyasi</th>
                                <th>Otasining ism familiyasi</th>
                                <th>To'plagan bali</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.length > 0 && data?.map((item, index) => {
                                    return (
                                        <tr className='text-center table-light' key={index}>
                                            <th>{index + 1}</th>
                                            <td onClick={() => setRetingModal({ isShow: true, item: item })} style={{ cursor: "pointer" }}>{item.name}</td>
                                            <td>{item.fathersName}</td>
                                            <td>{item?.rating}</td>
                                            <td className="text-center">
                                                <AiFillEdit fontSize={"24px"} cursor={"pointer"} color='#71dd37' style={{ margin: "0 8px" }} onClick={() => setEditModal({ isShow: true, item: item })} />
                                                <AiFillDelete fontSize={"24px"} cursor={"pointer"} color='#ff3e1d' onClick={() => setDeleteModal({ isShow: true, id: item.id })} />
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            {
                addModal && (
                    <AddModal
                        data={data}
                        setData={setData}
                        addModal={addModal}
                        setAddModal={setAddModal}
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
                        editModal={editModal}
                        setEditModal={setEditModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {
                deleteModal.isShow && (
                    <DeleteModal
                        data={data}
                        setData={setData}
                        deleteModal={deleteModal}
                        setDeleteModal={setDeleteModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {
                addReting.isShow && (
                    <AddReting
                        data={data}
                        setData={setData}
                        addReting={addReting}
                        setAddReting={setAddReting}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {
                retingModal.isShow && (
                    <Reting
                        data={data}
                        setData={setData}
                        retingModal={retingModal}
                        setRetingModal={setRetingModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {/* alert */}
            <AlertContent alert={alert} />
        </Wrapper>
    )
}

export default Student

const Wrapper = styled.section`
    
`