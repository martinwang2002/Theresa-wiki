/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import React from "react"

import FirstPageIcon from "@mui/icons-material/FirstPage"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import LastPageIcon from "@mui/icons-material/LastPage"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import type { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions"

export default function TablePaginationActions (props: Readonly<TablePaginationActionsProps>): JSX.Element {
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        aria-label="first page"
        disabled={page === 0}
        onClick={handleFirstPageButtonClick}
      >
        <FirstPageIcon />
      </IconButton>

      <IconButton
        aria-label="previous page"
        disabled={page === 0}
        onClick={handleBackButtonClick}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        aria-label="next page"
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        onClick={handleNextButtonClick}
      >
        <KeyboardArrowRight />
      </IconButton>

      <IconButton
        aria-label="last page"
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        onClick={handleLastPageButtonClick}
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  )
}
