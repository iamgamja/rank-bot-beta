import { CommandInteraction } from 'discord.js'
import { Discord, Slash } from 'discordx'

@Discord()
export class 날짜 {
  @Slash({ description: '2020년 10월 17일을 0일로 계산해서 오늘 날짜를 확인합니다.', name: '날짜' })
  async haee(interaction: CommandInteraction) {
    const diffms = new Date().getTime() - new Date('2020 10 17').getTime()
    const diffday = Math.floor(diffms / 1000 / 60 / 60 / 24)
    await interaction.reply(`오늘은 ${diffday}일 입니다.`)
  }
}
