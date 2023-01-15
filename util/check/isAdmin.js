export default async function isAdmin(member) {
    return !!member.roles.cache.get('953309071468007494');
    // return true // debug
}
