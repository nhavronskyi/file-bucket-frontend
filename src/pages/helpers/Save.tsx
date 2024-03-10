import React, {useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import {saveFile} from "../../services/FileService";
import {FileStatus} from "../../interfaces/FileStatus";
import {useNavigate} from "react-router-dom";

export function Save() {
    const [files, setFiles] = useState(null)
    const [fileStatuses, setFileName] = useState<FileStatus[]>([]);
    const inputRef: any = useRef()
    const navigate = useNavigate();

    const handleDragOver = (event: any) => {
        event.preventDefault();
    }

    const handleDrop = (event: any) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files)
    }
    const getResultResp = async () => {
        if (files) {
            await saveFile(files[0]).then(x => x.json())
                .then(json => setFileName(json));
        }
    }

    if (files) {
        getResultResp().then(r => r);

        for (let fileStatus of fileStatuses) {
            if (fileStatus.malicious > 0 || fileStatus.suspicious > 0) {
                return (
                    <div className="uploads">
                        <h1>JSON</h1>
                        {
                            fileStatuses.map((file: FileStatus) => (
                                    <div>
                                        <p>suspicious: {file.suspicious}</p>
                                        <p>malicious: {file.malicious}</p>
                                        <p>suspicious: {file.undetected}</p>
                                    </div>
                                )
                            )
                        }
                    </div>
                )
            }
        }

        navigate('/files')
    }

    return (!files &&
        <Box className="dropzone"
             onDragOver={handleDragOver}
             onDrop={handleDrop}
        >
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