import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import axiosInstance from '../../utils/config';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AlertContent, { Alert } from '../../components/Alert';
import DeleteModal from './modal/DeleteModal';
import EditModal from './modal/EditModal';
import AddModal from './modal/AddModal';

function Classes() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState({ isShow: false, item: {} })
    const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })


    const [data, setData] = useState([])

    useEffect(() => {
        axiosInstance.get(`/director/Classes/GetAll`)
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
                        <h2 className="mb-sm-0 font-size-24">Sinflar</h2>

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
                                <th>Sinf nomi</th>
                                <th>Sinf rahbari</th>
                                <th>Login</th>
                                <th>Parol</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.length > 0 && data?.map((item, index) => {
                                    return (
                                        <tr className='text-center table-light' key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.leaderName}</td>
                                            <td>{item.login}</td>
                                            <td>{item.password}</td>
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

            {/* alert */}
            <AlertContent alert={alert} />
        </Wrapper>
    )
}

export default Classes

const Wrapper = styled.section`
    
`