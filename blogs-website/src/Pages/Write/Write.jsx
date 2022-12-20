import { useState } from "react";
import { useStateContext } from "../../context/StateContext";
import Select from 'react-select';
import "./Write.css";

export default function Write() {
    const { title, setTitle, desc, setDesc, file, setFile, submitNewPost, category, handleSelectCategory } = useStateContext();

    const updatedCategory = category?.map(({ _id, name }) => ({ value: name, _id: _id }));

    return (
        <div className="write">
            {file && (
                <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
            )}
            <form className="writeForm" onSubmit={submitNewPost}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input id="fileInput" type="file" style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])} required />
                    <input
                        // value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="writeInput"
                        placeholder="Title"
                        type="text"
                        // autoFocus={true}
                        required
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        // value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="writeInput writeText"
                        placeholder="Tell your story..."
                        type="text"
                    />
                </div>


                <Select
                    isMulti
                    name="categories"
                    options={updatedCategory}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    getOptionLabel={(option) => option.value}
                    onChange={handleSelectCategory}
                />


                <div className="writeFormGroup">
                    <button className="writeSubmit" type="submit">
                        Publish
                    </button>
                </div>
            </form>
        </div>
    );
}