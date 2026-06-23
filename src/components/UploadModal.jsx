import { useState } from "react"

export default function UploadModal({
    onUpload
}) {

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
                type="file"
                accept=".pdf"

                onChange={
                    (e) =>
                    setFile(
                        e.target.files[0]
                    )
                }

                className="
                    text-slate-300
                    text-sm
                "
            />

            <button

                onClick={
                    () =>
                    onUpload(file)
                }

                disabled={!file}

                className="
                    mt-3
                    w-full
                    bg-green-600
                    hover:bg-green-700
                    disabled:bg-slate-700
                    text-white
                    rounded-lg
                    py-2
                "
            >
                Upload PDF
            </button>

            

        </div>

    )
}