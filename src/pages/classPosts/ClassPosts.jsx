import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import axiosInstance from '../../utils/config';
import {AiFillEye } from "react-icons/ai";
import AlertContent, { Alert } from '../../components/Alert';
import EditModal from './modal/EditModal';
import Pagination from '../../components/Pagination';

function ClassPosts() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const [editModal, setEditModal] = useState({ isShow: false, item: {} })

    const [data, setData] = useState([])

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [elements, setElements] = useState()

    const handlePageClick = (e) => {
        setPage(e?.selected + 1)
        console.log(e?.selected + 1)

        axiosInstance.get(`/Posts/GetClassPosts?limit=${limit}&page=${e?.selected + 1}`)
            .then((res) => {
                setData(res.data.elements);
                setElements(res.data.total)
                console.log(res.data);
            })
    }

    useEffect(() => {
        axiosInstance.get(`/Posts/GetClassPosts?limit=${limit}&page=${page}`)
            .then((res) => {
                setData(res.data.elements);
                setElements(res.data.total)
                console.log(res.data);
            })
    }, [])

    return (
        <Wrapper>
            <div className="card">
                <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                        <h2 className="mb-sm-0 font-size-24">Postlar</h2>
                    </div>
                </div>

                <div className="card-body">
                    <table className="table table-primary table-bordered align-middle mb-0 table-striped">
                        <thead>
                            <tr className='text-center'>
                                <th>№</th>
                                <th>Otasining ismi</th>
                                <th>Nomi</th>
                                <th>Kategoriya nomi</th>
                                <th>Qiymati</th>
                                <th>Qo'shilgan sanasi</th>
                                <th>Status</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.length > 0 && data?.map((item, index) => {
                                    return (
                                        <tr className={`text-center ${item?.description === "Tasdiqlandi" ? "table-success" : item?.description === "Bekor qilindi!" ? "table-danger" : "table-warning"}`} key={index}>
                                            <th>{index + 1}</th>
                                            <th>{item?.fathersName}</th>
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

                    {
                        data?.length > 0 && <div className="col-lg-12 mt-2">
                            <Pagination
                                page={page}
                                limit={limit}
                                elements={elements}
                                handlePageClick={handlePageClick}
                            />
                        </div>
                    }
                </div>
            </div>

            {
                editModal.isShow && (
                    <EditModal
                        data={data}
                        setData={setData}
                        editModal={editModal}
                        setEditModal={setEditModal}
                        Alert={Alert}
                        setAlert={setAlert}
                        setElements={setElements}
                        page={page}
                        limit={limit}
                    />
                )
            }

            {/* alert */}
            <AlertContent alert={alert} />
        </Wrapper>
    )
}

export default ClassPosts

const Wrapper = styled.section`
    
`