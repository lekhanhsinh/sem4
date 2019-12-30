import React from "react";
import { Upload, Icon } from "antd";

const design = ({ src, disabled, imageUrl, handleChange }: any) => {
    return (
        <Upload
            name="image"
            disabled={disabled}
            customRequest={({ file }) => handleChange(file)}
            listType="picture-card"
            className="image-uploader"
            showUploadList={false}
        >
            {imageUrl ? (
                <img src={imageUrl ? imageUrl : src} alt="upload" style={{ width:"100%", height:100 }} />
            ) : (
                    <div>
                        <Icon type={"plus"} />
                        <div className="ant-upload-text">Upload</div>
                    </div>
                )}
        </Upload>
    )
}
export default design;