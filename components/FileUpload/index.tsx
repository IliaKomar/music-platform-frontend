import React, { useRef } from "react";
import styles from "./index.module.scss";

interface FileUploadProps {
    setFile: Function;
    accept: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    setFile,
    accept,
    children,
}) => {
    const inputRef = useRef<HTMLInputElement>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0]);
    };
    return (
        <div onClick={() => inputRef.current.click()}>
            <input
                type="file"
                accept={accept}
                className={styles.input}
                ref={inputRef}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;
