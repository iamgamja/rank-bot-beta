export const BlockedType = ['관리자가 아님', '등록되지 않음', '잘못된 채널', '출첵 쿨타임', '도박 쿨타임', '던전 쿨타임'] as const
export type BlockedType = (typeof BlockedType)[number]
