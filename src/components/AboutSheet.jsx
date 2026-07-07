import BottomSheet
from "./BottomSheet"

import AboutContent
from "./AboutContent"

export default function AboutSheet({

    open,

    onClose

}) {

    return (

        <BottomSheet

            open={open}

            onClose={onClose}

        >

            <AboutContent />

        </BottomSheet>

    )

}