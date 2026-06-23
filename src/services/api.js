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

export default api