export const BlockedSubType = ['잘못된 채널', '출첵 쿨타임', '도박 쿨타임', '던전 쿨타임'] as const
export type BlockedSubType = (typeof BlockedSubType)[number]
