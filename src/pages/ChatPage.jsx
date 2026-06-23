import { useState, useEffect } from "react"

import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import MessageInput from "../components/MessageInput"
import {
    getSessions,
    sendMessage,
} from "../services/api"

import {
    uploadPdf,
    getDocuments,
    getDocumentInfo
}
from "../services/api"

import WelcomeScreen
from "../components/WelcomeScreen"

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

                alert(
                    "PDF Uploaded"
                )

                await loadSessions()
                await loadDocuments()

            }
            catch(error) {

                console.log(error)

            }

        }

    const handleSend =
        async () => {

            if (loading) {
                return
            }

            if (
                !input.trim()
            ) {
                return
            }

            if (
                !selectedSession
            ) {
                alert(
                    "Select a session"
                )
                return
            }

            try {

                setLoading(true)

                const userMessage = {
                    role: "human",
                    content: input
                }

                setMessages(
                    prev => [
                        ...prev,
                        userMessage
                    ]
                )

                const question =
                    input

                setInput("")

                const payload = {

                    session_id:
                        selectedSession.session_id,

                    question
                }

                if (activeDocument) {

                    payload.document =
                        activeDocument
                }

                const response =
                    await sendMessage(
                        payload
                    )

                setLoading(false)

                const aiMessage = {
                    role: "ai",
                    content:
                        response.data.answer
                }

                setMessages(
                    prev => [
                        ...prev,
                        aiMessage
                    ]
                )

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
                        ?.includes(
                            "429"
                        )
                )
                {
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