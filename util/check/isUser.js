import query from '../query.js';
export default async function isUser(member) {
    const res = (await query(`select * from user_data where userid = "${member.id}"`));
    return res.length !== 0;
}
