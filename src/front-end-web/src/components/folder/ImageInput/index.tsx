import React from "react";
import { message as antdMessage } from "antd";

import design from "./design";

interface IProps {
    disabled?: boolean
    setImage: (image: File) => void
    src?: string
}

const getBase64 = (img: any, callback: (imageUrl: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result + ""));
    reader.readAsDataURL(img);
}

const ImageInput: React.FC<IProps> = ({ src, setImage, disabled = false }) => {
    const [imageUrl, setImageUrl] = React.useState("");

    const beforeUpload = (file: File) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            antdMessage.error("You can only upload image.");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            antdMessage.error("You can only upload File smaller than 2MB.");
        }
        return isImage && isLt2M;
    }

    const handleChange = (file: File) => {
        getBase64(file, imageUrl => {
            setImageUrl(imageUrl);
        })
        if (beforeUpload(file)) {
            setImage(file);
        }
    }
    return design({ src, disabled, imageUrl, handleChange })
}

export default ImageInput;
