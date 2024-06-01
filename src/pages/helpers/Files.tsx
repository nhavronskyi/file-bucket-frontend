import React, {useEffect, useRef, useState} from "react";
import {Box, Button, Grid} from "@mui/material";
import {BasicFile} from "../../interfaces/BasicFile";
import {deleteFile, getAllFilesBasicInfo, getFile} from "../../services/FileService";
import {useNavigate} from "react-router-dom";

export function Files() {
    const [files, setFiles] = useState<BasicFile[]>([]);
    const navigate = useNavigate();
    const inputRef: any = useRef()
    useEffect((): void => {

        if (localStorage.getItem('token') === null) {
            navigate('/check')
        } else {

            const allFilesInfo = async () => {
                await getAllFilesBasicInfo().then(response => response.json())
                    .then(json => setFiles(json));
            }
            allFilesInfo().then(r => r)
        }
    }, []);

    const handleDownload = async (fileName: string) => {
        const response: Response = await getFile(fileName);

        if (!response.ok) {
            console.error('Failed to download file');
            return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleDelete = async (fileName: string) => {
        try {
            const response = await deleteFile(fileName);
            if (response.status === 200) {
                setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
            } else {
                console.error('Failed to delete file');
            }
        } catch (error) {
            console.error('Error occurred while deleting file:', error);
        }
    };

    return (
        <Box>
            {files.map((file: BasicFile) => (
                <Grid key={file.name} item md={4} sx={{
                    borderStyle: "outset",
                    borderRadius: '10px',
                    padding: "10px",
                    backgroundColor: "white"
                }}>
                    <Box>Name: {file.name} </Box>
                    <Box>Size: {file.size} </Box>
                    <Button onClick={() => handleDelete(file.name)}>Delete</Button>
                    <Button onClick={() => handleDownload(file.name)}>Download</Button>
                </Grid>
            ))}
        </Box>
    );
}

export default Files;