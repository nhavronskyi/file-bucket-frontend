const url: string = "http://localhost:8080/files";

const AuthHeader = {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
};

export const getAllFilesBasicInfo = () => {
    return fetch(`${url}/get-all`, {
        headers: AuthHeader
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
    return fetch(`${url}/save`, {
        headers: AuthHeader,
        method: "POST",
        body: formdata,
    })
}