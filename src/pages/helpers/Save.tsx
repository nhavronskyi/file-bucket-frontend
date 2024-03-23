import React, {useEffect, useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import {saveFile} from "../../services/FileService";
import {FileStatus} from "../../interfaces/FileStatus";
import {useNavigate} from "react-router-dom";

export function Save() {
    const [files, setFiles] = useState(null)
    const [fileStatus, setFileStatus] = useState<FileStatus>({
        malicious: 0,
        suspicious: 0,
        undetected: 0
    });
    const [checkStatus, setCheckStatus] = useState<Boolean>(false)
    const inputRef: any = useRef()
    const navigate = useNavigate();

    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files);
    };

    useEffect(() => {
        const getResultResp = async () => {
            if (files) {
                try {
                    const response = await saveFile(files[0]);
                    const json = await response.json();
                    setFileStatus(json);
                    setCheckStatus(true)
                } catch (error) {
                    console.error("Error fetching file status:", error);
                }
            }
        };

        getResultResp().then(r => r);
    }, [files]);

    if (checkStatus) {
        if (fileStatus.malicious > 0 || fileStatus.suspicious > 0) {
            return (
                <div className="uploads">
                    <h1>JSON</h1>
                    {
                        <div>
                            <p>suspicious: {fileStatus.suspicious}</p>
                            <p>malicious: {fileStatus.malicious}</p>
                            <p>undetected: {fileStatus.undetected}</p>
                        </div>
                    }
                </div>
            )
        }

        navigate('/files')
    }

    return (!files &&
        <Box className="dropzone"
             onDragOver={handleDragOver}
             onDrop={handleDrop}
        >
            <h1>SAVE FILE</h1>
            <h1>Drag and Drop Files to Upload</h1>
            <h1>Or</h1>
            <input
                type="file"
                onChange={(event: any) => setFiles(event.target.files)}
                hidden
                ref={inputRef}
            />
            <Button onClick={() => inputRef.current.click()}>Select from Files</Button>
        </Box>)
}

export default Save;