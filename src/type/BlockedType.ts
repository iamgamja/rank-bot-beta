export const BlockedType = [
  '관리자가 아님',
  '등록되지 않음',
  '잘못된 채널',
  '출첵 쿨타임',
  '도박 쿨타임',
  '던전 쿨타임',
  '이미 등록됨',
  '배팅 단위가 맞지 않음',
  '재화 부족',
  '배팅 금액이 음수',
] as const
export type BlockedType = (typeof BlockedType)[number]
