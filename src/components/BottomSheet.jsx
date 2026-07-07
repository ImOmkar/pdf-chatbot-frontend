export default function BottomSheet({
    open,
    onClose,
    children
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
                lg:hidden
            ">

            {/* Backdrop */}

            <div

                onClick={() => {

                    // console.log(
                    //     "Backdrop clicked"
                    // )

                    onClose()

                }}

                className="
                    absolute
                    inset-0

                    bg-black/60
                    backdrop-blur-sm
                "
            />

            {/* Sheet */}

            <div
                onClick={(e) =>

                    e.stopPropagation()

                }
                className="
                    absolute

                    bottom-0
                    left-0
                    right-0


                    max-h-[75vh]

                    overflow-y-auto

                    bg-slate-900

                    rounded-t-3xl

                    border-t
                    border-slate-700

                    p-2

                    animate-in
                    slide-in-from-bottom

                    space-y-2
                "
            >

                {/* Handle */}

                <div
                    className="
                        w-12
                        h-1

                        mx-auto

                        rounded-full

                        bg-slate-700

                        mb-4
                    "
                />

                {children}

            </div>

        </div>

    )

}