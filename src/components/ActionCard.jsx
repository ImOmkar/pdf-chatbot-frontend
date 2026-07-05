import {
    ChevronRight
}
from "lucide-react"

export default function ActionCard({

    icon,

    title,

    description,

    accent,

    onClick

}) {

    return (

        <button

            onClick={onClick}

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

                hover:-translate-y-0.5

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

                    className={`
                        h-11
                        w-11

                        rounded-xl

                        flex
                        items-center
                        justify-center

                        ${accent}
                    `}
                >

                    {icon}

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

                        {title}

                    </h3>

                    <p
                        className="
                            
                            text-sm
                            text-slate-400
                        "
                    >

                        {description}

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

        </button>

    )

}