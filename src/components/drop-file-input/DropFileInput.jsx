import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { styled } from 'styled-components';

// import uploadImg from '../../assets/cloud-upload-regular-240.png';

const DropFileInput = ({ files, setFiles, readFileAsBase64, handleFileInputChange }) => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files;

        handleFileInputChange(e.target.files)

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

    return (
        <Wrapper>
            <div
                ref={wrapperRef}
                className="drop-file-input col-lg-12"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    {/* <img src={uploadImg} alt="" /> */}
                    <p>Fayl yuklash uchun bosing</p>
                </div>
                <input type="file" value="" multiple
                    onChange={(event) => onFileDrop(event)} />
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={URL.createObjectURL(item)} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </Wrapper>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;

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

.drop-file-input__label img {
    width: 100px;
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
}

.drop-file-preview__item__del {
    background-color: #fff;
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

    background-color: #fff;
    padding: 30px;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`