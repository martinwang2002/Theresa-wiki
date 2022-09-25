import React from "react"

import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/system"

import PatchedNumber from "@/components/common/patchedNumber"
import type { IPatchedNumber } from "@/components/common/patchedNumber"
import CostIcon from "@/components/icon/costIcon"
import LifePointIcon from "@/components/icon/lifePointIcon"

import type { IRunes, IStageJsonOptions } from "@/models/gamedata/levels/index"

interface StageInfoTableProps {
  difficulty: string
  diffGroup: string
  stageOptions: IStageJsonOptions
  runes: IRunes[] | null
}

const StageOptionsTableRow = styled("div")({
  display: "flex"
})

const StageOptionsTableRowKey = styled("div")({
  display: "inline-block",
  minWidth: "8em",
  padding: "0.75em",
  textAlign: "center",
  width: "25%"
})

const StageOptionsTableRowValue = styled("div")({
  display: "inline-block",
  fontFamily: "Roboto Mono",
  minWidth: "6em",
  padding: "0.75em",
  width: "75%"
})

interface IStageJsonOptionsWithRunes {
  characterLimit: IPatchedNumber
  maxLifePoint: IPatchedNumber
  initialCost: IPatchedNumber
  maxCost: IPatchedNumber
  costIncreaseTime: IPatchedNumber
  moveMultiplier: IPatchedNumber
  steeringEnabled: boolean
  isTrainingLevel: boolean
  isHardTrainingLevel: boolean
  functionDisableMask: number
  [key: string]: unknown
}

enum difficultyMap {
  NONE = 0,
  NORMAL = 1,
  FOUR_STAR = 2
}

enum difficultyGroupMap {
  NONE = 0,
  EASY = 1,
  NORMAL = 2,
  TOUGH = 4,
  ALL = 7
}

enum difficultyMaskMap {
  NONE = 0,
  NORMAL = 1,
  TOUGH = 2,
  EASY = 4,
  ALL = 7
}

function getStageOptionsWithRunes (stageOptions: Readonly<IStageJsonOptions>, runes: Readonly<Readonly<IRunes>[]> | null, difficulty: string, diffGroup: string): IStageJsonOptionsWithRunes {
  // deep copy
  const _stageOptions = { ...stageOptions } as IStageJsonOptionsWithRunes

  let difficultyMask: number
  const unsetDifficultyMask = -1
  difficultyMask = unsetDifficultyMask

  switch (diffGroup) {
    case difficultyGroupMap[difficultyGroupMap.EASY]:
      difficultyMask = difficultyMaskMap.EASY
      break
    case difficultyGroupMap[difficultyGroupMap.NORMAL]:
      // for difficulty handling, do not change difficultyMask
      break
    case difficultyGroupMap[difficultyGroupMap.TOUGH]:
      difficultyMask = difficultyMaskMap.TOUGH
      break
    default:
      break
  }

  if (difficultyMask === unsetDifficultyMask) {
    switch (difficulty) {
      case difficultyMap[difficultyMap.NORMAL]:
        difficultyMask = difficultyMaskMap.NORMAL
        break
      case difficultyMap[difficultyMap.FOUR_STAR]:
        difficultyMask = difficultyMaskMap.TOUGH
        break
      default:
        break
    }
  }

  const appliedRunes = runes ? runes.filter(rune => rune.difficultyMask === difficultyMask) : []

  const zero = 0

  for (const rune of appliedRunes) {
    switch (rune.key) {
      case "global_initial_cost_add": {
        let value: number
        value = zero
        if (rune.blackboard) {
          for (const blackboard of rune.blackboard) {
            if (blackboard.key === "value") {
              value = blackboard.value ?? zero
              break
            }
          }
        }

        _stageOptions.initialCost = {
          new: stageOptions.initialCost + value,
          old: `${stageOptions.initialCost}+${value}`
        } as IPatchedNumber
        break
      }
      case "global_lifepoint": {
        let value: number
        value = zero
        if (rune.blackboard) {
          for (const blackboard of rune.blackboard) {
            if (blackboard.key === "value") {
              value = blackboard.value ?? zero
              break
            }
          }
        }

        _stageOptions.maxLifePoint = {
          new: value,
          old: stageOptions.maxLifePoint
        } as IPatchedNumber
        break
      }
      case "cbuff_cost_recovery": {
        let scale: number
        scale = zero
        if (rune.blackboard) {
          for (const blackboard of rune.blackboard) {
            if (blackboard.key === "scale") {
              scale = blackboard.value ?? zero
              break
            }
          }
        }

        _stageOptions.costIncreaseTime = {
          new: stageOptions.costIncreaseTime * scale,
          old: `${stageOptions.costIncreaseTime}*${scale}`
        } as IPatchedNumber
        break
      }
      case "gbuff_placable_char_num": {
        let value: number
        value = zero
        if (rune.blackboard) {
          for (const blackboard of rune.blackboard) {
            if (blackboard.key === "value") {
              value = blackboard.value ?? zero
              break
            }
          }
        }

        _stageOptions.characterLimit = {
          new: stageOptions.characterLimit + value,
          old: `${stageOptions.characterLimit}+${value}`
        } as IPatchedNumber
        break
      }
      case "gbuff_placable_char_num_add": {
        let value: number
        value = zero
        if (rune.blackboard) {
          for (const blackboard of rune.blackboard) {
            if (blackboard.key === "value") {
              value = blackboard.value ?? zero
              break
            }
          }
        }

        _stageOptions.characterLimit = {
          new: stageOptions.characterLimit + value,
          old: `${stageOptions.characterLimit}+${value}`
        } as IPatchedNumber
        break
      }
    }
  }

  return _stageOptions
}

