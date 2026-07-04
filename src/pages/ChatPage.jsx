import { useState, useEffect, useRef } from "react"

import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import MessageInput from "../components/MessageInput"
import SessionActionSheet
from "../components/SessionActionSheet"
import {
    getSessions,
    sendMessage,
    sendMessageStream,
    createSession,
    togglePinSession,
    renameSession,
    deleteSession
} from "../services/api"

import {
    uploadPdf,
    getDocuments,
    getDocumentInfo,
    exportChat,
    getSourceDetails,
    getDocumentSummary
}
from "../services/api"

import SourceViewerModal
from "../components/SourceViewerModal"

import WelcomeScreen
from "../components/WelcomeScreen"

import DocumentSummaryModal
from "../components/DocumentSummaryModal"

import RenameSessionModal
from "../components/RenameSessionModal"

import RenameSessionSheet
from "../components/RenameSessionSheet"

import SessionContextMenu
from "../components/SessionContextMenu"

import ConfirmBottomSheet
from "../components/ConfirmBottomSheet"

import toast
from "react-hot-toast"
import ConfirmModal from "../components/ConfirmModal"
import SourceViewerSheet from "../components/SourceViewerSheet"

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
        summaryOpen,
        setSummaryOpen
    ] = useState(
        false
    )

    const [
        documentSummary,
        setDocumentSummary
    ] = useState("")
    

    const [
        summaryLoading,
        setSummaryLoading
    ] = useState(
        false
    )

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

    const [
        confirmModal,
        setConfirmModal
    ] = useState({

        open: false,

        title: "",

        message: "",

        confirmText: "Confirm",

        danger: false,

        onConfirm: null

    })

    const [
        sessionActionSheet,
        setSessionActionSheet
    ] = useState({

        open: false,

        session: null

    })

    const [
        renameModal,
        setRenameModal
    ] = useState({

        open: false,

        session: null

    })

    const [
        sessionContextMenu,
        setSessionContextMenu
    ] = useState({

        open: false,

        session: null,

        rect: null

    })

    const [loading, setLoading] = useState(false)

    const [
        sidebarOpen,
        setSidebarOpen
    ] = useState(
        false
    )
    
    const abortControllerRef = useRef(null)


    const handleNewChat =
    async () => {

        setSidebarOpen(false)

        try {

            const response =
                await createSession()

            const session = {

                session_id:
                    response.data.session_id,

                title:
                    "New Chat"

            }

            setSelectedSession(
                session
            )

            setMessages([])

            await loadSessions()

            toast.success(
                "Ready for a new conversation."
            )

        }
        catch(error) {

            console.log(error)

        }

    }

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

                const displayName =
                    file.name.length > 35

                        ? `${file.name.slice(0, 35)}...`

                        : file.name

                toast.success(
                    `${displayName} uploaded successfully.`
                )

                await loadSessions()
                await loadDocuments()

            }
            catch(error) {

                console.log(error)

                toast.error(
                    "Upload failed."
                )

                throw error

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
   
    const handleSummarizeDocument =
    async () => {

        if (
            !activeDocument
        ) {

            return

        }

        try {

            setSummaryOpen(
                true
            )

            setSummaryLoading(
                true
            )

            const response =

                await getDocumentSummary(

                    activeDocument

                )

            if (
                response.data.success
            ) {

                setDocumentSummary(
                    response.data.summary
                )

            }
            else {

                toast.error(
                    response.data.error
                )

                setSummaryOpen(
                    false
                )

            }

        }

        catch (error) {

            console.log(error)

            toast.error(

                "Unable to summarize document."

            )

            setSummaryOpen(
                false
            )

        }

        finally {

            setSummaryLoading(
                false
            )

        }

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

    const handleRenameSession =
    async (
        sessionId,
        title
    ) => {

        try {

            await renameSession(

                sessionId,

                title.trim()

            )

            await loadSessions()

            setRenameModal({

                open: false,

                session: null

            })

            toast.success(
                "Chat renamed."
            )

        }

        catch (error) {

            console.log(error)

            toast.error(
                "Unable to rename chat."
            )

        }

    }

    const handleTogglePin =
    async (
        sessionId
    ) => {

        try {

            await togglePinSession(
                sessionId
            )

            await loadSessions()

        }

        catch (error) {

            console.log(error)

            toast.error(
                "Unable to update pin."
            )

        }

    }

    const openRenameModal = (session) => {

        setSessionActionSheet({
            open: false,
            session: null
        })

        setRenameModal({
            open: true,
            session
        })

    }

    const handleDeleteSession =
    async (
        sessionId
    ) => {

        try {

            await deleteSession(
                sessionId
            )

            await loadSessions()

            toast.success(
                "Session deleted."
            )

            if (
                selectedSession?.session_id
                === sessionId
            ) {

                setSelectedSession(
                    null
                )

                setMessages([])
            }

        }
        catch(error) {

            console.log(error)

            toast.error(
                "Couldn't delete session."
            )

        }

    }

const openDeleteSessionConfirmation =
    (session) => {

        setSessionActionSheet({

            open: false,

            session: null

        })

        setConfirmModal({

            open: true,

            title: "Delete Session",

            message:
                `Are you sure you want to delete "${session.title}"?\n\nThis action cannot be undone.`,

            confirmText: "Delete",

            danger: true,

            onConfirm: async () => {

                await handleDeleteSession(
                    session.session_id
                )

            }

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

                sidebarOpen={
                    sidebarOpen
                }

                setSidebarOpen={
                    setSidebarOpen
                }

                onNewChat={
                    handleNewChat
                }

                setConfirmModal={
                    setConfirmModal
                }

                onTogglePin={
                    handleTogglePin
                }
                
                setSessionActionSheet={
                    setSessionActionSheet
                }

                setRenameModal={
                    setRenameModal
                }

                setSessionContextMenu={
                    setSessionContextMenu
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
                                onSummarizeDocument={
                                    handleSummarizeDocument
                                }

                                sidebarOpen={
                                    sidebarOpen
                                }

                                setSidebarOpen={
                                    setSidebarOpen
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

                        <WelcomeScreen 
                            onStartChat={handleNewChat} 
                            setSidebarOpen={setSidebarOpen} 
                            onUpload={
                                handleUpload
                            }
                            
                        />

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

            <SourceViewerSheet

                open={
                    sourceViewerOpen
                }

                source={
                    selectedSource
                }

                onClose={() =>

                    setSourceViewerOpen(false)

                }

            />

            <DocumentSummaryModal

                open={
                    summaryOpen
                }

                summary={
                    documentSummary
                }

                loading={
                    summaryLoading
                }

                document={
                    activeDocument
                        ?.split(/[/\\]/)
                        .pop()
                }

                onClose={
                    () =>

                        setSummaryOpen(
                            false
                        )
                }

            />

            {/* confirm modal */}
            <ConfirmModal

                open={
                    confirmModal.open
                }

                title={
                    confirmModal.title
                }

                message={
                    confirmModal.message
                }

                confirmText={
                    confirmModal.confirmText
                }

                danger={
                    confirmModal.danger
                }

                onCancel={
                    () =>
                    setConfirmModal({

                        ...confirmModal,

                        open: false

                    })
                }

                onConfirm={
                    async () => {

                        if (
                            confirmModal.onConfirm
                        ) {

                            await confirmModal.onConfirm()

                        }

                        setConfirmModal({

                            ...confirmModal,

                            open: false

                        })

                    }
                }

            />

            <ConfirmBottomSheet

                open={
                    confirmModal.open
                }

                title={
                    confirmModal.title
                }

                message={
                    confirmModal.message
                }

                confirmText={
                    confirmModal.confirmText
                }

                danger={
                    confirmModal.danger
                }

                onCancel={() =>

                    setConfirmModal({

                        ...confirmModal,

                        open: false

                    })

                }

                onConfirm={async () => {

                    if (
                        confirmModal.onConfirm
                    ) {

                        await confirmModal.onConfirm()

                    }

                    setConfirmModal({

                        ...confirmModal,

                        open: false

                    })

                }}

            />

            <SessionActionSheet
                open={
                    sessionActionSheet.open
                }

                session={
                    sessionActionSheet.session
                }

                onClose={() =>

                    setSessionActionSheet({

                        open: false,

                        session: null

                    })

                }

                onTogglePin={
                    handleTogglePin
                }

                onRename={(session) => {

                    openRenameModal(session)

                }}

                onDelete={
                    openDeleteSessionConfirmation
                }

            />

            <RenameSessionModal

                open={
                    renameModal.open
                }

                session={
                    renameModal.session
                }

                onClose={() =>

                    setRenameModal({

                        open: false,

                        session: null

                    })

                }

                onSave={(title) =>

                    handleRenameSession(

                        renameModal.session.session_id,

                        title

                    )

                }

            />

            <RenameSessionSheet

                open={
                    renameModal.open
                }

                session={
                    renameModal.session
                }

                onClose={() =>

                    setRenameModal({

                        open: false,

                        session: null

                    })

                }

                onSave={(title) =>

                    handleRenameSession(

                        renameModal.session.session_id,

                        title

                    )

                }

            />

            <SessionContextMenu

                open={
                    sessionContextMenu.open
                }

                session={
                    sessionContextMenu.session
                }

                rect={
                    sessionContextMenu.rect
                }

                onClose={() =>

                    setSessionContextMenu({

                        open: false,

                        session: null,

                        rect: null

                    })

                }

                onRename={(session) => {

                    setRenameModal({

                        open: true,

                        session

                    })

                }}

                onTogglePin={
                    handleTogglePin
                }

                onDelete={(session) => {

                    setConfirmModal({

                        open: true,

                        title: "Delete Session",

                        message: `Are you sure you want to delete "${session.title}"?\n\nThis action cannot be undone.`,

                        confirmText: "Delete",

                        danger: true,

                        onConfirm: async () => {

                            await handleDeleteSession(
                                session.session_id
                            )

                        }

                    })

                }}

            />

        </div>
    )
}