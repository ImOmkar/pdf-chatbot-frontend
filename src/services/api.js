import axios from "axios"

const API_URL =
    import.meta.env.VITE_API_URL


// console.log("API url", API_URL)

const api = axios.create({

    baseURL: API_URL

})

// console.log(api)

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



export const exportChat =
    async (
        sessionId,
        format = "txt"
    ) => {

        const response =
            await axios.get(

                `${API_URL}/sessions/${sessionId}/export`,

                {

                    params: {

                        format

                    },

                    responseType: "blob"

                }

            )

        return response

    }

export const sendMessageStream =
    async (
        payload,
        onEvent,
        signal
    ) => {

        const response =
            await fetch(

                `${API_URL}/chat/stream`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            payload
                        ),

                    signal

                }

            )

        const reader =
            response.body.getReader()

        const decoder =
            new TextDecoder()

        let buffer = ""

        while (true) {

            const {

                done,

                value

            } =
                await reader.read()

            if (done) {

                break

            }

            buffer +=
                decoder.decode(
                    value,
                    {
                        stream: true
                    }
                )

            const events =
                buffer.split(
                    "\n\n"
                )

            buffer =
                events.pop()

            for (
                const event
                of events
            ) {

                if (
                    !event.startsWith(
                        "data: "
                    )
                ) {

                    continue

                }

                const json =
                    JSON.parse(

                        event.replace(
                            "data: ",
                            ""
                        )

                    )

                onEvent(
                    json
                )

            }

        }

    }
    


export const getSourceDetails =
    (
        document,
        page
    ) =>

        api.get(

            "/source",

            {

                params: {

                    document,

                    page

                }

            }

        )



export const getDocumentSummary =
    (
        filename
    ) =>

        api.post(

            "/summarize",

            {

                filename

            }

        )


export const togglePinSession =
    (
        sessionId
    ) =>

        api.patch(

            `/sessions/${sessionId}/pin`

        )
        
export default api