import {
    useEffect,
    useRef
}
from "react"
import Message from "./Message"
import {
    FileText,
    X
}
from "lucide-react"

export default function ChatWindow({
    messages,
    loading,
    activeDocument,
    selectedSession,
    setActiveDocument,
    documentInfo
}) {

    console.log(documentInfo)

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


    return (

        <div
            className="
                flex-1
                overflow-y-auto
            "
        >
            <div
                className="
                    border-b
                    border-slate-800
                    p-4
                    mb-4
                ">

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
                    w-full
                    px-6
                ">

                {/* {
                    activeDocument && (

                        <div
                            className="
                                mb-6

                                bg-slate-900
                                border
                                border-blue-500/30

                                rounded-2xl

                                px-5
                                py-4

                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-4
                                "
                            >

                                <div
                                    className="
                                        h-10
                                        w-10

                                        rounded-xl

                                        bg-blue-600/20

                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <FileText
                                        size={20}
                                        className="
                                            text-blue-400
                                        "
                                    />

                                </div>

                                <div>

                                    <p
                                        className="
                                            text-xs
                                            uppercase
                                            tracking-wider
                                            text-slate-500
                                        "
                                    >
                                        Document Mode
                                    </p>

                                    <p
                                        className="
                                            text-white
                                            font-medium
                                        "
                                    >
                                        {
                                            activeDocument
                                                ?.split(/[/\\]/)
                                                .pop()
                                        }
                                    </p>

                                </div>

                            </div>

                            <button

                                onClick={
                                    () =>
                                    setActiveDocument(
                                        null
                                    )
                                }

                                className="
                                    text-slate-400
                                    hover:text-white

                                    transition-colors
                                "
                            >

                                <X size={18} />

                            </button>

                        </div>

                    )
                } */}

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

                        </div>

                    )
                }

                {
                    messages.map(
                        (
                            message,
                            index
                        ) => (

                            <Message
                                key={index}
                                role={
                                    message.role === "human"
                                        ? "user"
                                        : "assistant"
                                }

                                content={
                                    message.content
                                }

                                sources={
                                    message.sources || []
                                }
                            />

                        )
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