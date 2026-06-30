import {
    X,
    FileText
}
from "lucide-react"


export default function SourceViewerModal({

    open,

    source,

    onClose

}) {

    if (

        !open ||

        !source

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

            z-50">

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

                                {source.document}

                            </h2>

                            <p
                                className="
                                    text-sm
                                    text-slate-400
                                "
                            >

                                Page {source.page}

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="
                            p-2

                            rounded-lg

                            hover:bg-slate-800

                            transition-all
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

                        space-y-5
                    "
                >

                    {

                        source.chunks.map(

                            (

                                chunk,

                                index

                            ) => (

                                <div

                                    key={index}

                                    className="
                                        bg-slate-950

                                        border
                                        border-slate-800

                                        rounded-xl

                                        p-5
                                    "
                                >

                                    <div
                                        className="
                                            text-xs

                                            text-blue-400

                                            mb-3
                                        "
                                    >

                                        Chunk {index + 1}

                                    </div>

                                    <pre
                                        className="
                                            whitespace-pre-wrap

                                            text-sm

                                            text-slate-300

                                            font-sans
                                        "
                                    >

                                        {chunk}

                                    </pre>

                                </div>

                            )

                        )

                    }

                </div>

            </div>

        </div>

    )

}