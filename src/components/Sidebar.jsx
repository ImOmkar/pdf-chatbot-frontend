
import {
    getSessionMessages,
    createSession,
    deleteSession
}
from "../services/api"

import UploadModal
from "../components/UploadModal"
import {
    Trash2
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

    activeDocument,
    setActiveDocument
}) {

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

                                <div
                                    key={index}
                                    onClick={
                                        () =>
                                        setActiveDocument(
                                            document
                                        )
                                    }

                                    className={`
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
                                    `}
                                >
                                    <span>
                                        📄
                                    </span>

                                    <span
                                        className="
                                            truncate
                                        "
                                    >
                                        {
                                            document
                                                .split(/[/\\]/)
                                                .pop()
                                        }
                                    </span>
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
                                `}
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <span     
                                        className="
                                            text-sm
                                            truncate
                                            max-w-[180px]
                                        ">
                                        {session.title}
                                    </span>

                                    <Trash2

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
                                    />

                                </div>

                            </div>

                        )
                    )
                }

            </div>

        </div>
    )
}