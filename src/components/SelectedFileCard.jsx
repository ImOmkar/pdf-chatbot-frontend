import {
    FileText,
    X
}
from "lucide-react"

export default function SelectedFileCard({

    file,

    onRemove,

    uploading = false,

    disabled = false

}) {

    if (!file) {

        return null

    }


    const formatFileSize = (bytes) => {

        if (bytes < 1024) {

            return `${bytes} B`

        }

        if (bytes < 1024 * 1024) {

            return `${(bytes / 1024).toFixed(1)} KB`

        }

        if (bytes < 1024 * 1024 * 1024) {

            return `${(bytes / (1024 * 1024)).toFixed(2)} MB`

        }

        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`

    }

    return (

        <div
            className="
                mt-4

                rounded-2xl

                border
                border-slate-700

                bg-slate-900

                p-4
            "
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3

                        min-w-0
                    "
                >

                    <div
                        className="
                            h-10
                            w-10

                            rounded-xl

                            bg-red-500/10

                            flex
                            items-center
                            justify-center

                            shrink-0
                        "
                    >

                        <FileText
                            size={20}
                            className="
                                text-red-400
                            "
                        />

                    </div>

                    <div
                        className="
                            min-w-0
                        "
                    >

                        <p
                            className="
                                text-white
                                font-medium

                                truncate
                            "
                        >

                            {file.name}

                        </p>

                        <p
                            className="
                                text-left
                                text-sm
                                text-slate-400
                            ">

                            {formatFileSize(file.size)}

                        </p>

                        {

                            uploading && (

                                <p
                                    className="
                                        mt-1
                                        text-left
                                        text-xs

                                        text-blue-400
                                    "
                                >

                                    Uploading...
                                    Please wait.

                                </p>

                            )

                        }

                    </div>

                </div>

                <button

                    onClick={onRemove}

                    disabled={disabled}

                    className={`
                        p-2

                        rounded-lg

                        transition

                        ${
                            disabled

                                ? `
                                    cursor-not-allowed
                                    opacity-40
                                `

                                : `
                                    text-slate-400

                                    hover:bg-slate-800

                                    hover:text-red-400
                                `
                        }
                    `}>

                    <X size={18} />

                </button>

            </div>

        </div>

    )

}