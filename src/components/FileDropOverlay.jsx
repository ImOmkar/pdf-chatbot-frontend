import {
    UploadCloud
}
from "lucide-react"

export default function FileDropOverlay({

    open

}) {

    if (!open) {

        return null

    }

    return (

        <div
            className="
                fixed
                inset-0

                z-[200]

                bg-slate-950/75
                backdrop-blur-md

                flex
                items-center
                justify-center

                pointer-events-none
            "
        >

            <div
                className="
                    flex
                    flex-col
                    items-center

                    rounded-3xl

                    border-2
                    border-dashed
                    border-blue-500/70

                    bg-slate-900/80

                    px-12
                    py-10

                    shadow-2xl
                "
            >

                <div
                    className="
                        h-20
                        w-20

                        rounded-full

                        bg-blue-500/10

                        flex
                        items-center
                        justify-center

                        mb-6
                    "
                >

                    <UploadCloud

                        size={42}

                        className="
                            text-blue-400
                        "

                    />

                </div>

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-white
                    "
                >

                    Drop PDF to Upload

                </h2>

                <p
                    className="
                        mt-3

                        text-lg

                        text-slate-300
                    "
                >

                    Release your PDF to upload it

                </p>

            </div>

        </div>

    )

}