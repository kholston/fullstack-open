export const includedIn = (set, object) => {
  set.map(p => p.id).includes(object.id)
}