class StageOptionsTable extends React.PureComponent<StageInfoTableProps> {
  public render (): React.ReactNode {
    const { stageOptions, diffGroup, difficulty, runes } = this.props

    const stageOptionsWithRunes = getStageOptionsWithRunes(stageOptions, runes, difficulty, diffGroup)

    return (
      <Paper sx={{ margin: "auto", maxWidth: "100%", width: "max-content" }}>
        <StageOptionsTableRow>
          <StageOptionsTableRowKey >
            初始费用
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            <CostIcon sx={{ marginRight: "0.3em", verticalAlign: "bottom" }} />

            <PatchedNumber number={stageOptionsWithRunes.initialCost} />
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

        <StageOptionsTableRow>
          <StageOptionsTableRowKey>
            费用最大值
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            <CostIcon sx={{ marginRight: "0.3em", verticalAlign: "bottom" }} />

            {stageOptions.maxCost}
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

        <StageOptionsTableRow>
          <StageOptionsTableRowKey>
            费用回复速度
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            <CostIcon sx={{ marginRight: "0.3em", verticalAlign: "bottom" }} />

            /

            <PatchedNumber number={stageOptionsWithRunes.costIncreaseTime} />

            s
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

        <StageOptionsTableRow>
          <StageOptionsTableRowKey>
            关卡生命值
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            <LifePointIcon sx={{ marginRight: "0.3em", verticalAlign: "bottom" }} />

            <PatchedNumber number={stageOptionsWithRunes.maxLifePoint} />
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

        <StageOptionsTableRow>
          <StageOptionsTableRowKey>
            部署位
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            <PatchedNumber number={stageOptionsWithRunes.characterLimit} />
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

        <StageOptionsTableRow>
          <StageOptionsTableRowKey>
            移速
          </StageOptionsTableRowKey>

          <Divider
            flexItem
            orientation="vertical"
            variant="middle"
          />

          <StageOptionsTableRowValue>
            {stageOptions.moveMultiplier}
          </StageOptionsTableRowValue>

        </StageOptionsTableRow>

      </Paper>
    )
  }
}

export default StageOptionsTable
