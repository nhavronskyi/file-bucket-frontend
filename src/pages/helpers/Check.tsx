import React, {useEffect, useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import {checkFile} from "../../services/FileService";
import {FileStatus} from "../../interfaces/FileStatus";

export function Check() {
    const [files, setFiles] = useState(null)
    const [fileStatus, setFileStatus] = useState<FileStatus>({
        malicious: 0,
        suspicious: 0,
        undetected: 0
    });
    const inputRef: any = useRef()

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
                    const response = await checkFile(files[0]);
                    const json = await response.json();
                    setFileStatus(json);
                } catch (error) {
                    console.error("Error fetching file status:", error);
                }
            }
        };

        getResultResp().then(r => r);
    }, [files]);

    if (files) {
        return (
            <div className="uploads">
                <h1>JSON</h1>
                {
                    <div>
                        <p>suspicious: {fileStatus.suspicious}</p>
                        <p>malicious: {fileStatus.malicious}</p>
                        <p>suspicious: {fileStatus.undetected}</p>
                    </div>
                }
            </div>
        )
    }

    return (!files &&
        <Box className="dropzone"
             onDragOver={handleDragOver}
             onDrop={handleDrop}
        >
            <h1>CHECK FILE</h1>
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

export default Check;