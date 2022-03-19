// libs
import React from "react"
import Head from "next/head"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff"
import FlightLandIcon from "@mui/icons-material/FlightLand"

// components
import Page from "@/components/page/page"

// models
import changelog from "@/models/changelog"

interface ChangelogState {
  expanded: string | false
}

export default class Changelog extends React.PureComponent<Record<string, never>, ChangelogState> {
  public constructor (props: Readonly<Record<string, never>>) {
    super(props)
    this.state = {
      // Expand first version
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      expanded: changelog.versions[0].version.join(".")
    }
  }

  public render (): React.ReactNode {
    const { versions } = changelog
    const { expanded } = this.state
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
                  <span style={{ width: "33%", flexShrink: 0 }}>

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

                    <span style={{ fontWeight: 700, verticalAlign: "middle", marginLeft: "0.5em" }}>
                      {versionString}
                    </span>
                  </span>
                </AccordionSummary>

                <AccordionDetails sx={{ paddingLeft: "3em" }}>
                  {Object.entries(version.contents).map((map: readonly[string, readonly string[]]) => {
                    const [typeOfChanges, changes] = map
                    return (
                      <>
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
                      </>
                    )
                  })}
                </AccordionDetails>
              </Accordion>
            )
          })}

        </div>
      </Page>
    )
  }
}
