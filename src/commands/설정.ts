import { ApplicationCommandOptionType, CommandInteraction, GuildMember } from 'discord.js'
import { Discord, Slash, SlashGroup, SlashOption } from 'discordx'
import { defer } from '../decorator/defer'
import add from '../util/add'
import block from '../util/block'
import isAdmin from '../util/check/isAdmin'
import isUser from '../util/check/isUser'

@Discord()
@SlashGroup({ description: '[관리자 전용] 스탯을 설정합니다.', name: '설정' })
@SlashGroup('설정')
export class 설정 {
  @Slash({ description: '[관리자 전용] 공격력을 설정합니다.', name: '공격력' })
  @defer
  async 공격력(
    @SlashOption({
      description: '더하려면 양수로, 빼려면 음수로 입력해주세요.',
      name: '수치',
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    수치: number,
    @SlashOption({
      description: '설정할 대상입니다.',
      name: '대상',
      required: true,
      type: ApplicationCommandOptionType.User,
    })
    대상: GuildMember,

    interaction: CommandInteraction
  ) {
    if (!(await isAdmin(interaction.member as GuildMember))) return await block(interaction, '관리자가 아님', null)
    if (!(await isUser(대상))) return await block(interaction, '등록되지 않음', null)

    await add(대상, 'atk', 수치)
    await interaction.editReply('✅')
  }
  @Slash({ description: '[관리자 전용] 경험치를 설정합니다.', name: '경험치' })
  @defer
  async 경험치(
    @SlashOption({
      description: '더하려면 양수로, 빼려면 음수로 입력해주세요.',
      name: '수치',
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    수치: number,
    @SlashOption({
      description: '설정할 대상입니다.',
      name: '대상',
      required: true,
      type: ApplicationCommandOptionType.User,
    })
    대상: GuildMember,

    interaction: CommandInteraction
  ) {
    if (!(await isAdmin(interaction.member as GuildMember))) return await block(interaction, '관리자가 아님', null)
    if (!(await isUser(대상))) return await block(interaction, '등록되지 않음', null)

    await add(대상, 'exp', 수치)
    await interaction.editReply('✅')
  }
  @Slash({ description: '[관리자 전용] 체력을 설정합니다.', name: '체력' })
  @defer
  async 체력(
    @SlashOption({
      description: '더하려면 양수로, 빼려면 음수로 입력해주세요.',
      name: '수치',
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    수치: number,
    @SlashOption({
      description: '설정할 대상입니다.',
      name: '대상',
      required: true,
      type: ApplicationCommandOptionType.User,
    })
    대상: GuildMember,

    interaction: CommandInteraction
  ) {
    if (!(await isAdmin(interaction.member as GuildMember))) return await block(interaction, '관리자가 아님', null)
    if (!(await isUser(대상))) return await block(interaction, '등록되지 않음', null)

    await add(대상, 'hp', 수치)
    await interaction.editReply('✅')
  }
  @Slash({ description: '[관리자 전용] 재화를 설정합니다.', name: '재화' })
  @defer
  async 재화(
    @SlashOption({
      description: '더하려면 양수로, 빼려면 음수로 입력해주세요.',
      name: '수치',
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    수치: number,
    @SlashOption({
      description: '설정할 대상입니다.',
      name: '대상',
      required: true,
      type: ApplicationCommandOptionType.User,
    })
    대상: GuildMember,

    interaction: CommandInteraction
  ) {
    if (!(await isAdmin(interaction.member as GuildMember))) return await block(interaction, '관리자가 아님', null)
    if (!(await isUser(대상))) return await block(interaction, '등록되지 않음', null)

    await add(대상, 'r', 수치)
    await interaction.editReply('✅')
  }
}
