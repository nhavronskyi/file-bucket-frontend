const url: string = "http://localhost:8080/files";

const headers = {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json"
};

export const getAllFilesBasicInfo = () => {
    return fetch(`${url}/get-all`, {
        headers: headers
    })
}

export const checkFile = (file: File) => {
    const formdata = new FormData();
    formdata.append("file", file);
    return fetch(`${url}/check`, {
        method: "POST",
        body: formdata,
    })
}

export const saveFile = (file: File) => {
    const formdata = new FormData();
    formdata.append("file", file);
    return fetch(`${url}/check`, {
        headers: headers,
        method: "POST",
        body: formdata,
    })
}