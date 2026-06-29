import {
    Trash2,
    FileText
}
from "lucide-react"

export default function DocumentItem({

    document,

    documentInfo,

    activeDocument,

    setActiveDocument,

    loadDocumentInfo,

    setConfirmModal,

    handleDeleteDocument,

    getFileName

}) {

    return (

        <div  key={document} className="flex items-center justify-between gap-4">
            <div
                onClick={
                    async () => {

                        setActiveDocument(
                            document
                        )

                        await loadDocumentInfo(
                            document
                        )

                    }
                }

                className={`
                    w-full
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    transition-all
                    cursor-pointer

                    ${
                        activeDocument === document
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    }
                `}>
                <span>
                    📄
                </span>

                <span
                    className="
                        truncate
                    "
                >
                    {
                        getFileName(document)
                    }
                </span>
            </div>
        
            <Trash2

                size={16}

                onClick={(e) => {

                    e.stopPropagation()

                    setConfirmModal({

                        open: true,

                        title: "Delete Document",

                        message: `Delete "${getFileName(document)}"?`,

                        confirmText: "Delete",

                        danger: true,

                        onConfirm: async () => {

                            await handleDeleteDocument(
                                document
                            )

                        }

                    })

                }}

                className="
                    text-slate-500
                    cursor-pointer
                    hover:text-red-400
                "
            />
        </div>

    )

}