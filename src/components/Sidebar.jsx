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


import {
    Trash2,
    MoreHorizontal,
    Pencil,
    ChevronRight
}
from "lucide-react"

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

    const menuRef = useRef(null)

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
                        menuRef.current &&
                        !menuRef.current.contains(
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
                                document,
                                index
                            ) => (

                                <div  key={document} className="flex items-center justify-between gap-4">
                                    <div
                                        onClick={
                                            async () => {

                                                setActiveDocument(
                                                    document
                                                )

                                                await loadDocumentInfo(
                                                    document
                                                )

                                            }
                                        }

                                        className={`
                                            w-full
                                            flex
                                            items-center
                                            gap-3
                                            p-3
                                            rounded-xl
                                            transition-all
                                            cursor-pointer

                                            ${
                                                activeDocument === document
                                                ? "bg-blue-600 text-white"
                                                : "text-slate-300 hover:bg-slate-800"
                                            }
                                        `}>
                                        <span>
                                            📄
                                        </span>

                                        <span
                                            className="
                                                truncate
                                            "
                                        >
                                            {
                                                getFileName(document)
                                            }
                                        </span>
                                    </div>
                                
                                    <Trash2

                                        size={16}

                                        onClick={(e) => {

                                            e.stopPropagation()

                                            setConfirmModal({

                                                open: true,

                                                title: "Delete Document",

                                                message: `Delete "${getFileName(document)}"?`,

                                                confirmText: "Delete",

                                                danger: true,

                                                onConfirm: async () => {

                                                    await handleDeleteDocument(
                                                        document
                                                    )

                                                }

                                            })

                                        }}

                                        className="
                                            text-slate-500
                                            cursor-pointer
                                            hover:text-red-400
                                        "
                                    />
                                </div>

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

                            <div
                                key={
                                    session.session_id
                                }

                                onClick={
                                    () =>
                                    loadMessages(
                                        session
                                    )
                                }

                                className={`
                                    p-3
                                    rounded-xl
                                    cursor-pointer
                                    mb-2
                                    transition-all

                                    ${
                                        selectedSession?.session_id === session.session_id
                                            ? `
                                                bg-blue-600/20
                                                border
                                                border-blue-500/30
                                                text-white
                                            `
                                            : `
                                                hover:bg-slate-800
                                                text-slate-300
                                            `
                                    }
                                `}>
                                    
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    {
                                        editingSession ===
                                        session.session_id

                                        ? (

                                            <input

                                                autoFocus

                                                value={
                                                    editedTitle
                                                }

                                                onChange={
                                                    (e) =>
                                                    setEditedTitle(
                                                        e.target.value
                                                    )
                                                }

                                                onBlur={
                                                    () =>
                                                    handleRename(
                                                        session.session_id
                                                    )
                                                }

                                                onKeyDown={
                                                    (e) => {

                                                        if (
                                                            e.key === "Enter"
                                                        ) {

                                                            handleRename(
                                                                session.session_id
                                                            )

                                                        }

                                                    }
                                                }

                                                className="
                                                    bg-slate-800
                                                    text-white
                                                    px-2
                                                    py-1
                                                    rounded
                                                    w-full
                                                "
                                            />

                                        )

                                        : (

                                            <span
                                                onDoubleClick={
                                                    () => {

                                                        setEditingSession(
                                                            session.session_id
                                                        )

                                                        setEditedTitle(
                                                            session.title
                                                        )

                                                    }
                                                }

                                                className="
                                                    text-sm
                                                    truncate
                                                    max-w-[180px]
                                                "
                                            >
                                                {session.title}
                                            </span>

                                        )
                                    }

                                    {/* <Trash2

                                        size={16}

                                        onClick={
                                            (e) => {

                                                e.stopPropagation()

                                                handleDelete(
                                                    session.session_id
                                                )
                                            }
                                        }

                                        className="
                                            opacity-0
                                            group-hover:opacity-100
                                            text-slate-500
                                            hover:text-red-400
                                            transition-all
                                        "
                                    /> */}

                                    <div
                                        ref={menuRef}
                                        className="
                                            relative
                                        "
                                    >

                                        <MoreHorizontal

                                            size={18}

                                            onClick={
                                                (e) => {

                                                    e.stopPropagation()

                                                    setOpenMenu(

                                                        openMenu === session.session_id
                                                            ? null
                                                            : session.session_id

                                                    )

                                                }
                                            }

                                            className="
                                                cursor-pointer
                                                text-slate-500
                                                hover:text-white
                                            "
                                        />

                                        {
                                            openMenu === session.session_id && (

                                                <div
                                                    className="
                                                        absolute

                                                        right-0
                                                        top-8

                                                        w-48

                                                        bg-slate-900

                                                        border
                                                        border-slate-700

                                                        rounded-2xl

                                                        shadow-2xl

                                                        overflow-hidden

                                                        animate-in
                                                        fade-in
                                                        zoom-in-95

                                                        z-50
                                                    ">

                                                    <button

                                                        onClick={
                                                            (e) => {

                                                                e.stopPropagation()

                                                                setEditingSession(
                                                                    session.session_id
                                                                )

                                                                setEditedTitle(
                                                                    session.title
                                                                )

                                                                setOpenMenu(
                                                                    null
                                                                )

                                                            }
                                                        }

                                                        className="
                                                            w-full

                                                            flex
                                                            items-center
                                                            justify-between

                                                            px-4
                                                            py-3

                                                            text-sm

                                                            text-slate-300

                                                            hover:bg-slate-800
                                                            hover:text-white

                                                            transition-all
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                            "
                                                        >

                                                            <Pencil
                                                                size={16}
                                                            />

                                                            <span>
                                                                Rename
                                                            </span>

                                                        </div>

                                                        <ChevronRight
                                                            size={15}
                                                        />

                                                    </button>

                                                    <button

                                                        onClick={
                                                            (e) => {

                                                                e.stopPropagation()

                                                                setOpenMenu(
                                                                    null
                                                                )

                                                                setConfirmModal({

                                                                    open: true,

                                                                    title: "Delete Session",

                                                                    message: `Are you sure you want to delete "${session.title}"?\n\nThis action cannot be undone.`,

                                                                    confirmText: "Delete",

                                                                    danger: true,

                                                                    onConfirm: async () => {

                                                                        await handleDelete(
                                                                            session.session_id
                                                                        )

                                                                    }

                                                                })

                                                            }
                                                        }

                                                        className="
                                                            w-full

                                                            flex
                                                            items-center
                                                            justify-between

                                                            px-4
                                                            py-3

                                                            text-sm

                                                            text-red-400

                                                            hover:bg-red-500/10

                                                            transition-all
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                            "
                                                        >

                                                            <Trash2
                                                                size={16}
                                                            />

                                                            <span>
                                                                Delete
                                                            </span>

                                                        </div>

                                                        <ChevronRight
                                                            size={15}
                                                        />

                                                    </button>

                                                </div>

                                            )
                                        }

                                    </div>

                                </div>

                            </div>

                        )
                    )
                }

            </div>


            {/* confirm modal */}

            {/* <ConfirmModal

                open={
                    confirmDelete
                }

                title="Delete Session"

                message={`
                Are you sure you want to delete
                "${sessionToDelete?.title}"?

                This action cannot be undone.
                `}

                    confirmText="Delete"

                    danger={true}

                    onCancel={
                        () =>
                        setConfirmDelete(
                            false
                        )
                    }

                    onConfirm={
                        async () => {

                            await handleDelete(
                                sessionToDelete.session_id
                            )

                            setConfirmDelete(
                                false
                            )

                            setSessionToDelete(
                                null
                            )

                        }
                    }

            /> */}


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