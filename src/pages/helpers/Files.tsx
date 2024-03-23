import React, {useEffect, useState} from "react";
import {Box, Grid} from "@mui/material";
import {BasicFile} from "../../interfaces/BasicFile";
import {getAllFilesBasicInfo} from "../../services/FileService";

export function Files() {
    const [files, setFiles] = useState<BasicFile[]>([]);

    useEffect((): void => {
        const allFilesInfo = async () => {
            await getAllFilesBasicInfo().then(response => response.json())
                .then(json => setFiles(json));
        }

        allFilesInfo().then(r => r)
    }, []);

    return (<Box>
        {files.map((file: BasicFile) => (
            <Grid key={file.name} item md={4} sx={{
                borderStyle: "outset",
                borderRadius: '10px',
                padding: "10px",
                backgroundColor: "white"
            }}>
                <Box>Name: {file.name} </Box>
                <Box>Size: {file.size} </Box>
            </Grid>
        ))}
    </Box>)
}

export default Files;