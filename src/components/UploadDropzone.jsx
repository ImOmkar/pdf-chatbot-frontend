import {
    Upload,
    FileUp,
    ChevronRight
}
from "lucide-react"

import {
    useRef,
    useState
}
from "react"

import SelectedFileCard
from "./SelectedFileCard.jsx"

export default function UploadDropZone({

    onUpload

}) {

    const [
        selectedFile,
        setSelectedFile
    ] = useState(null)

    const [
        uploading,
        setUploading
    ] = useState(false)

    const handleFileSelect = (
        file
    ) => {

        if (
            !file
        ) {

            return

        }

        if (
            file.type !==
            "application/pdf"
        ) {

            return

        }

        setSelectedFile(
            file
        )

    }

    const [

        isDragging,

        setIsDragging

    ] = useState(false)

    const fileInputRef =
    useRef(null)

    console.log("UploadDropZone rendered")

    return (

        <>
            {/* desktop */}
            <div
                className="
                    hidden
                    lg:block
                ">

                <div

                    onClick={() => {

                        console.log(
                            "Dropzone clicked"
                        )

                        console.log(
                            fileInputRef.current
                        )

                        fileInputRef.current?.click()

                    }}

                    onDragOver={(e) => {

                        e.preventDefault()

                        if (!isDragging) {

                            setIsDragging(true)

                        }

                    }}

                    onDragLeave={(e) => {

                        e.preventDefault()

                        setIsDragging(false)

                    }}

                    onDrop={async (e) => {

                        e.preventDefault()

                        setIsDragging(false)

                        const file =
                            e.dataTransfer.files?.[0]

                        if (!file) {

                            return

                        }

                        if (

                            file.type !==
                            "application/pdf"

                        ) {

                            return

                        }

                        handleFileSelect(
                            file
                        )

                    }}

                    className={`
                        w-full

                        rounded-3xl

                        border-2
                        border-dashed

                        p-10

                        text-center

                        cursor-pointer

                        transition-all
                        duration-200

                        {

                            isDragging

                                ? (

                                    <FileUp

                                        size={34}

                                        className="
                                            text-blue-400
                                        "

                                    />

                                )

                                : (

                                    <Upload

                                        size={32}

                                        className="
                                            text-blue-400
                                        "

                                    />

                                )

                        }
                    `}>

                    <div
                        className="
                            mx-auto

                            mb-5

                            flex
                            h-16
                            w-16

                            items-center
                            justify-center

                            rounded-2xl

                            bg-blue-500/10
                        "
                    >

                        <Upload

                            size={32}

                            className="
                                text-blue-400
                            "

                        />

                    </div>

                    <h3
                        className="
                            text-xl
                            font-semibold
                            text-white
                        "
                    >

                        {

                            isDragging

                                ? "Release to Upload"

                                : "Drag & Drop PDF"

                        }

                    </h3>

                    <p
                        className="
                            mt-2
                            text-slate-400
                        "
                    >

                        {

                            isDragging

                                ? "Your PDF will be uploaded automatically."

                                : "Drop your PDF here or click to browse."

                        }

                    </p>

                    <input

                        ref={fileInputRef}

                        type="file"

                        accept=".pdf"

                        className="hidden"

                        onChange={async (e) => {

                            const file =
                                e.target.files?.[0]

                            if (
                                !file
                            ) {

                                return

                            }

                            handleFileSelect(
                                file
                            )

                            e.target.value = ""

                        }}

                    />


                    {/* {
                        selectedFile && (

                            <div
                                className="
                                    mt-6

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
                                            min-w-0
                                        "
                                    >

                                        <p
                                            className="
                                                truncate

                                                font-medium

                                                text-white
                                            "
                                        >

                                            📄 {selectedFile.name}

                                        </p>

                                        <p
                                            className="
                                                text-sm

                                                text-slate-400
                                            "
                                        >

                                            {
                                                (
                                                    selectedFile.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)
                                            } MB

                                        </p>

                                    </div>

                                    <button

                                        onClick={(e) => {

                                            e.stopPropagation()

                                            setSelectedFile(
                                                null
                                            )

                                        }}

                                        className="
                                            text-red-400

                                            hover:text-red-300
                                        "
                                    >

                                        ✕

                                    </button>

                                </div>

                            </div>

                        )
                    } */}



                </div>

            </div>
            
            {/* Mobile */}

            <div
                className="lg:hidden">

                <div

                    onClick={() =>

                        fileInputRef.current?.click()

                    }

                    className="
                        group

                        w-full

                        flex
                        items-center
                        justify-between

                        bg-slate-900

                        border
                        border-slate-800

                        rounded-2xl

                        px-5
                        py-4

                        hover:bg-slate-800/70
                        hover:border-slate-700

                        transition-all
                        duration-200
                    "

                >

                    <div
                        className="
                            flex
                            items-center
                            gap-4

                            min-w-0
                        "
                    >

                        <div
                            className="
                                h-11
                                w-11

                                rounded-xl

                                flex
                                items-center
                                justify-center

                                bg-emerald-500/10
                            "
                        >

                            <Upload
                                size={22}
                                className="
                                    text-emerald-400
                                "
                            />

                        </div>

                        <div
                            className="
                                text-left

                                min-w-0
                            "
                        >

                            <h3
                                className="
                                    text-white
                                    font-semibold
                                "
                            >

                                Upload PDF

                            </h3>

                            <p
                                className="
                                    text-sm
                                    text-slate-400
                                "
                            >

                                Choose a PDF to upload

                            </p>

                        </div>

                    </div>

                    <ChevronRight
                        size={18}
                        className="
                            text-slate-500

                            group-hover:text-white

                            transition
                        "
                    />

                </div>

                {/* <SelectedFileCard

                    file={
                        selectedFile
                    }

                    onRemove={() =>

                        setSelectedFile(
                            null
                        )

                    }

                /> */}
            </div>

            <SelectedFileCard

                file={
                    selectedFile
                }

                onRemove={() =>

                    setSelectedFile(
                        null
                    )

                }

            />

            {
                selectedFile && (

                    <button

                        onClick={async () => {

                            try {

                                setUploading(
                                    true
                                )

                                await onUpload(
                                    selectedFile
                                )

                                setSelectedFile(
                                    null
                                )

                                fileInputRef.current.value = ""

                            }

                            finally {

                                setUploading(
                                    false
                                )

                            }

                        }}

                        disabled={
                            uploading
                        }

                        className="
                            mt-4

                            w-full

                            h-12

                            rounded-2xl

                            bg-blue-600

                            hover:bg-blue-500

                            disabled:bg-slate-700

                            disabled:cursor-not-allowed

                            text-white

                            font-medium

                            transition-all
                        "
                    >

                        {
                            uploading

                                ? "Uploading..."

                                : "Upload PDF"
                        }

                    </button>

                )

            }
        </>
    )

}


// export default function UploadDropZone() {

//     return (

//         <div
//             onClick={() => {

//                 alert("clicked")

//             }}

//             className="
//                 bg-red-500
//                 p-10
//             "
//         >

//             TEST UPLOAD DROPZONE

//         </div>

//     )

// }

// export default function UploadDropZone() {

//     throw new Error("UploadDropZone loaded")

// }