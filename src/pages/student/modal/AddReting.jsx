import React from 'react'
import axiosInstance from '../../../utils/config'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { styled } from 'styled-components'

function AddReting({ data, setData, posts, setPosts, addReting, setAddReting, Alert, setAlert, retingModal }) {
    const name = useRef()
    const title = useRef()
    const izoh = useRef()
    const selectRef = useRef()
    const [select, setSelect] = useState(0)
    const [file, setFile] = useState([])

    const [base64Strings, setBase64Strings] = useState([]);

    const [category, setCategory] = useState([])
    const [price, setPrice] = useState("")

    useEffect(() => {
        axiosInstance.get(`/tumanxtb/Categories/GetAll`)
            .then((res) => {
                console.log(res.data);
                setCategory(res?.data?.elements);
                setPrice(res?.data?.elements?.[0]?.value)
            })
    }, [])

    const addFunc = (e) => {
        e.preventDefault()

        console.log({
            name: name.current.value,
            title: title.current.value,
            message: izoh.current.value,
            userId: data?.[0]?.id,
            categoryId: Number(selectRef?.current?.value),
            id: retingModal?.item?.id,
            base64String: base64Strings
        })

        axiosInstance.post("/Posts/UploadImage", base64Strings)
            .then((res) => {
                console.log(res.data);
                axiosInstance.post(`Posts/Add`, {
                    name: name.current.value,
                    title: title.current.value,
                    message: izoh.current.value,
                    userId: data?.[0]?.id,
                    categoryId: Number(selectRef?.current?.value),
                    imageIds: res.data
                }).then((res) => {
                    Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");
                    setAddReting({ isShow: false, item: {} });
                    console.log(res.data);
                    axiosInstance.get(`/Posts/GetByUser?userid=${retingModal?.item?.id}`)
                        .then((res) => {
                            setPosts(res.data.elements);
                            console.log(res.data);
                        })
                }).catch((error) => {
                    Alert(setAlert, "danger", "Xatolik");
                })
            })
            .catch((err) => {
                Alert(setAlert, "danger", "Rasm yuklashda xatolik!");
            })




        // Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");
        // setAddReting({ isShow: false, item: {} });
    }

    const selected = (e) => {
        setSelect(e?.target.value)

        category?.forEach((item) => {
            if (item.id === Number(e?.target.value)) {
                setPrice(item.value)
            }
        })
    }

    const handleFileInputChange = async (e) => {
        console.log(e?.target?.files);
        for (let i = 0; i < e?.target?.files?.length; i++) {
            const file = e?.target?.files[i];
            console.log(file);

            if (file) {
                const base64String = await readFileAsBase64(file);
                setBase64Strings((prevBase64Strings) => [
                    ...prevBase64Strings.slice(0, i),
                    base64String,
                    ...prevBase64Strings.slice(i + 1),
                ]);
            }
        }
    };

    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = () => {
                reject(new Error('File reading failed.'));
            };

            reader.readAsDataURL(file);
        });
    };

    console.log(base64Strings);

    const [files, setFiles] = useState([])


    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files;

        console.log(e.target.files);

        const arr = []

        for (let index = 0; index < e?.target?.files?.length; index++) {
            const element = e.target.files[index];

            if (e.target.files[index]) {
                arr.push(element)
            }
        }

        setFileList([...fileList, ...arr]);
        setFiles([...files, ...arr]);

    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        setFiles(updatedList);

    }

    const fileBaseRemove = (itemIndex) => {
        const update = base64Strings.filter((item, index) => index !== itemIndex)
        console.log(update);
        setBase64Strings(update);
    }

    return (
        <div className="modal">
            <div className="modal-dialog-centered" style={{ width: "60%", margin: "0 auto" }}>
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Yangi post qo'shish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setAddReting({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={addFunc}>
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" ref={name}
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                maxLength={50} />
                                            <label for="floatingInput">Nomi</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <select className="form-select w-100"
                                                id="floatingInput"
                                                aria-describedby="floatingInputHelp"
                                                ref={selectRef}
                                                style={{ height: "58px" }}
                                                onChange={(e) => selected(e)}
                                            >
                                                {
                                                    category.map((item, index) => {
                                                        return (
                                                            <option value={item.id}>
                                                                {item.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <label for="floatingInput">Kategoriya</label>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" disabled
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                value={price}
                                            />
                                            <label for="floatingInput">Qiymati</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" ref={title}
                                                id="floatingInput" aria-describedby="floatingInputHelp"
                                                maxLength={100} />
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
                                                maxLength={5000} />
                                            <label for="floatingInput2">Izoh</label>
                                        </div>

                                    </div>
                                </div>

                                {/* <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label for="formFileMultiple" className="form-label">Rasm yuklang</label>
                                        <input className="form-control" type="file" id="formFileMultiple" multiple={true}
                                            accept="image/*"
                                            title='Rasm yuklang'
                                            onChange={(e) => changeFile(e)} />
                                    </div>
                                </div> */}
                                <div>
                                    {/* {base64Strings.map((base64String, index) => (
                                        <img key={index} style={{ width: "200px", display: "inline" }} src={base64String} alt="" />
                                    ))}
                                    <input style={{ display: "block" }}
                                        type="file" multiple
                                        onChange={(event) => handleFileInputChange(event)} // Change the index as needed
                                    /> */}

                                    <Wrapper>
                                        <div
                                            ref={wrapperRef}
                                            className="drop-file-input col-lg-12 mb-3"
                                            onDragEnter={onDragEnter}
                                            onDragLeave={onDragLeave}
                                            onDrop={onDrop}
                                        >
                                            <div className="drop-file-input__label">
                                                {/* <img src={uploadImg} alt="" /> */}
                                                <p>Fayl yuklash uchun bosing yoki faylni bu yerga torting</p>
                                            </div>
                                            <input type="file" multiple
                                                onChange={(event) => { onFileDrop(event); handleFileInputChange(event) }} />
                                        </div>
                                        {
                                            fileList.length > 0 ? (
                                                <div className="drop-file-preview">
                                                    <p className="drop-file-preview__title">
                                                        <b>Rasmlar</b> (hajmi 1 MB dan kichik bo'lishi kerak)
                                                    </p>
                                                    {
                                                        fileList.map((item, index) => (
                                                            <div key={index} className="drop-file-preview__item">
                                                                <img src={URL.createObjectURL(item)} alt="" className='image' />
                                                                <div className="drop-file-preview__item__info">
                                                                    <p>{item.name}</p>
                                                                    <p>{Math.ceil(item.size / 1024)} KB</p>
                                                                </div>
                                                                <span className="drop-file-preview__item__del" onClick={() => { fileRemove(item); fileBaseRemove(index) }}>x</span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ) : null
                                        }
                                    </Wrapper>
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

export default AddReting


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
    margin-top: 30px;
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