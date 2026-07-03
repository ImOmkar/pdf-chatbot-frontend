import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
    ChevronRight,
    Pencil,
    Pin,
    Trash2
}
from "lucide-react"

export default function SessionContextMenu({

    open,

    session,

    rect,

    onClose,

    onRename,

    onTogglePin,

    onDelete

}) {

    const menuRef = useRef(null)

    const [
        position,
        setPosition
    ] = useState({

        top: 0,

        left: 0

    })

    useLayoutEffect(() => {

        if (
            !open ||

            !rect ||

            !menuRef.current
        ) {

            return

        }

        const menu =
            menuRef.current

        const menuWidth =
            menu.offsetWidth

        const menuHeight =
            menu.offsetHeight

        const margin = 8

        let left =
            rect.right + margin

        let top =
            rect.bottom

        // Right edge

        if (

            left + menuWidth >

            window.innerWidth

        ) {

            left =

                rect.left

                - menuWidth

                - margin

        }

        // Bottom edge

        if (

            top + menuHeight >

            window.innerHeight

        ) {

            top =

                rect.top

                - menuHeight

        }

        // Keep inside viewport

        left = Math.max(
            margin,
            left
        )

        top = Math.max(
            margin,
            top
        )

        setPosition({

            top,

            left

        })

    }, [

        open,

        rect

    ])

    if (
        !open ||
        !session
    ) {

        return null

    }

    return (

        <>

            <div

                onClick={onClose}

                className="
                    fixed
                    inset-0
                    z-40
                "

            />

            <div

                ref={menuRef}

                style={

                    position

                }

                className="
                    fixed

                    z-50

                    w-56

                    rounded-2xl

                    bg-slate-900

                    border
                    border-slate-700

                    shadow-2xl

                    overflow-hidden

                    hidden
                    lg:block
                "

            >

                <button

                    onClick={() => {

                        onRename(
                            session
                        )

                        onClose()

                    }}

                    className="
                        w-full

                        flex
                        items-center
                        justify-between
                        dark:text-white
                        px-4
                        py-3

                        hover:bg-slate-800

                        transition
                    "

                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <Pencil
                            size={16}
                        />

                        Rename

                    </div>

                    <ChevronRight
                        size={15}
                    />

                </button>

                <button

                    onClick={async () => {

                        await onTogglePin(
                            session.session_id
                        )

                        onClose()

                    }}

                    className="
                        w-full

                        flex
                        items-center
                        justify-between
                        dark:text-white
                        px-4
                        py-3

                        hover:bg-slate-800

                        transition
                    "

                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <Pin
                            size={16}
                        />

                        {

                            session.is_pinned

                                ? "Unpin Chat"

                                : "Pin Chat"

                        }

                    </div>

                    <ChevronRight
                        size={15}
                    />

                </button>

                <button

                    onClick={() => {

                        onDelete(
                            session
                        )

                        onClose()

                    }}

                    className="
                        w-full

                        flex
                        items-center
                        justify-between

                        px-4
                        py-3

                        text-red-400

                        hover:bg-red-500/10

                        transition
                    "

                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <Trash2
                            size={16}
                        />

                        Delete

                    </div>

                    <ChevronRight
                        size={15}
                    />

                </button>

            </div>

        </>

    )

}