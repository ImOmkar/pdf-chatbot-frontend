import {
    useRef,
    useState
}
from "react"

import {
    X
}
from "lucide-react"

export default function UploadModal({
    onUpload
}) {

    const [
        uploading,
        setUploading
    ] = useState(
        false
    )

    const fileInputRef =
    useRef(null)

    const [file, setFile] =
        useState(null)

    return (

        <div
            className="
                p-4
                border-b
                border-slate-800
            "
        >

            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"   

                onChange={
                    (e) =>
                    setFile(
                        e.target.files[0]
                    )
                }

                className="
                    hidden
                "
            />

            <button

                onClick={() =>
                    fileInputRef.current?.click()
                }
                disabled={
                    uploading
                }
                className="
                    w-full

                    border-2
                    border-dashed
                    border-slate-700

                    rounded-xl
                    dark:text-white
                    p-4

                    hover:border-blue-500

                    transition
                "
            >

                📄 Select PDF

            </button>

            {
                file && (

                    <div
                        className="
                            mt-3

                            flex
                            items-center
                            justify-between

                            bg-slate-900

                            border
                            border-slate-700

                            rounded-xl

                            px-3
                            py-2
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-2

                                min-w-0
                                flex-1
                            "
                        >

                            <span>
                                📄
                            </span>

                            <span
                                className="
                                    text-sm
                                    text-white

                                    truncate
                                "
                                title={file.name}
                            >

                                {file.name}

                            </span>

                        </div>

                        <button

                            onClick={() => {

                                setFile(
                                    null
                                )

                                if (
                                    fileInputRef.current
                                ) {

                                    fileInputRef.current.value = ""

                                }

                            }}

                            className="
                                ml-2

                                p-1

                                rounded-lg

                                hover:bg-slate-800

                                text-slate-400

                                hover:text-white

                                transition
                            "
                        >

                            <X
                                size={16}
                            />

                        </button>

                    </div>

                )
            }

            <button

                onClick={async () => {

                    try {

                        setUploading(
                            true
                        )

                        await onUpload(
                            file
                        )

                        setFile(
                            null
                        )

                        if (
                            fileInputRef.current
                        ) {

                            fileInputRef.current.value = ""

                        }

                    }

                    finally {

                        setUploading(
                            false
                        )

                    }

                }}

                disabled={
                    !file ||
                    uploading
                }

                className={`
                    mt-4

                    w-full

                    flex
                    items-center
                    justify-center
                    gap-2

                    rounded-xl

                    disabled:bg-slate-700
                    disabled:cursor-not-allowed

                    py-3

                    text-white

                    font-medium

                    transition-all

                    ${
                        !file || uploading
                            ? "opacity-80"
                            : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
                    }
                `}
            >
                {
                    uploading && (

                        <div
                            className="
                                h-4
                                w-4

                                border-2

                                border-white

                                border-t-transparent

                                rounded-full

                                animate-spin

                                shrink-0
                            "
                        />

                    )
                }

                <span>

                    {
                        uploading

                        ? "Uploading..."

                        : "Upload PDF"
                    }

                </span>
            </button>

        </div>

    )
}