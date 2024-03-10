const url: string = "http://localhost:8080/auth";
export const login = (email: string, password: string) => {
    return fetch(`${url}/login`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password}),
    })
}
export const register = (email: string, password: string) => {
    return fetch(`${url}/register`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password}),
    })
}