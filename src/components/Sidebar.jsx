import {
    useState,
    useRef,
    useEffect
}
from "react"

import {
    getSessionMessages,
    createSession,
    deleteSession,
    deleteDocument,
    renameSession
}
from "../services/api"

import UploadModal
from "../components/UploadModal"

import ConfirmModal
from "./ConfirmModal"

import SessionItem
from "./SessionItem"

import DocumentItem 
from "./DocumentItem"

import toast
from "react-hot-toast"

export default function Sidebar({
    sessions,

    selectedSession,
    setSelectedSession,
    setMessages,

    loadSessions,

    onUpload,
    documents,

    documentInfo,
    setDocumentInfo,
    loadDocumentInfo,

    activeDocument,
    setActiveDocument,

    loadDocuments
    
}) {

    const [
        editingSession,
        setEditingSession
    ] = useState(null)

    const [
        editedTitle,
        setEditedTitle
    ] = useState("")

    const [
        openMenu,
        setOpenMenu
    ] = useState(null)

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

    const sidebarRef = useRef(null)

    const getFileName =
        (path) =>
            path
                .split(/[/\\]/)
                .pop()

    const handleNewChat =
        async () => {

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

    const loadMessages =
        async (session) => {

            try {

                const response =
                    await getSessionMessages(
                        session.session_id
                    )

                setSelectedSession(
                    session
                )

                setMessages(
                    response.data.messages
                )

            }
            catch(error) {

                console.log(error)

            }
        }

    const handleDelete =
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
                    "Couldn't rename session."
                )

            }

        }

    const handleRename =
        async (
            sessionId
        ) => {

            try {

                await renameSession(
                    sessionId,
                    editedTitle
                )

                setEditingSession(
                    null
                )

                await loadSessions()

                toast.success(
                    `Renamed to "${editedTitle}".`
                )

            }
            catch(error) {

                console.log(error)

            }

        }

    const handleDeleteDocument =
        async (
            document
        ) => {

            try {

                await deleteDocument(
                    document
                )

                await loadDocuments()

                toast.success(
                    `${getFileName(document)} deleted.`
                )

                if (
                    activeDocument === document
                ) {

                    setActiveDocument(
                        null
                    )

                }

            }
            catch(error) {

                console.log(error)

            }

        }

    useEffect(
        () => {

            const handleClickOutside =
                (event) => {

                    if (
                        sidebarRef.current &&
                        !sidebarRef.current.contains(
                            event.target
                        )
                    ) {

                        setOpenMenu(
                            null
                        )

                    }

                }

            document.addEventListener(
                "mousedown",
                handleClickOutside
            )

            return () => {

                document.removeEventListener(
                    "mousedown",
                    handleClickOutside
                )

            }

        },
        []
    )

    return (

        <div
            ref={sidebarRef}
            className="
                w-80
                bg-slate-950
                border-r
                border-slate-800
                flex
                flex-col
                shadow-2xl
            "
        >

            <div
                className="
                px-6
                py-5
                border-b
                border-slate-800
            ">

                <h1
                    className="
                        text-2xl
                        font-bold
                        text-white
                        tracking-tight
                    "
                >
                    PDF ChatBot
                </h1>


                <p
                    className="
                        text-slate-400
                        text-sm
                        mt-1
                    "
                >
                    AI Document Assistant
                </p>

            </div>

            <div className="p-4">

                <button
                    onClick={handleNewChat}
                    className="
                        w-full
                        bg-gradient-to-r
                      from-blue-600
                      to-blue-500
                      hover:from-blue-500
                      hover:to-blue-400
                        text-white
                        rounded-xl
                        py-3
                        font-medium
                        transition-all
                    "
                >
                    + New Chat
                </button>

                <UploadModal
                    onUpload={onUpload}
                />

                <div
                    className="
                        mt-4
                        px-4
                    "
                >

                    <h3
                        className="
                            text-[11px]
                            uppercase
                            tracking-[0.2em]
                            text-slate-500
                            mb-3
                        "
                    >
                        Documents
                    </h3>

                    {

                        documents.map(
                            (
                                document
                            ) => (

                                <DocumentItem

                                    key={
                                        document
                                    }

                                    document={
                                        document
                                    }

                                    documentInfo={
                                        documentInfo
                                    }

                                    activeDocument={
                                        activeDocument
                                    }

                                    setActiveDocument={
                                        setActiveDocument
                                    }

                                    loadDocumentInfo={
                                        loadDocumentInfo
                                    }

                                    setConfirmModal={
                                        setConfirmModal
                                    }

                                    handleDeleteDocument={
                                        handleDeleteDocument
                                    }

                                    getFileName={
                                        getFileName
                                    }

                                />

                            )
                        )
                    }

                    {activeDocument && (
                        <button
                            onClick={() =>
                                setActiveDocument(null)
                            }

                            className="
                                
                                mt-3
                                text-sm
                                text-slate-400
                                hover:text-white
                                transition-colors
                            "
                        >
                            Clear Document Filter
                        </button>
                    )}
                </div>

            </div>

            <div
                className="
                    flex-1
                    overflow-y-auto
                    px-4
                ">

                <h3
                    className="
                        text-[11px]
                        uppercase
                        tracking-[0.2em]
                        text-slate-500
                        mb-3
                    "
                >
                    Conversations
                </h3>

                {
                    sessions.map(
                        (session) => (

                            <SessionItem

                                key={
                                    session.session_id
                                }

                                session={
                                    session
                                }

                                selectedSession={
                                    selectedSession
                                }

                                loadMessages={
                                    loadMessages
                                }

                                editingSession={
                                    editingSession
                                }

                                editedTitle={
                                    editedTitle
                                }

                                setEditedTitle={
                                    setEditedTitle
                                }

                                setEditingSession={
                                    setEditingSession
                                }

                                handleRename={
                                    handleRename
                                }

                                handleDelete={
                                    handleDelete
                                }

                                openMenu={
                                    openMenu
                                }

                                setOpenMenu={
                                    setOpenMenu
                                }

                                setConfirmModal={
                                    setConfirmModal
                                }

                            />

                        )
                    )
                }

            </div>


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

        </div>
    )
}