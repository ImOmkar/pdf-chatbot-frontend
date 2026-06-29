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

export const renameSession =
    (
        sessionId,
        title
    ) =>
        api.put(
            `/sessions/${sessionId}`,
            {
                title
            }
        )
        
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

export const getDocumentInfo =
    (filename) =>
        api.get(
            "/document-info",
            {
                params: {
                    filename
                }
            }
        )

export const deleteDocument =
    (filename) =>
        api.delete(
            "/documents",
            {
                params: {
                    filename
                }
            }
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





export const sendMessageStream =
    async (
        payload,
        onChunk
    ) => {

        const response =
            await fetch(

                "http://127.0.0.1:8000/chat/stream",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify(
                        payload
                    )

                }

            )

        const reader =
            response.body.getReader()

        const decoder =
            new TextDecoder()

        while (true) {

            const {
                done,
                value
            } =
                await reader.read()

            if (done) {

                break

            }

            onChunk(

                decoder.decode(
                    value
                )

            )

        }

    }
export default api