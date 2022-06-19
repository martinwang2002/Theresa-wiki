
import type { SxProps, Theme } from "@mui/system"

interface IconProps {
  sx?: SxProps<Theme>
}

const defaultIconProps = {
  sx: {
    verticalAlign: "bottom"
  }
} as IconProps

export { defaultIconProps }
export type { IconProps }
