import React, { useRef, useState } from 'react'
import axiosInstance from '../../../utils/config';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import SeenModal from '../../../components/SeenModal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert, schoolId }) {
    const name = useRef()
    const title = useRef()
    const izoh = useRef()

    console.log(editModal);

    const [category, setCategory] = useState([])

    const [seen, setSeen] = useState({ isShow: false, item: "" })

    useEffect(() => {
        axiosInstance.get(`/tumanxtb/Categories/GetAll`)
            .then((res) => {
                setCategory(res.data.elements);
                console.log(res.data.elements);
            })
    }, [])

    const [data1, setData1] = useState({})
    const [base64Strings2, setBase64Strings2] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/Posts/Get?postid=${editModal?.item?.id}`)
            .then((res) => {
                setData1(res.data);
                setBase64Strings2(res?.data?.images)
                console.log(res.data);
            })
    }, [editModal?.item?.id])

    const [telegramInfo, setTelegramInfo] = useState({ bool: null, isShow: false })

    const telegramSending = (bool, postid) => {
        axiosInstance.get(`/Posts/AccessForTelegramChannel?postid=${postid}&allow=${bool}`)
            .then((res) => {
                setTelegramInfo({ bool: bool, isShow: true })
            })
    }

    const [webInfo, setWebInfo] = useState({ bool: null, isShow: false })

    const webSending = (bool, postid) => {
        axiosInstance.get(`/Posts/AccessForWebSite?postid=${postid}&allow=${bool}`)
            .then((res) => {
                setWebInfo({ bool: bool, isShow: true })
            })
    }

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                setEditModal({ isShow: false, item: {} })
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [setEditModal])

    return (
        <div className="modal">
            <div className="modal-dialog-centered" style={{ width: "60%", margin: "0 auto" }}>
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Postni ko'rish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setEditModal({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body pb-2">
                        <form>
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" ref={name}
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                defaultValue={data1?.name} maxLength={50} />
                                            <label for="floatingInput">Nomi</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" ref={title}
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                defaultValue={data1?.title} maxLength={100} />
                                            <label for="floatingInput">Sarlavha</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <textarea className="form-control form-control-lg"
                                                ref={izoh} type="text"
                                                aria-describedby="floatingInputHelp"
                                                id="floatingInput2"
                                                defaultValue={data1?.message}
                                                maxLength={5000} />
                                            <label for="floatingInput2">Izoh</label>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-lg-9">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" disabled
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                value={editModal?.item?.categoryName} />
                                            <label for="floatingInput">Baholash me`zoni</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" disabled
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                value={editModal?.item?.price} />
                                            <label for="floatingInput">Ball</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" disabled
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                defaultValue={data1?.description} />
                                            <label for="floatingInput">Status</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" disabled
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                defaultValue={editModal?.item?.dateTime?.substr(0, 10) + " , " + editModal?.item?.dateTime?.substr(11, 5)} />
                                            <label for="floatingInput">Post vaqti</label>
                                        </div>
                                    </div>
                                </div>

                                {
                                    data1?.status === 1 && (
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" disabled
                                                        id="floatingInput" aria-describedby="floatingInputHelp"
                                                        style={{ color: data1?.telegramSending === 1 ? "" : data1?.telegramSending === 2 ? "#ffab00" : data1?.telegramSending === 3 ? "#71dd37" : data1?.telegramSending === 4 ? "#ff3e1d" : data1?.telegramSending === 5 ? "#696cff" : "" }}
                                                        defaultValue={
                                                            data1?.telegramSending === 1 ? "Ruxsat so'ralmadi" : data1?.telegramSending === 2 ? "Ruxsat so'raldi" : data1?.telegramSending === 3 ? "Tasdiqlandi" : data1?.telegramSending === 4 ? "Bekor qilindi" : data1?.telegramSending === 5 ? "Xabar uzatildi" : ""
                                                        } />
                                                    <label for="floatingInput">Telegram</label>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    data1?.status === 1 && (
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" disabled
                                                        id="floatingInput" aria-describedby="floatingInputHelp"
                                                        style={{ color: data1?.webSending === 1 ? "" : data1?.webSending === 2 ? "#ffab00" : data1?.webSending === 3 ? "#71dd37" : data1?.webSending === 4 ? "#ff3e1d" : "" }}
                                                        defaultValue={
                                                            data1?.webSending === 1 ? "Ruxsat so'ralmadi" : data1?.webSending === 2 ? "Ruxsat so'raldi" : data1?.webSending === 3 ? "Tasdiqlandi" : data1?.webSending === 4 ? "Bekor qilindi" : ""
                                                        } />
                                                    <label for="floatingInput">Websayt</label>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                <Wrapper>

                                    {
                                        (base64Strings2?.length > 0) ? (
                                            <div className="drop-file-preview">
                                                <p className="drop-file-preview__title">
                                                    <b style={{ fontSize: "18px" }}>Yuborilgan rasmlar: </b>
                                                </p>

                                                <div className="row">
                                                    {
                                                        base64Strings2?.length > 0 && base64Strings2.map((item, index) => (
                                                            <div className="col-lg-6" key={index}>
                                                                <div className="drop-file-preview__item">
                                                                    <img src={item} alt="" className='image' style={{ cursor: "pointer" }}
                                                                        onClick={() => setSeen({ isShow: true, item: item })} />
                                                                    <div className="drop-file-preview__item__info">
                                                                        <p>rasm {index + 1}</p>
                                                                        <p>{Math.ceil(item.length / 1024)} KB</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>

                                            </div>
                                        ) : null
                                    }
                                </Wrapper>

                                {
                                    data1?.telegramSending === 2 && (
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <div className="form-control">
                                                    <label className='text-primary'><b>Telegram</b></label> <br />
                                                    <label for="floatingInput">Ushbu direktor sizdan quyidagi postni rasmiy telegram kanalga chiqarish uchun ruxsat so'rayapti. Siz <b>"Tasdiqlash"/"Bekor qilish"</b> orqali o'z reaksiyangizni bildiring</label>
                                                    <div className="row">
                                                        {
                                                            !telegramInfo.isShow ? (
                                                                <>

                                                                    <div className="col-lg-6">
                                                                        <div className="my-2">
                                                                            <button className="btn-lg btn btn-success w-100"
                                                                                type='button'
                                                                                onClick={() => telegramSending(true, data1.id)}>
                                                                                Tasdiqlash
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-6">
                                                                        <div className="my-2">
                                                                            <button className="btn-lg btn btn-danger w-100"
                                                                                type='button'
                                                                                onClick={() => telegramSending(false, data1.id)}>
                                                                                Bekor qilish
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                telegramInfo?.bool ? <h3 className='text-success text-center mt-2'><BsFillCheckCircleFill /> Tasdiqlandi.</h3> : <h3 className='text-danger text-center mt-2'><AiFillCloseCircle /> Bekor qilindi.</h3>
                                                            )
                                                        }

                                                    </div>



                                                </div>
                                            </div>
                                        </div>


                                    )
                                }

                                {
                                    data1?.webSending === 2 && (
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <div className="form-control">
                                                    <label className='text-primary'><b>Web sayt</b></label> <br />
                                                    <label for="floatingInput">Ushbu direktor sizdan quyidagi postni rasmiy web saytga chiqarish uchun ruxsat so'rayapti. Siz <b>"Tasdiqlash"/"Bekor qilish"</b> orqali o'z reaksiyangizni bildiring</label>
                                                    <div className="row">

                                                        {!webInfo.isShow ? (
                                                            <>
                                                                <div className="col-lg-6">
                                                                    <div className="my-2">
                                                                        <button className="btn-lg btn btn-success w-100"
                                                                            type='button'
                                                                            onClick={() => webSending(true, data1.id)}>
                                                                            Tasdiqlash
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-6">
                                                                    <div className="my-2">
                                                                        <button className="btn-lg btn btn-danger w-100"
                                                                            type='button'
                                                                            onClick={() => webSending(false, data1.id)}>
                                                                            Bekor qilish
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            webInfo?.bool ? <h3 className='text-success text-center mt-2'><BsFillCheckCircleFill /> Tasdiqlandi.</h3> : <h3 className='text-danger text-center mt-2'><AiFillCloseCircle /> Bekor qilindi.</h3>
                                                        )}
                                                    </div>



                                                </div>
                                            </div>
                                        </div>


                                    )
                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {
                seen.isShow && (
                    <SeenModal
                        seen={seen}
                        setSeen={setSeen}
                    />
                )
            }
        </div>
    )
}

export default EditModal



const Wrapper = styled.div`
    .drop-file-input {
    position: relative;
    height: 200px;
    border: 2px dashed #4267b2;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #f5f8ff;
}

.drop-file-input input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.drop-file-input:hover,
.drop-file-input.dragover {
    opacity: 0.6;
}

.drop-file-input__label {
    text-align: center;
    color: #ccc;
    font-weight: 600;
    padding: 10px;
}

.drop-file-preview__item .image {
    height: 50px;
    object-fit: contain;
}

.drop-file-preview {
    margin-top: 8px;
}

.drop-file-preview p {
    font-weight: 500;
}

.drop-file-preview__title {
    margin-bottom: 20px;
}

.drop-file-preview__item {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    background-color: #f5f8ff;
    padding: 15px;
    border-radius: 20px;
}

.drop-file-preview__item img {
    width: 50px;
    margin-right: 20px;
}

.drop-file-preview__item__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    justify-content: center;
}

.drop-file-preview__item__del {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.drop-file-preview__item:hover .drop-file-preview__item__del {
    opacity: 1;
}
    border-radius: 20px;
`