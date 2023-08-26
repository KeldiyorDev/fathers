import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { AiFillEye } from "react-icons/ai";
import AlertContent, { Alert } from '../../components/Alert';
import axiosInstance from '../../utils/config';
import EditModal from './modal/EditModal';
import DeleteModal from './modal/DeleteModal';
import Pagination from '../../components/Pagination';

function AdminUread() {
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [editModal, setEditModal] = useState({ isShow: false, item: {} })
  const [deleteModal, setDeleteModal] = useState(false)

  const [data, setData] = useState([])
  const [schools, setSchools] = useState([])

  const [schoolId, setSchoolId] = useState("0")

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [elements, setElements] = useState()

  const handlePageClick = (e) => {
    setPage(e?.selected)
    console.log(e?.selected)
    if (schoolId === "0") {
      axiosInstance.get(`/Posts/GetAllPosts?limit=${limit}&page=${e?.selected + 1}&isseen=false`)
        .then((res) => {
          console.log(res.data?.elements);
          setData(res.data?.elements);
          setElements(res.data.total)
        })
    } else {
      axiosInstance.get(`/Posts/GetSchoolPostsForTXTB?limit=${limit}&page=${e?.selected + 1}&schoolid=${schoolId}`)
        .then((res) => {
          setData(res.data.elements);
          setElements(res.data.total)
          console.log(res.data);
        })
    }
  }

  useEffect(() => {
    axiosInstance.get(`/tumanxtb/Schools/GetAll`)
      .then((res) => {
        setSchools(res.data.elements);
        console.log(res.data);
      })
  }, [])

  useEffect(() => {
    axiosInstance.get(`/Posts/GetAllPosts?limit=${limit}&page=${page}&isseen=false`)
      .then((res) => {
        console.log(res.data);
        setData(res?.data?.elements);
        setElements(res?.data.total)
      })
  }, [])

  const selected = (e) => {
    setLimit(10)
    setPage(1)
    setSchoolId(e?.target?.value)

    console.log(e?.target?.value);

    if (e?.target?.value === "0") {
      axiosInstance.get(`/Posts/GetAllPosts?limit=${10}&page=${1}&isseen=false`)
        .then((res) => {
          console.log(res.data?.elements);
          setData(res.data?.elements);
          setElements(res.data.total)
        })
    } else {
      axiosInstance.get(`/Posts/GetSchoolPostsForTXTB?limit=${10}&page=${1}&schoolid=${e?.target?.value}`)
        .then((res) => {
          setData(res.data.elements);
          setElements(res.data.total)
          console.log(res.data);
        })
    }
  }

  return (
    <Wrapper>
      <div className="card">
        <div className="card-header">
          <div className="d-sm-flex align-items-center justify-content-between">
            <h2 className="mb-sm-0 font-size-24">O'qilmagan postlar</h2>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-danger btn-lg mt-3"
                  onClick={() => setDeleteModal(true)}>
                  Barchasini bekor qilish
                </button>
              </div>

              <div className="form-floating mt-3">
                <select className="form-select w-100"
                  id="floatingInput"
                  aria-describedby="floatingInputHelp"
                  style={{ height: "58px", minWidth: "200px" }}
                  onChange={(e) => selected(e)}
                >
                  <option value={0}>
                    Barchasi
                  </option>
                  {
                    schools.map((item, index) => {
                      return (
                        <option value={item.id}>
                          {item.name}
                        </option>
                      )
                    })
                  }
                </select>
                <label for="floatingInput">Maktabni tanlang</label>

              </div>
            </div>
          </div>
        </div>

        <div className="card-body">



          <table className="table table-primary table-bordered align-middle mb-0 table-striped">
            <thead>
              <tr className='text-center'>
                <th>№</th>
                <th>Nomi</th>
                <th>Kategoriya nomi</th>
                <th>Sinfi</th>
                <th>Ismi</th>
                <th>Qiymati</th>
                <th>Qo'shilgan sanasi</th>
                <th>Status</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 && data?.map((item, index) => {
                return (
                  <tr className={`text-center ${item?.description === "Tasdiqlandi" ? "table-success" : item?.description === "Bekor qilindi!" ? "table-danger" : "table-warning"}`} key={index}>
                    <th>{index + 1}</th>
                    {/* <td onClick={() => setRetingModal({ isShow: true, item: item })} style={{ cursor: "pointer" }}>{item.name}</td> */}
                    <td>{item.name}</td>
                    <td>{item.categoryName}</td>
                    <td>{item?.className}</td>
                    <td>{item?.fathersName}</td>
                    <td>{item.price}</td>
                    <td>{item.dateTime?.substr(0, 10)?.split("-")?.reverse().join(".")}</td>
                    <td>{item.description}</td>
                    <td className="text-center">
                      <AiFillEye fontSize={"24px"} cursor={"pointer"} color='#696cff' style={{ margin: "0 8px" }}
                        onClick={() => setEditModal({ isShow: true, item: item })}
                      />
                    </td>
                  </tr>
                )
              })
              }

            </tbody>
          </table>

          <div className="col-lg-12 mt-2">
            <Pagination
              page={page}
              limit={limit}
              elements={elements}
              handlePageClick={handlePageClick}
            />
          </div>


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
            schoolId={schoolId}
          />
        )
      }

      {
        deleteModal && (
          <DeleteModal
            data={data}
            setData={setData}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            Alert={Alert}
            setAlert={setAlert}
            schoolId={schoolId}
          />
        )
      }

      {/* alert */}
      <AlertContent alert={alert} />
    </Wrapper >
  )
}

