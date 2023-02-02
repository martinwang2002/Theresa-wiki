import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"

interface BooleanDescriptorProps {
  readonly value: boolean
}

function BooleanDescriptor ({ value }: BooleanDescriptorProps): JSX.Element {
  if (value) {
    return (
      <CheckIcon
        htmlColor="#00c853"
        sx={{ verticalAlign: "middle" }}
      />
    )
  } else {
    return (
      <CloseIcon
        htmlColor="#d50000"
        sx={{ verticalAlign: "middle" }}
      />
    )
  }
}

export default BooleanDescriptor
