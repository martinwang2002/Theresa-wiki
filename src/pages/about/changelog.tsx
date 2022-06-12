import React from "react"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import FlightLandIcon from "@mui/icons-material/FlightLand"
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Head from "next/head"

import Page from "@/components/page/page"

import changelog from "@/models/changelog"

interface ChangelogState {
  expanded: string | false
  timeZone: string
}

export default class Changelog extends React.PureComponent<Record<string, never>, ChangelogState> {
  public constructor (props: Readonly<Record<string, never>>) {
    super(props)
    this.state = {
      // Expand first version
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      expanded: changelog.versions[0].version.join("."),
      timeZone: "GMT"
    }
  }

  public componentDidMount (): void {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone) {
      this.setState({
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      })
    }
  }

  public render (): React.ReactNode {
    const { versions } = changelog
    const { expanded, timeZone } = this.state
    return (
      <Page>
        <Head>
          <title>
            更新日志 | Theresa.wiki
          </title>
        </Head>

        <h1 style={{ fontFamily: "Roboto Mono" }}>
          更新日志
        </h1>

        <div style={{ whiteSpace: "break-spaces", overflow: "hidden" }}>
          {versions.map((version, index) => {
            const versionString = version.version.join(".")
            const dateString = new Date(version.date).toLocaleString(undefined, { timeZone })
            return (
              <Accordion
                expanded={expanded === versionString}
                key={versionString}
                // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
                onChange={(_event: Readonly<React.SyntheticEvent>, isExpanded: boolean): void => {
                  this.setState({ expanded: isExpanded ? versionString : false })
                }}
                sx={{ backgroundColor: "#fafafa" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <span style={{ width: "100%", display: "inline-flex", alignItems: "center" }}>

                    {/* Conditional (ternary) operator for bad eslint */}

                    {
                      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                      index === 0 &&
                        <FlightTakeoffIcon
                          fontSize="large"
                          htmlColor="#2196f3"
                          sx={{ verticalAlign: "middle" }}
                        />
                    }

                    {
                      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                      index !== 0 &&
                        <FlightLandIcon
                          fontSize="large"
                          htmlColor="#bdbdbd"
                          sx={{ verticalAlign: "middle" }}
                        />
                    }

                    <span style={{ fontWeight: 700, marginLeft: "0.5em" }}>
                      {versionString}
                    </span>
                  </span>
                </AccordionSummary>

                <AccordionDetails >

                  <span style={{ fontWeight: 700 }}>
                    {dateString}
                  </span>

                  <div style={{ paddingLeft: "2.5em", paddingTop: "1em" }}>
                    {Object.entries(version.contents).map((map: readonly[string, readonly string[]]) => {
                      const [typeOfChanges, changes] = map
                      return (
                        <div
                          key={typeOfChanges}
                        >
                          <span style={{ textTransform: "capitalize" }}>
                            {typeOfChanges}
                          </span>

                          <ul>
                            {changes.map((change => {
                              return (
                                <li key={change}>
                                  {change}
                                </li>
                              )
                            }))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
            )
          })}

        </div>
      </Page>
    )
  }
}
