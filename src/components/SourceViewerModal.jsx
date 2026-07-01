import {
    X,
    FileText,
    Check,
    Copy
}
from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

export default function SourceViewerModal({

    open,

    source,

    onClose

}) {

    const [
        copiedIndex,
        setCopiedIndex
    ] = useState(
        null
    )

    const [
        search,
        setSearch
    ] = useState("")

    if (

        !open ||

        !source

    ) {

        return null

    }

    const copyChunk =
    async (
        chunk,
        index
    ) => {

        await navigator.clipboard.writeText(
            chunk
        )

        setCopiedIndex(
            index
        )

        toast.success(
            "Chunk copied."
        )

        setTimeout(
            () =>

                setCopiedIndex(
                    null
                ),

            2000
        )

    }

    const filteredChunks =

    source.chunks.filter(

        chunk =>

            chunk

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

    )

const highlightText =
    (
        text
    ) => {

        if (
            !search.trim()
        ) {

            return text

        }

        const regex =
            new RegExp(

                `(${search})`,

                "gi"

            )

        return text

            .split(regex)

            .map(

                (
                    part,
                    index
                ) => (

                    part.toLowerCase() ===
                    search.toLowerCase()

                    ? (

                        <mark
                            key={index}
                            className="
                                bg-yellow-400
                                text-black
                                rounded
                                px-1
                            "
                        >

                            {part}

                        </mark>

                    )

                    : (

                        <span
                            key={index}
                        >

                            {part}

                        </span>

                    )

                )

            )

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
                                ">

                                Page {source.page}

                                {" • "}

                                {source.chunks.length}

                                {" Chunks"}

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="
                            p-2
                            dark:text-white
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

                    <div
                        className="
                            mb-5
                        "
                    >

                        <input

                            value={search}

                            onChange={
                                e =>
                                    setSearch(
                                        e.target.value
                                    )
                            }

                            placeholder="Search this page..."

                            className="
                                w-full

                                rounded-xl

                                bg-slate-950

                                border
                                border-slate-800

                                px-4
                                py-3

                                text-white

                                placeholder:text-slate-500

                                outline-none

                                focus:border-blue-500
                            "
                        />

                    </div>

                    {/* {

                        filteredChunks.map(

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
                                            flex
                                            items-center
                                            justify-between

                                            mb-3
                                        ">

                                        <div
                                            className="
                                                text-xs
                                                text-blue-400
                                            "
                                        >

                                            Chunk {index + 1}

                                        </div>

                                        <button

                                            onClick={() =>
                                                copyChunk(
                                                    chunk,
                                                    index
                                                )
                                            }

                                            className="
                                                text-slate-400

                                                hover:text-white

                                                transition-colors
                                            "
                                        >

                                            {
                                                copiedIndex === index

                                                ? <Check
                                                    size={16}
                                                    className="
                                                        text-green-400
                                                    "
                                                />

                                                : <Copy
                                                    size={16}
                                                />
                                            }

                                        </button>

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

                    } */}

                    {
                        filteredChunks.length > 0

                        ? (

                            filteredChunks.map(

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
                                                flex
                                                items-center
                                                justify-between

                                                mb-3
                                            "
                                        >

                                            <div
                                                className="
                                                    text-xs
                                                    text-blue-400
                                                "
                                            >

                                                Chunk {index + 1}

                                            </div>

                                            <button

                                                onClick={() =>
                                                    copyChunk(
                                                        chunk,
                                                        index
                                                    )
                                                }

                                                className="
                                                    text-slate-400

                                                    hover:text-white

                                                    transition-colors
                                                "
                                            >

                                                {
                                                    copiedIndex === index

                                                    ? <Check
                                                        size={16}
                                                        className="
                                                            text-green-400
                                                        "
                                                    />

                                                    : <Copy
                                                        size={16}
                                                    />
                                                }

                                            </button>

                                        </div>

                                        <pre
                                            className="
                                                whitespace-pre-wrap

                                                text-sm

                                                text-slate-300

                                                font-sans
                                            "
                                        >

                                            {highlightText(chunk)}

                                        </pre>

                                    </div>

                                )

                            )

                        )

                        : (

                            <div
                                className="
                                    py-12

                                    text-center
                                "
                            >

                                <div
                                    className="
                                        text-4xl

                                        mb-4
                                    "
                                >

                                    🔍

                                </div>

                                <div
                                    className="
                                        text-slate-400
                                    "
                                >

                                    No matching chunks found.

                                </div>

                                <div
                                    className="
                                        text-sm
                                        text-slate-500

                                        mt-2
                                    "
                                >

                                    Try another keyword.

                                </div>

                            </div>

                        )
                    }

                </div>

            </div>

        </div>

    )

}