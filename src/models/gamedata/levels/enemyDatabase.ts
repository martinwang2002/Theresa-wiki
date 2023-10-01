import { mergeWith } from "lodash"
import { serialize as serializeUri } from "uri-js"

import cacheable from "@/configurations/cache"
import { serverRuntimeConfig } from "@/configurations/runtimeConfig"

interface IEnemyValueEnemyDataPrototype<T> {
  m_defined: boolean
  m_value: this["m_defined"] extends true ?
    T : (
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      T extends number ? 0 : (
        T extends string ? null : (T extends boolean ? false : null)
      )
    )
}

interface IEnemyValueEnemyData {
  name: IEnemyValueEnemyDataPrototype<string>
  description: IEnemyValueEnemyDataPrototype<string>
  prefabKey: IEnemyValueEnemyDataPrototype<string>
  attributes: {
    maxHp: IEnemyValueEnemyDataPrototype<number>
    atk: IEnemyValueEnemyDataPrototype<number>
    def: IEnemyValueEnemyDataPrototype<number>
    magicResistance: IEnemyValueEnemyDataPrototype<number>
    cost: IEnemyValueEnemyDataPrototype<number>
    blockCnt: IEnemyValueEnemyDataPrototype<number>
    moveSpeed: IEnemyValueEnemyDataPrototype<number>
    attackSpeed: IEnemyValueEnemyDataPrototype<number>
    baseAttackTime: IEnemyValueEnemyDataPrototype<number>
    respawnTime: IEnemyValueEnemyDataPrototype<number>
    hpRecoveryPerSec: IEnemyValueEnemyDataPrototype<number>
    spRecoveryPerSec: IEnemyValueEnemyDataPrototype<number>
    maxDeployCount: IEnemyValueEnemyDataPrototype<number>
    massLevel: IEnemyValueEnemyDataPrototype<number>
    baseForceLevel: IEnemyValueEnemyDataPrototype<number>
    tauntLevel: IEnemyValueEnemyDataPrototype<number>
    stunImmune: IEnemyValueEnemyDataPrototype<boolean>
    silenceImmune: IEnemyValueEnemyDataPrototype<boolean>
    sleepImmune: IEnemyValueEnemyDataPrototype<boolean>
    frozenImmune: IEnemyValueEnemyDataPrototype<boolean>
    levitateImmune: IEnemyValueEnemyDataPrototype<boolean>
  }
  lifePointReduce: IEnemyValueEnemyDataPrototype<number>
  levelType: IEnemyValueEnemyDataPrototype<number>
  rangeRadius: IEnemyValueEnemyDataPrototype<number>
  numOfExtraDrops: IEnemyValueEnemyDataPrototype<number>
  viewRadius: IEnemyValueEnemyDataPrototype<number>
  talentBlackboard: unknown
  skills: unknown
  spData: unknown
}

type IEnemyValueEnemyDataDefined = {
  [key in "skills" | "spData" | "talentBlackboard" ]: IEnemyValueEnemyData[key]
} & {
  [key in Exclude<keyof IEnemyValueEnemyData, "attributes" | "skills" | "spData" | "talentBlackboard"> ]:
  IEnemyValueEnemyData[key] extends IEnemyValueEnemyDataPrototype<infer T> ? T | null : null
} & {
  attributes: {
    [key in keyof IEnemyValueEnemyData["attributes"]]: IEnemyValueEnemyData["attributes"][key]["m_value"] | null
  }
}

interface IEnemyValue {
  level: number
  enemyData: IEnemyValueEnemyData
}

interface IEnemy {
  Key: string
  Value: IEnemyValue[]
}

interface IEnemyDatabase {
  enemies: IEnemy[]
}

