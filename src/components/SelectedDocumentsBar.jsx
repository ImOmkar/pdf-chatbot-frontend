
import {
    useState
}
from "react"

import {
    FileText,
    X
}
from "lucide-react"

export default function SelectedDocumentsBar({

    selectedDocuments,

    setSelectedDocuments,

    getFileName

}) {

    if (

        selectedDocuments.length === 0

    ) {

        return null

    }

    const MAX_VISIBLE_DOCUMENTS = 2

    const visibleDocuments =

        selectedDocuments.slice(
            0,
            MAX_VISIBLE_DOCUMENTS
        )

    const remainingCount =

        selectedDocuments.length -
        MAX_VISIBLE_DOCUMENTS

    const [

        expanded,

        setExpanded

    ] = useState(false)

    const documentsToRender =

        expanded

            ? selectedDocuments

            : visibleDocuments

    return (

        <div
            className="
                px-6
                pt-4
                mb-2
            "
        >

            <div
                className="
                    max-w-5xl
                    mx-auto
                "
            >

                <p
                    className="
                        mb-3

                        text-xs

                        font-medium

                        uppercase

                        tracking-wider

                        text-slate-500
                    "
                >

                    Using Documents

                </p>

                <div
                    className="
                        flex
                        flex-wrap
                        gap-2
                    "
                >

                    {

                        documentsToRender.map(

                            (document) => (

                                <div

                                    key={document}

                                    className="
                                        flex
                                        items-center
                                        gap-2

                                        max-w-full

                                        rounded-full

                                        border
                                        border-slate-700

                                        bg-slate-900

                                        px-3
                                        py-2

                                        text-sm
                                    "
                                >

                                    <FileText

                                        size={15}

                                        className="
                                            shrink-0
                                            text-blue-400
                                        "
                                    />

                                    <span
                                        className="
                                            max-w-[140px]

                                            truncate

                                            text-white
                                        "
                                    >

                                        {

                                            getFileName(
                                                document
                                            )

                                        }

                                    </span>

                                    <button

                                        onClick={() =>

                                            setSelectedDocuments(

                                                prev =>

                                                    prev.filter(

                                                        doc =>

                                                            doc !== document

                                                    )

                                            )

                                        }

                                        className="
                                            rounded-full

                                            p-1

                                            text-slate-400

                                            transition

                                            hover:bg-slate-800

                                            hover:text-red-400
                                        "
                                    >

                                        <X size={14} />

                                    </button>

                                </div>

                            )

                        )

                    }

                    {

                        !expanded &&

                        remainingCount > 0 && (

                            <button

                                onClick={() =>

                                    setExpanded(
                                        true
                                    )

                                }

                                className="
                                    rounded-full

                                    border
                                    border-slate-700

                                    bg-slate-900

                                    px-3
                                    py-2

                                    text-sm

                                    text-blue-400

                                    hover:bg-slate-800

                                    transition
                                "

                            >

                                +{remainingCount} more

                            </button>

                        )

                    }

                    {

                        expanded &&

                        selectedDocuments.length >

                        MAX_VISIBLE_DOCUMENTS && (

                            <button

                                onClick={() =>

                                    setExpanded(
                                        false
                                    )

                                }

                                className="
                                    rounded-full

                                    border
                                    border-slate-700

                                    bg-slate-900

                                    px-3
                                    py-2

                                    text-sm

                                    text-slate-400

                                    hover:bg-slate-800

                                    transition
                                "

                            >

                                Show Less

                            </button>

                        )

                    }

                </div>

            </div>

        </div>

    )

}