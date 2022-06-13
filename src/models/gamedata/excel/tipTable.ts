interface ITip {
  tip: string
  weight: number
  category: string
}

interface IWorldViewTip {
  title: string
  description: string
  backgroundPicId: string
  weight: number
}

interface ITipTable {
  tips: ITip[]
  worldViewTips: IWorldViewTip[]
}

// Copied directly from arknights folder
/* eslint-disable sort-keys */
const tipTable = {
  tips: [
    {
      tip: "防御力可以等量地降低单位受到的物理伤害",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "使用演习券进入战斗不会消耗理智也无法获得报酬",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "提升干员等级以获得更强抵抗力",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "精英化后的干员属性上限会全面提升，还能获得新天赋或者新技能",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "低星干员比高星干员更容易晋升",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "合理安排医疗与重装干员的位置",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "灵活运用角色的天赋与特性，能够增加更多的策略选择",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "请针对敌方单位弱点，选择合适的阵容进行攻略",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "灵活利用一些地图的特殊地形和机制",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "干员合理的入场顺序以及正确的技能施放时机能左右战场局面",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "优先部署先锋干员是开场时的好选择",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "大部分狙击干员都会优先攻击空中单位",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "在敌人的攻击范围内，后置入战场的我方干员会被优先攻击",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "战斗中主动撤退干员会返还部分费用",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "放置于草地的单位不会受到远程攻击",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "长按点击地形能够查看地形特性",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "物理攻击力在低于目标防御力时只会造成极小的伤害",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "法术攻击造成的伤害无视目标的防御力，但是会受到目标法术抗性的百分比减免",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "倒下或撤退的干员在一定时间后可以再次部署，但费用也会增加",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "歼灭所有敌人即可获得最高评价",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "出战前可在编队界面自由切换干员技能",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "相同干员可以在不同编队中配置不同技能",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "默认技能只在编入新队伍时生效，若该干员已在队伍中则技能不变",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "当干员置入战场还未选择朝向时，可点击菱形外区域取消放置干员",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "干员的信赖值会影响干员的作战能力",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "信用商店每天会根据昨天宿舍氛围以及支援单位次数来结算信用",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "公开招募的时间长短会影响招募的结果",
      weight: 50.0,
      category: "GACHA"
    },
    {
      tip: "公开招募的时间越充足，越有可能找到符合要求的候选人",
      weight: 50.0,
      category: "GACHA"
    },
    {
      tip: "公开招募预算过多时，资金的利用效率可能会降低",
      weight: 50.0,
      category: "GACHA"
    },
    {
      tip: "公开招募可能提前找到符合要求的候选人",
      weight: 50.0,
      category: "GACHA"
    },
    {
      tip: "部分干员精英化后升到满级将会获得新天赋",
      weight: 50.0,
      category: "BATTLE"
    },
    {
      tip: "主线和物资筹备过关后有极小机会获得部分家具的幸运掉落",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "每次升级控制中枢都会扩大信号的覆盖范围，开启新的建设区域",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "设施只有连通控制中枢才可进行清理和建造",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "通过清理罗德岛，可以获得更多的无人机以供使用",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "无人机可以从事很多领域的作业，包括清理、建造、升级设施以及协助生产计划",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "每次使用完的无人机都需要充电维护一段时间后，才可重新投入使用",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "无人机协助是以生产时间已去除效率加成的前提下，进行加速生产的",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "设置为基建副手与楼层副手的干员可快速提升信赖",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "基建副手与楼层副手每天额外有两次提升信赖的机会",
      weight: 10.0,
      category: "BUILDING"
    },
    {
      tip: "每天与有信赖气泡的干员进行交互将会促进彼此的信赖，提升的信赖与宿舍氛围有关",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "进驻控制中枢的干员越多，基建内所有干员的心情消耗越少",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "发电站能增加电力供应，以供维持更多的设施运行",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "发电站进驻干员可加快无人机的恢复速度",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "制造站生产力越高，制造时间越短",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "制造站达到容量上限后，将会自动暂停制造",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "贸易站获取效率越高，订单获取时间越短",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "贸易站达到订单上限后，将会自动暂停获取订单",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "制造站与贸易站进驻干员越多，心情消耗越少",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "在设施进行工作的干员会逐渐消耗心情",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "注意力涣散的干员依然可以正常工作，但无法提供设施与后勤技能的效率加成",
      weight: 10.0,
      category: "BUILDING"
    },
    {
      tip: "干员可通过进驻宿舍恢复心情",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "宿舍可以通过装扮提升氛围，氛围越高，干员心情恢复越快",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "宿舍装扮的氛围无法超出当前宿舍的氛围上限",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "同一宿舍内，相同家具只有前6件能够获得氛围",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "进驻人力办公室可联络人脉资源，人脉资源可用来刷新公开招募的职业需求",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "加工站没有进驻干员也可以加工各种材料",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "加工站进驻干员进行加工时会消耗心情，但有一定概率获得副产品",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "加工站可以拆解闲置家具，拆解家具不会消耗干员心情与龙门币",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "技能升到7级时，可通过训练室升级专精技能",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "训练室进驻协助者可缩短训练者的训练时间",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "训练室同一时间只能有1名干员进行专精",
      weight: 1.0,
      category: "BUILDING"
    },
    {
      tip: "不同干员会有不同的线索搜集倾向，倾向程度与干员稀有度、精英化阶段有关",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "线索搜集的时间与干员稀有度、精英化阶段、会客室等级以及宿舍氛围有关",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "从接收库接收的线索会有过期时间，且无法传递给好友",
      weight: 5.0,
      category: "BUILDING"
    },
    {
      tip: "设施进驻干员除了自身后勤技能的效率加成外，还会获得设施基础效率加成",
      weight: 10.0,
      category: "BUILDING"
    },
    {
      tip: "干员可通过升级、晋升来强化或者获得新的后勤技能",
      weight: 10.0,
      category: "BUILDING"
    },
    {
      tip: "源石——神秘矿物；随着技术的革新，越来越多地被各个国家作为能源使用。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "天灾——频繁发生的各种自然灾害的统称；包含且不限于暴风、雪灾、洪水甚至陨石坠落。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "罗德岛——注册医药研发公司；在各国范围内广招贤士中，无论资历。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "矿石病——恶性传染病；矿石病患者身体开始逐渐结晶化，最终导致死亡并成为新的传染源。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "移动城市——为了应对天灾产生的新城市系统，通常2-8周内就能保证安全撤离出灾害范围。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "源石技艺——通过激发源石内含的、用于量化法术的能量单元，使物质或意识发生改变的技术。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "整合运动——一个由受到压迫的感染者组成，反抗非感染者及其政权的军事化民间组织。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "龙门——由贵族魏彦吾领导的移动城邦；开放、包容、自由是其最大的特征。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "乌萨斯帝国——以乌萨斯为主体民族的庞大帝国；幅员辽阔，自然环境严酷，有着极其丰富的军事资本。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "莱茵生命——受人瞩目的哥伦比亚科技团体，致力于拓展各种顶尖科技的实际运用。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "黑钢——大型跨国安全承包商，向各国提供包括小到保镖雇佣、大到军事介入的各种安全服务。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "企鹅物流——充满谜团的物流运输公司，主营业务为情报贩卖、武装押运与秘密运输。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "感染监控装置——包含判断感染、体征监测、病症追踪等多种用途的监控装置。在罗德岛被广泛应用。",
      weight: 20.0,
      category: "MISC"
    },
    {
      tip: "维多利亚——由德拉克与阿斯兰统治的现代国家，强调强权与扩张，军事实力强大，经济繁荣，是泰拉大地上名副其实的霸权王国。",
      weight: 40.0,
      category: "MISC"
    }
  ],
  worldViewTips: [
    {
      title: "源石",
      description: "泰拉世界普遍存在的一种矿物，大部分呈黑色半透光晶体。源石都蕴藏着巨大的能量，是引发天灾的首要因素。通常被运用于法术领域，是制造各种施术工具和法术道具的基本材料和催化物，离开了源石辅助，法术的使用效率会大幅下降。现在，随着源石引擎技术的革新，越来越多的源石被各个国家作为能源使用。",
      backgroundPicId: "worldtip1",
      weight: 1.0
    },
    {
      title: "天灾",
      description: "在泰拉世界频繁发生的各种自然灾害的统称。包含且不限于暴风、雪灾、强降雨、洪水等甚至陨石坠落。天灾的发生频率非常高，规律也难以捉摸，导致大部分的文明通过全城市迁徙来躲避天灾。天灾过后往往会留下一种叫做源石的矿物。研究表明，天灾其实反而可能是源石的一种传播媒介。",
      backgroundPicId: "worldtip2",
      weight: 1.0
    },
    {
      title: "罗德岛",
      description: "罗德岛制药公司是一家注册医药研发公司。罗德岛在公开的资料中声称正在研究可以应用于各个国家、组织或个人遭遇的感染者问题的医疗方案，因此在各国范围内广招贤士，不管资历，无论感染。同时，罗德岛也为其雇员提供良好的医疗与生活条件以及最先进的研究设备，这吸引了许多走投无路的感染者和立志改变感染者处境的有能人士。",
      backgroundPicId: "worldtip3",
      weight: 1.0
    },
    {
      title: "矿石病",
      description: "目前发现长期接触源石及其工业衍生品，会使人更容易得一种被称为“矿石病”的不治之症。患上矿石病的人被称为“感染者”。矿石病会以一种危险的形式增强人的法术使用能力，但是却会在患者使用法术的过程中不断扩大感染范围最终夺走感染者的生命并以其作为新的感染源。有关该病症已经有多方面的长期研究，然而并没有太多有效成果。",
      backgroundPicId: "worldtip4",
      weight: 1.0
    },
    {
      title: "移动城市",
      description: "建造在可移动设备上的城市。破坏力巨大且频发的天灾，迫使几乎所有国家定期采用迁移城市的方式进行躲避。源石引擎的发明使得源石工业化得以实现，人们开始尝试建造远大于之前规模的载具。载具的尺寸规模今非昔比，最终形成了移动城邦的概念。配合多途径天灾预测系统，根据灾害的不同，城市通常需要留出2-8周时间来保证安全撤离出灾害范围。",
      backgroundPicId: "worldtip5",
      weight: 1.0
    },
    {
      title: "龙门",
      description: "由魏彦吾治理的移动城邦，楼宇林立，交通发达，是炎国重要经济中心之一。",
      backgroundPicId: "worldtip_lungmen",
      weight: 1.0
    },
    {
      title: "乌萨斯帝国",
      description: "以乌萨斯为主体民族的庞大帝国，幅员辽阔，地处极北，虽然坐拥着大量矿产，但多数国土处于未开发状态。在上一任皇帝的带领下，乌萨斯开始了工业化与强兵之路，通过对周边国家发起战争，使得国力极速发展。而后因对东国的战争失利，军队与新老贵族之间不可调和的矛盾爆发，乌萨斯迎来了剧烈的社会变革。",
      backgroundPicId: "worldtip_ursus",
      weight: 1.0
    },
    {
      title: "维多利亚帝国",
      description: "由德拉克与阿斯兰统治的现代国家，占据了泰拉大地最为富饶的中央谷地，领土广袤，资源丰富，与多个核心圈国家相邻，除此之外还有数个开拓区与飞地。维多利亚帝国强调强权与扩张，旨在泰拉大地上建立自己主导的国际秩序，通过霸权与掠夺开拓地维持贵族利益，以及维持维多利亚至上的世界体系。",
      backgroundPicId: "worldtip_victoria",
      weight: 7.0
    }
  ]
} as ITipTable
/* eslint-enable sort-keys */

export { tipTable }