export default AdminUread

const Wrapper = styled.section`
    
`


// {
//   data?.length > 0 ? (
//     <>
//       <table className="table table-primary table-bordered align-middle mb-0 table-striped">
//         <thead>
//           <tr className='text-center'>
//             <th>№</th>
//             <th>Nomi</th>
//             <th>Kategoriya nomi</th>
//             <th>Sinfi</th>
//             <th>Ismi</th>
//             <th>Qiymati</th>
//             <th>Qo'shilgan sanasi</th>
//             <th>Status</th>
//             <th>Amallar</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((item, index) => {
//             return (
//               <tr className={`text-center ${item?.description === "Tasdiqlandi" ? "table-success" : item?.description === "Bekor qilindi!" ? "table-danger" : "table-warning"}`} key={index}>
//                 <th>{index + 1}</th>
//                 {/* <td onClick={() => setRetingModal({ isShow: true, item: item })} style={{ cursor: "pointer" }}>{item.name}</td> */}
//                 <td>{item.name}</td>
//                 <td>{item.categoryName}</td>
//                 <td>{item?.className}</td>
//                 <td>{item?.fathersName}</td>
//                 <td>{item.price}</td>
//                 <td>{item.dateTime?.substr(0, 10)?.split("-")?.reverse().join(".")}</td>
//                 <td>{item.description}</td>
//                 <td className="text-center">
//                   <AiFillEye fontSize={"24px"} cursor={"pointer"} color='#696cff' style={{ margin: "0 8px" }}
//                     onClick={() => setEditModal({ isShow: true, item: item })}
//                   />

//                   {/* <AiFillEdit fontSize={"24px"} cursor={"pointer"} color='#71dd37' style={{ margin: "0 8px" }}
//                                               onClick={() => setEditModal({ isShow: true, item: item })}
//                                           /> */}

//                 </td>
//               </tr>
//             )
//           })
//           }

//         </tbody>
//       </table>

//       <div className="col-lg-12 mt-2">
//         <Pagination
//           page={page}
//           limit={limit}
//           elements={elements}
//           handlePageClick={handlePageClick}
//         />
//       </div>
//     </>
//   ) : (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "16px" }} >
//       <img src="/assets/img/search.png" alt=""
//         style={{ width: "200px" }} />
//       <h2 className="mb-sm-0 font-size-24 text-primary"
//       // style={{color: "#98ACF8"}}
//       >O'qilmagan postlar yo'q</h2>

//     </div>
//   )
// }