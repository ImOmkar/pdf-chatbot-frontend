import {
    MessageSquare,
    Upload,
    FileText
} from "lucide-react"

export default function WelcomeScreen() {

    return (

        <div
            className="
                flex-1
                flex
                items-center
                justify-center
                px-6
            "
        >

            <div
                className="
                    max-w-4xl
                    w-full
                    text-center
                "
            >

                <div
                    className="
                        mb-10
                    "
                >

                    <h1
                        className="
                            text-5xl
                            font-bold
                            text-white
                            mb-4
                        "
                    >
                        PDF ChatBot
                    </h1>

                    <p
                        className="
                            text-slate-400
                            text-lg
                        "
                    >
                        Upload PDFs and chat
                        with your documents
                        using AI.
                    </p>

                </div>

                <div
                    className="
                        grid
                        md:grid-cols-3
                        gap-5
                    "
                >

                    <div
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            p-6
                            hover:border-blue-500
                            transition
                            cursor-pointer
                        "
                    >

                        <MessageSquare
                            size={32}
                            className="
                                mx-auto
                                mb-4
                                text-blue-400
                            "
                        />

                        <h3
                            className="
                                text-white
                                font-semibold
                                mb-2
                            "
                        >
                            Start Chat
                        </h3>

                        <p
                            className="
                                text-slate-400
                                text-sm
                            "
                        >
                            Create a new
                            conversation and
                            ask questions.
                        </p>

                    </div>

                    <div
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            p-6
                            hover:border-green-500
                            transition
                            cursor-pointer
                        "
                    >

                        <Upload
                            size={32}
                            className="
                                mx-auto
                                mb-4
                                text-green-400
                            "
                        />

                        <h3
                            className="
                                text-white
                                font-semibold
                                mb-2
                            "
                        >
                            Upload PDF
                        </h3>

                        <p
                            className="
                                text-slate-400
                                text-sm
                            "
                        >
                            Upload company
                            policies, reports,
                            invoices and more.
                        </p>

                    </div>

                    <div
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            p-6
                            hover:border-purple-500
                            transition
                            cursor-pointer
                        "
                    >

                        <FileText
                            size={32}
                            className="
                                mx-auto
                                mb-4
                                text-purple-400
                            "
                        />

                        <h3
                            className="
                                text-white
                                font-semibold
                                mb-2
                            "
                        >
                            Documents
                        </h3>

                        <p
                            className="
                                text-slate-400
                                text-sm
                            "
                        >
                            Browse uploaded
                            documents and
                            chat with them.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    )
}