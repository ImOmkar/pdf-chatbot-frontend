import {
    Menu,
    MessageCircle,
    MessageSquare,
    Upload,
    FileText
} from "lucide-react"

import ActionCard
from "./ActionCard"

export default function WelcomeScreen({ 
    
    onStartChat, 
    setSidebarOpen 

}) {

    return (
        <>
            <div
                className="
                    lg:hidden

                    flex
                    items-center
                    gap-3

                    px-2
                    py-2

                    border-b
                    border-slate-800
                "
            >

                <button

                    onClick={() =>

                        setSidebarOpen(
                            true
                        )

                    }

                    className="
                        p-2

                        dark:text-white

                        rounded-lg

                        hover:bg-slate-800

                        transition
                    "
                >

                    <Menu
                        size={22}
                    />

                </button>

                <h2
                    className="
                        text-white
                        font-semibold
                    "
                >

                    PDF ChatBot

                </h2>

            </div>

            <div
                className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    px-6
                ">

                <div
                    className="
                        max-w-4xl
                        w-full
                        text-center
                    ">

                    <div
                        className="
                            mb-8

                            max-w-2xl

                            mx-auto
                        "
                    >

                        <div
                            className="
                                inline-flex

                                items-center
                                gap-2

                                rounded-full

                                bg-blue-500/10

                                border
                                border-blue-500/20

                                px-4
                                py-2

                                text-sm

                                text-blue-300

                                mb-5
                            "
                        >

                            ⚡ AI Powered Document Assistant

                        </div>

                        <h1
                            className="
                                text-4xl

                                md:text-6xl

                                font-bold

                                tracking-tight

                                text-white
                            "
                        >

                            Chat with your PDFs

                        </h1>

                        <p
                            className="
                                mt-4

                                text-slate-400

                                text-lg

                                leading-relaxed
                            "
                        >

                            Upload documents, ask questions,
                            explore summaries and get answers
                            with cited sources.

                        </p>

                    </div>

                    <div
                        className="
                            flex
                            flex-wrap
                            justify-center
                            gap-3

                            mb-8
                        "
                    >

                        <div
                            className="
                                px-4
                                py-2

                                rounded-full

                                bg-slate-900

                                border
                                border-slate-800

                                text-sm

                                text-slate-300
                            "
                        >

                            📄 Unlimited PDFs

                        </div>

                        <div
                            className="
                                px-4
                                py-2

                                rounded-full

                                bg-slate-900

                                border
                                border-slate-800

                                text-sm

                                text-slate-300
                            "
                        >

                            ⚡ AI Powered

                        </div>

                        <div
                            className="
                                px-4
                                py-2

                                rounded-full

                                bg-slate-900

                                border
                                border-slate-800

                                text-sm

                                text-slate-300
                            "
                        >

                            🔍 Source Citations

                        </div>

                        <div
                            className="
                                px-4
                                py-2

                                rounded-full

                                bg-slate-900

                                border
                                border-slate-800

                                text-sm

                                text-slate-300
                            "
                        >

                            💬 Streaming Chat

                        </div>

                    </div>

                    <div
                        className="
                            max-w-2xl
                            mx-auto

                            space-y-4
                        "
                    >

                        <ActionCard

                            title="Start New Chat"

                            description="Create a new conversation"

                            icon={

                                <MessageSquare
                                    size={22}
                                    className="
                                        text-blue-400
                                    "
                                />

                            }

                            accent="
                                bg-blue-500/10
                            "

                            onClick={
                                onStartChat
                            }

                        />

                        <ActionCard

                            title="Upload PDF"

                            description="Import a document"

                            icon={

                                <Upload
                                    size={22}
                                    className="
                                        text-emerald-400
                                    "
                                />

                            }

                            accent="
                                bg-emerald-500/10
                            "

                        />

                        <ActionCard

                            title="Browse Documents"

                            description="Use uploaded PDFs"

                            icon={

                                <FileText
                                    size={22}
                                    className="
                                        text-violet-400
                                    "
                                />

                            }

                            accent="
                                bg-violet-500/10
                            "

                        />

                    </div>

                </div>

            </div>
        </>

    )
}