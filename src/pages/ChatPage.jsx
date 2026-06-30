import { useState, useEffect, useRef } from "react"

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
    getDocumentInfo,
    exportChat,
    getSourceDetails
}
from "../services/api"

import SourceViewerModal
from "../components/SourceViewerModal"

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

    const [

        selectedSource,

        setSelectedSource

    ] = useState(
        null
    )

    const [

        sourceViewerOpen,

        setSourceViewerOpen

    ] = useState(
        false
    )

    const [loading, setLoading] = useState(false)
    
    const abortControllerRef = useRef(null)



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

        setMessages(
            prev => [

                ...prev,

                {

                    role: "ai",

                    content: "",

                    sources: [],

                    completed: false

                }

            ]
        )

        try {

            abortControllerRef.current = new AbortController()

            await sendMessageStream(

                payload,

                (event) => {

                    if (event.type === "chunk") {

                        aiResponse += event.content

                        setMessages(prev => {

                            const updated = [...prev]

                            updated[
                                updated.length - 1
                            ] = {

                                ...updated[
                                    updated.length - 1
                                ],

                                content:
                                    aiResponse

                            }

                            return updated

                        })

                    }

                    else if (
                        event.type === "done"
                    ) {

                        setMessages(prev => {

                            const updated = [...prev]

                            updated[
                                updated.length - 1
                            ] = {

                                ...updated[
                                    updated.length - 1
                                ],

                                sources:
                                    event.sources || [],

                                suggestions:
                                    event.suggestions || [],

                                completed: true

                            }

                            return updated

                        })

                        setLoading(false)

                    }

                },

                abortControllerRef.current.signal

            )

        }

        catch (error) {

            setLoading(false)

            if (
                error.name === "AbortError"
            ) {

                console.log(
                    "Generation stopped."
                )

                return

            }

            throw error

        }

    }

    const sendQuestion =
    async (
        question
    ) => {

        if (loading) {
            return
        }

        if (!selectedSession) {
            return
        }

        try {

            setMessages(
                prev => [

                    ...prev,

                    {

                        role: "human",

                        content: question

                    }

                ]
            )

            await streamResponse({

                question

            })

            await loadSessions()

        }

        catch (error) {

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

        const question = input.trim()

        setInput("")

        await sendQuestion(
            question
        )

    }

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

    const handleSuggestionClick =
        async (
            suggestion
        ) => {

            await sendQuestion(
                suggestion
            )

        }

    const handleStop =
        () => {

            abortControllerRef.current?.abort()

            abortControllerRef.current = null

            setLoading(false)

        }


    const handleExport =
    async () => {

        if (
            !selectedSession
        ) {

            return

        }

        try {

            const response =

                await exportChat(

                    selectedSession.session_id,

                    "txt"

                )

            const blob =

                new Blob(

                    [response.data],

                    {

                        type: "text/plain"

                    }

                )

            const url =
                window.URL.createObjectURL(
                    blob
                )

            const link =
                document.createElement(
                    "a"
                )

            link.href = url

            const disposition =

                response.headers[
                    "content-disposition"
                ]

            const filename =

                disposition
                    ?.split("filename=")[1]
                    ?.replaceAll('"', "")

                ||

                "Conversation.txt"

            link.download = filename

            link.click()

            window.URL.revokeObjectURL(
                url
            )

        }

        catch (error) {

            console.log(error)

            toast.error(
                "Export failed."
            )

        }

    }

    const handleViewSource =
    async (

        document,

        page

    ) => {

        try {

            const response =

                await getSourceDetails(

                    document,

                    page

                )

            setSelectedSource(

                response.data

            )

            setSourceViewerOpen(

                true

            )

        }

        catch (

            error

        ) {

            console.log(
                error
            )

            toast.error(

                "Unable to load source."

            )

        }

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
                                onSuggestionClick={
                                    handleSuggestionClick
                                }
                                onExport={
                                    handleExport
                                }
                                onViewSource={
                                    handleViewSource
                                }
                            />

                            <MessageInput
                                input={input}
                                setInput={setInput}
                                onSend={handleSend}
                                onStop={handleStop}
                                loading={loading}
                            />

                        </>

                    ) : (

                        <WelcomeScreen />

                    )
                }

            </div>

            <SourceViewerModal

                open={
                    sourceViewerOpen
                }

                source={
                    selectedSource
                }

                onClose={
                    () =>

                        setSourceViewerOpen(
                            false
                        )
                }

            />

        </div>
    )
}