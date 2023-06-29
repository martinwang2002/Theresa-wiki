import React from "react"

import HomeIcon from "@mui/icons-material/Home"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import Breadcrumbs from "@mui/material/Breadcrumbs"

import StyledLink from "@/components/common/styledLink"

interface StyledBreadcrumbsProps {
  children: React.ReactNode | React.ReactNode[]
}

export default class StyledBreadcrumbs extends React.PureComponent<StyledBreadcrumbsProps> {
  public render (): React.ReactNode {
    const { children } = this.props
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        data-elastic-exclude
        data-nosnippet
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <StyledLink
          color="inherit"
          href="/"
          sx={{
            alignItems: "center",
            display: "flex"
          }}
        >
          <HomeIcon
            fontSize="inherit"
            sx={{ mr: 0.5 }}
          />
          首页
        </StyledLink>

        {children}
      </Breadcrumbs>
    )
  }
}
