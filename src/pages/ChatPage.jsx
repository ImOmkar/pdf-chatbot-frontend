import { useState, useEffect } from "react"

import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import MessageInput from "../components/MessageInput"
import {
    getSessions,
    sendMessage,
    sendMessageStream
} from "../services/api"

import {
    uploadPdf,
    getDocuments,
    getDocumentInfo
}
from "../services/api"

import WelcomeScreen
from "../components/WelcomeScreen"

import toast
from "react-hot-toast"

export default function ChatPage() {

    const [
        selectedSession,
        setSelectedSession
    ] = useState(null)

    const [
        messages,
        setMessages
    ] = useState([])

    const [sessions, setSessions] = useState([])    
    const [input, setInput] = useState("")
    const [documents, setDocuments] = useState([])
    const [activeDocument, setActiveDocument] = useState(null)

    const [documentInfo, setDocumentInfo] = useState(null)

    const [loading, setLoading] = useState(false)

    const loadSessions =
        async () => {

            try {

                const response =
                    await getSessions()

                setSessions(
                    response.data.sessions
                )

            }
            catch(error) {

                console.log(error)

            }

        }

    const loadDocuments =
        async () => {

            try {

                const response =
                    await getDocuments()

                setDocuments(
                    response.data.documents
                )

            }
            catch(error) {

                console.log(error)

            }

        }

    const loadDocumentInfo =
        async (
            document
        ) => {

            try {

                const response =
                    await getDocumentInfo(
                        document
                    )

                setDocumentInfo(
                    response.data
                )

            }
            catch(error) {

                console.log(error)

            }

        }

    useEffect(
        () => {

            loadSessions()
            loadDocuments()

        },
        []
    )

    const handleUpload =
        async (file) => {

            try {

                await uploadPdf(
                    file
                )

                toast.success(
                    `${file.name} uploaded successfully.`
                )

                await loadSessions()
                await loadDocuments()

            }
            catch(error) {

                console.log(error)

                toast.error(
                    "Upload failed."
                )

            }

        }

    // const streamResponse =
    //     async (
    //         question,
    //         replaceMessageIndex = null
    //     ) => {

    //         setLoading(true)

    //         const payload = {

    //             session_id:
    //                 selectedSession.session_id,

    //             question

    //         }

    //         if (activeDocument) {

    //             payload.document =
    //                 activeDocument

    //         }

    //         const getAIIndex =
    //             (updated) =>

    //                 replaceMessageIndex !== null

    //                     ? replaceMessageIndex

    //                     : updated.length - 1

    //         let aiResponse = ""

    //         if (
    //             replaceMessageIndex !== null
    //         ) {

    //             setMessages(
    //                 prev => {

    //                     const updated = [...prev]

    //                     updated[
    //                         getAIIndex(updated)
    //                     ] = {

    //                         role: "ai",

    //                         content: "",

    //                         sources: []

    //                     }

    //                     return updated

    //                 }
    //             )

    //         }

    //         else {

    //             setMessages(
    //                 prev => [

    //                     ...prev,

    //                     {

    //                         role: "ai",

    //                         content: "",

    //                         sources: []

    //                     }

    //                 ]
    //             )

    //         }

    //         await sendMessageStream(

    //             payload,

    //             (event) => {

    //                 if (
    //                     event.type === "chunk"
    //                 ) {

    //                     aiResponse +=
    //                         event.content

    //                     setMessages(
    //                         prev => {

    //                             const updated = [...prev]

    //                             updated[
    //                                 getAIIndex(updated)
    //                             ] = {

    //                                 ...updated[
    //                                     getAIIndex(updated)
    //                                 ],

    //                                 content:
    //                                     aiResponse

    //                             }

    //                             return updated

    //                         }
    //                     )

    //                 }

    //                 else if (
    //                     event.type === "done"
    //                 ) {

    //                     setMessages(
    //                         prev => {

    //                             const updated = [...prev]

    //                             updated[
    //                                 getAIIndex(updated)
    //                             ] = {

    //                                 ...updated[
    //                                     getAIIndex(updated)
    //                                 ],

    //                                 sources:
    //                                     event.sources || []

    //                             }

    //                             return updated

    //                         }
    //                     )

    //                     setLoading(false)

    //                 }

    //             }

    //         )

    //     }

    const streamResponse =
    async ({

        question,

        regenerateMessageId = null

    }) => {

        setLoading(true)

        const payload = {

            session_id:
                selectedSession.session_id,

            question,

            regenerate_message_id:
                regenerateMessageId

        }

        if (activeDocument) {

            payload.document =
                activeDocument

        }

        let aiResponse = ""

        // Append ONLY an empty AI message
        setMessages(
            prev => [

                ...prev,

                {

                    role: "ai",

                    content: "",

                    sources: []

                }

            ]
        )

        try {

            await sendMessageStream(

                payload,

                (event) => {

                    if (event.type === "chunk") {

                        aiResponse += event.content

                        setMessages(prev => {

                            const updated = [...prev]

                            updated[updated.length - 1] = {

                                ...updated[updated.length - 1],

                                content: aiResponse

                            }

                            return updated

                        })

                    }

                    else if (event.type === "done") {

                        setMessages(prev => {

                            const updated = [...prev]

                            updated[updated.length - 1] = {

                                ...updated[updated.length - 1],

                                sources: event.sources || []

                            }

                            return updated

                        })

                        setLoading(false)

                    }

                }

            )

        }

        catch (error) {

            setLoading(false)

            throw error

        }

    }

    const handleSend =
        async () => {

            if (loading) {
                return
            }

            if (!input.trim()) {
                return
            }

            if (!selectedSession) {

                alert(
                    "Select a session"
                )

                return

            }

            try {

                const question = input

                setMessages(
                    prev => [

                        ...prev,

                        {

                            role: "human",

                            content: question

                        }

                    ]
                )

                setInput("")

                await streamResponse({
                    question
                })

                await loadSessions()

            }

            catch(error) {

                setLoading(false)

                console.log(error)

                let errorMessage =
                    "Something went wrong."

                if (
                    error.response?.data?.detail
                ) {

                    errorMessage =
                        error.response.data.detail

                }

                if (
                    error.response?.data?.detail
                        ?.includes("429")
                ) {

                    errorMessage =
                        "Daily Gemini limit reached. Try again later."

                }

                setMessages(
                    prev => [

                        ...prev,

                        {

                            role: "ai",

                            content:
                                `❌ ${errorMessage}`

                        }

                    ]
                )

            }

        }

    // const handleRegenerate =
    //     async (
    //         messageIndex
    //     ) => {

    //         if (loading) {
    //             return
    //         }

    //         const userMessage =
    //             messages[
    //                 messageIndex - 1
    //             ]

    //         if (
    //             !userMessage ||
    //             userMessage.role !== "human"
    //         ) {
    //             return
    //         }

    //         await streamResponse(

    //             userMessage.content,

    //             messageIndex

    //         )

    //     }

    const handleRegenerate =
    async (
        humanMessageId,
        aiIndex
    ) => {

        if (loading) {
            return
        }

        const userMessage =
            messages[
                aiIndex - 1
            ]

        if (
            !userMessage ||
            userMessage.role !== "human"
        ) {
            return
        }

        // Trim everything after the selected human message
        const trimmedMessages =
            messages.slice(
                0,
                aiIndex
            )

        setMessages(
            trimmedMessages
        )

        // Wait for React to apply the state update
        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    0
                )
        )

        await streamResponse({

            question:
                userMessage.content,

            regenerateMessageId:
                humanMessageId

        })

    }

    return (

        <div
            className="
                h-screen
                flex
                bg-gradient-to-b
              from-slate-950
              to-slate-900
            ">

            <Sidebar
                sessions={sessions}
                documents={documents}

                loadDocuments={
                    loadDocuments
                }

                documentInfo={documentInfo}
                setDocumentInfo={setDocumentInfo}
                loadDocumentInfo={loadDocumentInfo}

                activeDocument={
                    activeDocument
                }

                setActiveDocument={
                    setActiveDocument
                }

                selectedSession={
                    selectedSession
                }
                setSelectedSession={
                    setSelectedSession
                }
                setMessages={
                    setMessages
                }
                loadSessions={
                    loadSessions
                }
                onUpload={
                    handleUpload
                }
            />

            <div
                className="
                    flex-1
                    flex
                    flex-col
                "
            >

                {
                    selectedSession ? (

                        <>

                            <ChatWindow
                                messages={messages}
                                loading={loading}
                                loadDocuments={
                                    loadDocuments
                                }
                                activeDocument={activeDocument}
                                selectedSession={selectedSession}
                                documentInfo={
                                    documentInfo
                                }
                                setActiveDocument={
                                    setActiveDocument
                                }
                                onRegenerate={
                                    handleRegenerate
                                }
                            />

                            <MessageInput
                                input={input}
                                setInput={setInput}
                                onSend={handleSend}
                                loading={loading}
                            />

                        </>

                    ) : (

                        <WelcomeScreen />

                    )
                }

            </div>

        </div>
    )
}