import {
    X,
    FileText
}
from "lucide-react"

import ReactMarkdown
from "react-markdown"



export default function DocumentSummaryModal({

    open,

    summary,

    loading,

    document,

    onClose

}) {

    if (
        !open
    ) {

        return null

    }

    return (

        <div
            className="
                fixed
                inset-0

                bg-black/60

                backdrop-blur-sm

                flex
                items-center
                justify-center

                z-50
            "
        >

            <div
                className="
                    w-full
                    max-w-4xl

                    mx-6

                    bg-slate-900

                    border
                    border-slate-800

                    rounded-2xl

                    shadow-2xl

                    overflow-hidden
                "
            >

                {/* Header */}

                <div
                    className="
                        flex
                        items-center
                        justify-between

                        px-6
                        py-4

                        border-b
                        border-slate-800
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <FileText
                            size={20}
                            className="
                                text-blue-400
                            "
                        />

                        <div>

                            <h2
                                className="
                                    text-white
                                    font-semibold
                                "
                            >

                                Document Summary

                            </h2>

                            <p
                                className="
                                    text-sm
                                    text-slate-400
                                "
                            >

                                {document}

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="
                            p-2

                            rounded-lg
                            dark:text-white
                            hover:bg-slate-800
                        "
                    >

                        <X
                            size={18}
                        />

                    </button>

                </div>

                {/* Body */}

                <div
                    className="
                        max-h-[70vh]

                        overflow-y-auto

                        p-6
                    "
                >

                    {

                        loading

                        ?

                        (

                            <div
                                className="
                                    flex
                                    justify-center
                                    py-16
                                "
                            >

                                <div
                                    className="
                                        h-8
                                        w-8

                                        border-2

                                        border-blue-500

                                        border-t-transparent

                                        rounded-full

                                        animate-spin
                                    "
                                />

                            </div>

                        )

                        :

                        (

                            <article
                                className="
                                    prose
                                    prose-invert
                                    dark:text-white
                                    max-w-none
                                "
                            >

                                <ReactMarkdown>

                                    {summary}

                                </ReactMarkdown>

                            </article>

                        )

                    }

                </div>

            </div>

        </div>

    )

}