import React, {useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import {checkFile} from "../../services/FileService";
import {FileStatus} from "../../interfaces/FileStatus";

export function Check() {
    const [files, setFiles] = useState(null)
    const [fileNames, setFileName] = useState<FileStatus[]>([]);
    const inputRef: any = useRef()

    const handleDragOver = (event: any) => {
        event.preventDefault();
    }

    const handleDrop = (event: any) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files)
    }
    const getResultResp = async () => {
        if (files) {
            await checkFile(files[0]).then(x => x.json())
                .then(json => setFileName(json));
        }
    }

    if (files) {
        getResultResp().then(r => r);
        return (
            <div className="uploads">
                <h1>JSON</h1>
                {
                    fileNames.map((file: FileStatus) => (
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

export default Check;