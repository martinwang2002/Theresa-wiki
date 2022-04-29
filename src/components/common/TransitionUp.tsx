import React from "react"
import Slide from "@mui/material/Slide"
import type { TransitionProps } from "@mui/material/transitions"

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/prefer-readonly-parameter-types
function TransitionUp (props: TransitionProps & {
  children: React.ReactElement
},
ref: React.Ref<unknown>): React.ReactElement {
  return (
    <Slide
      direction="up"
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const TransitionUpRef = React.forwardRef(TransitionUp)

export default TransitionUpRef
