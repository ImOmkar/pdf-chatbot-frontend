export default function Modal({

    open,

    onClose,

    children,

    maxWidth = "max-w-2xl"

}) {

    if (!open) {

        return null

    }

    return (

        <div
            className="
                fixed
                inset-0

                z-50

                hidden
                lg:flex

                items-center
                justify-center
            "
        >

            {/* Backdrop */}

            <div

                onClick={onClose}

                className="
                    absolute
                    inset-0

                    bg-black/60

                    backdrop-blur-sm
                "

            />

            {/* Modal */}

            <div

                onClick={(e) =>

                    e.stopPropagation()

                }

                className={`
                    relative

                    w-full

                    ${maxWidth}

                    max-h-[75vh]

                    overflow-y-auto

                    mx-4

                    rounded-3xl

                    border
                    border-slate-700

                    bg-slate-900

                    p-6

                    shadow-2xl

                    animate-in
                    zoom-in-95
                `}

            >

                {children}

            </div>

        </div>

    )

}