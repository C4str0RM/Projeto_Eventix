export async function verificarAdmin(usuario) {
  return usuario?.user_metadata?.isAdmin === true;
}