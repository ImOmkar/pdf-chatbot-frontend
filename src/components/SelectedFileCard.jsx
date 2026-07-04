import {
    FileText,
    X
}
from "lucide-react"

export default function SelectedFileCard({

    file,

    onRemove

}) {

    if (!file) {

        return null

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
                                text-sm
                                text-slate-400
                            "
                        >

                            {
                                (
                                    file.size /
                                    1024 /
                                    1024
                                ).toFixed(2)
                            } MB

                        </p>

                    </div>

                </div>

                <button

                    onClick={onRemove}

                    className="
                        p-2

                        rounded-lg

                        text-slate-400

                        hover:bg-slate-800

                        hover:text-red-400

                        transition
                    "
                >

                    <X size={18} />

                </button>

            </div>

        </div>

    )

}