export const enemyDatabase = cacheable(async (): Promise<IEnemyDatabase> => {
  const enemydataUrl = serializeUri({
    ...serverRuntimeConfig.THERESA_S3,
    path: `${serverRuntimeConfig.THERESA_S3.path ?? ""}/levels/enemydata/enemy_database.json`
  })

  const enemydataRes = await fetch(enemydataUrl)
  const enemydataResult = await enemydataRes.json() as IEnemyDatabase
  return enemydataResult
}, { cacheKey: "enemyDatabase", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

export const enemyValueByEnemyId = cacheable(async (enemyId: string): Promise<IEnemyValue[]> => {
  const enemyDatabaseResult = await enemyDatabase()
  const enemyValue = enemyDatabaseResult.enemies.filter((enemy) => enemy.Key === enemyId)[0].Value
  return enemyValue
}, { cacheKey: "enemyValueByEnemyId", expiryMode: "EX", ttl: serverRuntimeConfig.REDIS_EX_TTL })

/**
 * @param enemyDataValue - Enemy data value from low priority to high priority
**/
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const enemyValueEnemyDataDefined = (enemyValueEnemyData: IEnemyValueEnemyData[]): IEnemyValueEnemyDataDefined => {
  let _enemyValueEnemyDataDefined: IEnemyValueEnemyDataDefined
  _enemyValueEnemyDataDefined = {} as IEnemyValueEnemyDataDefined

  for (const _enemyValueEnemyData of enemyValueEnemyData) {
    const currentEnemyDataValueDefined = {
      attributes: {
        atk: _enemyValueEnemyData.attributes.atk.m_defined ? _enemyValueEnemyData.attributes.atk.m_value : null,
        attackSpeed: _enemyValueEnemyData.attributes.attackSpeed.m_defined ? _enemyValueEnemyData.attributes.attackSpeed.m_value : null,
        baseAttackTime: _enemyValueEnemyData.attributes.baseAttackTime.m_defined ? _enemyValueEnemyData.attributes.baseAttackTime.m_value : null,
        baseForceLevel: _enemyValueEnemyData.attributes.baseForceLevel.m_defined ? _enemyValueEnemyData.attributes.baseForceLevel.m_value : null,
        blockCnt: _enemyValueEnemyData.attributes.blockCnt.m_defined ? _enemyValueEnemyData.attributes.blockCnt.m_value : null,
        cost: _enemyValueEnemyData.attributes.cost.m_defined ? _enemyValueEnemyData.attributes.cost.m_value : null,
        def: _enemyValueEnemyData.attributes.def.m_defined ? _enemyValueEnemyData.attributes.def.m_value : null,
        frozenImmune: _enemyValueEnemyData.attributes.frozenImmune.m_defined ? _enemyValueEnemyData.attributes.frozenImmune.m_value : null,
        hpRecoveryPerSec: _enemyValueEnemyData.attributes.hpRecoveryPerSec.m_defined ? _enemyValueEnemyData.attributes.hpRecoveryPerSec.m_value : null,
        levitateImmune: _enemyValueEnemyData.attributes.levitateImmune.m_defined ? _enemyValueEnemyData.attributes.levitateImmune.m_value : null,
        magicResistance: _enemyValueEnemyData.attributes.magicResistance.m_defined ? _enemyValueEnemyData.attributes.magicResistance.m_value : null,
        massLevel: _enemyValueEnemyData.attributes.massLevel.m_defined ? _enemyValueEnemyData.attributes.massLevel.m_value : null,
        maxDeployCount: _enemyValueEnemyData.attributes.maxDeployCount.m_defined ? _enemyValueEnemyData.attributes.maxDeployCount.m_value : null,
        maxHp: _enemyValueEnemyData.attributes.maxHp.m_defined ? _enemyValueEnemyData.attributes.maxHp.m_value : null,
        moveSpeed: _enemyValueEnemyData.attributes.moveSpeed.m_defined ? _enemyValueEnemyData.attributes.moveSpeed.m_value : null,
        respawnTime: _enemyValueEnemyData.attributes.respawnTime.m_defined ? _enemyValueEnemyData.attributes.respawnTime.m_value : null,
        silenceImmune: _enemyValueEnemyData.attributes.silenceImmune.m_defined ? _enemyValueEnemyData.attributes.silenceImmune.m_value : null,
        sleepImmune: _enemyValueEnemyData.attributes.sleepImmune.m_defined ? _enemyValueEnemyData.attributes.sleepImmune.m_value : null,
        spRecoveryPerSec: _enemyValueEnemyData.attributes.spRecoveryPerSec.m_defined ? _enemyValueEnemyData.attributes.spRecoveryPerSec.m_value : null,
        stunImmune: _enemyValueEnemyData.attributes.stunImmune.m_defined ? _enemyValueEnemyData.attributes.stunImmune.m_value : null,
        tauntLevel: _enemyValueEnemyData.attributes.tauntLevel.m_defined ? _enemyValueEnemyData.attributes.tauntLevel.m_value : null
      },
      description: _enemyValueEnemyData.description.m_defined ? _enemyValueEnemyData.description.m_value : null,
      levelType: _enemyValueEnemyData.levelType.m_defined ? _enemyValueEnemyData.levelType.m_value : null,
      lifePointReduce: _enemyValueEnemyData.lifePointReduce.m_defined ? _enemyValueEnemyData.lifePointReduce.m_value : null,
      name: _enemyValueEnemyData.name.m_defined ? _enemyValueEnemyData.name.m_value : null,
      numOfExtraDrops: _enemyValueEnemyData.numOfExtraDrops.m_defined ? _enemyValueEnemyData.numOfExtraDrops.m_value : null,
      prefabKey: _enemyValueEnemyData.prefabKey.m_defined ? _enemyValueEnemyData.prefabKey.m_value : null,
      rangeRadius: _enemyValueEnemyData.rangeRadius.m_defined ? _enemyValueEnemyData.rangeRadius.m_value : null,
      skills: _enemyValueEnemyData.skills !== null ? _enemyValueEnemyData.skills : null,
      spData: _enemyValueEnemyData.spData !== null ? _enemyValueEnemyData.spData : null,
      talentBlackboard: _enemyValueEnemyData.talentBlackboard !== null ? _enemyValueEnemyData.talentBlackboard : null,
      viewRadius: _enemyValueEnemyData.viewRadius.m_defined ? _enemyValueEnemyData.viewRadius.m_value : null
    } as IEnemyValueEnemyDataDefined

    _enemyValueEnemyDataDefined = mergeWith(_enemyValueEnemyDataDefined, currentEnemyDataValueDefined, (objValue: number | string | null, srcValue: number | string | null, key: string) => {
      if (key === "attributes") {
        return mergeWith(objValue, srcValue, (_objValue: number | string | null, _srcValue: number | string | null) => {
          return _srcValue ?? _objValue
        })
      }
      return srcValue ?? objValue
    }) as IEnemyValueEnemyDataDefined
  }
  return _enemyValueEnemyDataDefined
}

export type { IEnemy, IEnemyValueEnemyData, IEnemyValueEnemyDataDefined, IEnemyValueEnemyDataPrototype }
