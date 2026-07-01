import {
    useEffect,
    useRef,
    useState
}
from "react"
import Message from "./Message"
import {
    FileText,
    X,
    Download,
    Menu
}
from "lucide-react"

import ExportMenu
from "./ExportMenu"

export default function ChatWindow({
    messages,
    loading,
    activeDocument,
    selectedSession,
    setActiveDocument,
    documentInfo,

    onRegenerate,
    onSuggestionClick,
    onExport,
    onViewSource,
    onSummarizeDocument,

    sidebarOpen,

    setSidebarOpen,
}) {

    const [
        showExportMenu,
        setShowExportMenu
    ] = useState(false)

    const exportMenuRef =
        useRef(null)

    const bottomRef = useRef(null)

    useEffect(
        () => {

            bottomRef.current?.scrollIntoView(
                {
                    behavior: "smooth"
                }
            )

        },
        [messages, loading]
    )

    useEffect(
        () => {

            const handler =
                (event) => {

                    if (

                        exportMenuRef.current &&

                        !exportMenuRef.current.contains(
                            event.target
                        )

                    ) {

                        setShowExportMenu(
                            false
                        )

                    }

                }

            document.addEventListener(
                "mousedown",
                handler
            )

            return () =>

                document.removeEventListener(
                    "mousedown",
                    handler
                )

        },

        []

    )


    return (

        <div
            className="
                flex-1
                overflow-y-auto
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-800
                    p-4
                    mb-4
                ">

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <button

                        onClick={() =>

                            setSidebarOpen(
                                true
                            )

                        }

                        className="
                            lg:hidden

                            p-2

                            rounded-lg
                            dark:text-white
                            hover:bg-slate-800

                            transition
                        "
                    >

                        <Menu size={22} />

                    </button>

                    <h2
                        className="
                            text-white
                            font-semibold
                        "
                    >

                        {
                            selectedSession?.title
                            || "New Chat"
                        }

                    </h2>

                </div>

                <div
                    className="
                        relative
                    "

                    ref={exportMenuRef}
                >

                    <button

                        onClick={
                            () =>

                                setShowExportMenu(
                                    prev => !prev
                                )
                        }

                        className="
                            h-9
                            w-9

                            rounded-lg

                            flex
                            items-center
                            justify-center

                            text-slate-400

                            hover:text-white

                            hover:bg-slate-800

                            transition-all
                        "
                    >

                        <Download
                            size={18}
                        />

                    </button>

                    {
                        showExportMenu && (

                            <ExportMenu

                                onExport={
                                    () => {

                                        setShowExportMenu(
                                            false
                                        )

                                        onExport()

                                    }
                                }

                            />

                        )
                    }

                </div>

            </div>

            <div

                className="
                    w-full
                    px-3
                    sm:px-6
                ">

                {
                    activeDocument &&
                    documentInfo && (

                        <div
                            className="
                                mb-6

                                bg-slate-900
                                border
                                border-blue-500/20

                                rounded-2xl

                                p-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        h-12
                                        w-12

                                        rounded-xl

                                        bg-blue-600/20

                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    📄
                                </div>

                                <div>

                                    <h3
                                        className="
                                            text-white
                                            font-semibold
                                        "
                                    >
                                        {
                                            activeDocument
                                                .split(/[/\\]/)
                                                .pop()
                                        }
                                    </h3>

                                    <p
                                        className="
                                            text-slate-400
                                            text-sm
                                            mt-1
                                        "
                                    >
                                        Questions will only
                                        be answered from
                                        this document.
                                    </p>

                                </div>

                            </div>

                            <div
                                className="
                                    mt-4

                                    text-sm

                                    text-slate-400
                                "
                            >
                                {
                                    documentInfo.chunk_count
                                }
                                {" "}
                                chunks indexed
                                •
                                {" "}
                                {
                                    documentInfo.page_count
                                }
                                {" "}
                                pages
                            </div>

                            <button

                                onClick={onSummarizeDocument}

                                className="
                                    mt-5

                                    w-full

                                    bg-blue-600

                                    hover:bg-blue-500

                                    transition-colors

                                    rounded-xl

                                    py-3

                                    text-white

                                    font-medium
                                "
                            >

                                📝 Summarize Document

                            </button>

                        </div>

                    )
                }

                {
                    messages.map(
                        (
                            message,
                            index
                        ) => {

                            if (
                                message.role === "ai" &&
                                message.content === ""
                            ) {
                                return null
                            }

                            return (

                                <Message
                                    key={message.id ?? index}

                                    id={message.id}

                                    role={
                                        message.role === "human"
                                            ? "user"
                                            : "assistant"
                                    }

                                    content={message.content}

                                    sources={
                                        message.sources || []
                                    }

                                    onRegenerate={() =>
                                        onRegenerate(
                                            messages[index - 1].id,
                                            index
                                        )
                                    }

                                    completed={
                                        message.completed
                                    }

                                    suggestions={
                                        message.suggestions || []
                                    }

                                    onSuggestionClick={
                                        onSuggestionClick
                                    }

                                    onViewSource={
                                        onViewSource
                                    }
                                />

                            )

                        }
                    )
                }

                {
                    loading && (

                        <div
                            className="
                                flex
                                gap-2
                                p-4
                            "
                        >

                            <div
                                className="
                                    w-2
                                    h-2
                                    rounded-full
                                    bg-slate-400
                                    animate-bounce
                                "
                            />

                            <div
                                className="
                                    w-2
                                    h-2
                                    rounded-full
                                    bg-slate-400
                                    animate-bounce
                                    delay-100
                                "
                            />

                            <div
                                className="
                                    w-2
                                    h-2
                                    rounded-full
                                    bg-slate-400
                                    animate-bounce
                                    delay-200
                                "
                            />

                        </div>

                    )
                }

            </div>

            <div ref={bottomRef}></div>

        </div>
    )
}