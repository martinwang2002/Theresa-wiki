interface IChangelogContent {
  added?: string[]
  changed?: string[]
  deprecated?: string[]
  removed?: string[]
  fixed?: string[]
  security?: string[]
}

interface IChangelog {
  version: [number, number, number, string?]
  date: Date
  contents: IChangelogContent
}

interface IChangelogYaml {
  versions: IChangelog[]
}

declare module "*changelog.yaml" {
  const content: IChangelogYaml
  export default content
}
