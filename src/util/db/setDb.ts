import { dbData } from '../../type/dbData'
import { dbName } from '../../type/dbName'
import { getDbMessage } from './getDb'

export default async function setDb<name extends dbName>(name: name, data: dbData<name>) {
  const msg = await getDbMessage(name)
  const str = JSON.stringify(data)

  // 어차피 그냥 해도 discord에서 에러를 던져줄 것이므로 굳이 체크하지 않겠다 (?)
  // if (str.length > 2000 ) throw new error

  await msg.edit(str)
}
