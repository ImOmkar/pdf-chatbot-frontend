import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

export const createSession =
    () =>
        api.post(
            "/sessions"
        )

export const getSessions = () =>
    api.get("/sessions")

export const deleteSession =
    (
        sessionId
    ) =>
        api.delete(
            `/sessions/${sessionId}`
        )
        
export const getDocuments =
    () =>
        api.get(
            "/documents"
        )

export const getSessionMessages = (
    sessionId
) =>
    api.get(
        `/sessions/${sessionId}`
    )

export const sendMessage = (
    payload
) =>
    api.post(
        "/chat",
        payload
    )

export const uploadPdf =
    (file) => {

        const formData =
            new FormData()

        formData.append(
            "file",
            file
        )

        return api.post(
            "/upload",
            formData
        )
    }

export default api