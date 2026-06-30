import {
    Download,
    FileText,
    FileCode,
    File
}
from "lucide-react"

export default function ExportMenu({

    onExport

}) {

    return (

        <div
            className="
                absolute
                right-0
                top-12

                w-56

                rounded-2xl

                bg-slate-900

                border
                border-slate-800

                shadow-2xl

                overflow-hidden

                animate-in
                fade-in
                zoom-in-95

                duration-150

                z-50
            "
        >

            <div
                className="
                    px-4
                    py-3

                    border-b
                    border-slate-800

                    text-sm
                    text-slate-400
                "
            >

                Export Chat

            </div>

            <button

                onClick={onExport}

                className="
                    w-full
                    dark:text-white
                    flex
                    items-center
                    justify-between

                    px-4
                    py-3

                    hover:bg-slate-800

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

                    <FileText
                        size={16}
                    />

                    <span>

                        TXT

                    </span>

                </div>

                <span
                    className="
                        text-xs

                        text-green-400
                    "
                >

                    Ready

                </span>

            </button>

            <div
                className="
                    flex
                    items-center
                    justify-between

                    px-4
                    py-3

                    opacity-50

                    cursor-not-allowed
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <FileCode
                        size={16}
                    />

                    Markdown

                </div>

                <span
                    className="
                        text-xs
                    "
                >

                    Soon

                </span>

            </div>

            <div
                className="
                    flex
                    items-center
                    justify-between

                    px-4
                    py-3

                    opacity-50

                    cursor-not-allowed
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <File
                        size={16}
                    />

                    PDF

                </div>

                <span
                    className="
                        text-xs
                    "
                >

                    Soon

                </span>

            </div>

        </div>

    )

}