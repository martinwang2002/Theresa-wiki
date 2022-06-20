import { grey } from "@mui/material/colors"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/system"

const Heading = styled(Typography)({
  color: grey[600],
  fontSize: "small",
  fontWeight: 700,
  marginBottom: ".5em",
  marginTop: ".5em",
  width: "100%"
})

export default Heading
