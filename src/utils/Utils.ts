export const capitalize = (_: string) => {
  return _.charAt(0).toUpperCase() + _.slice(1).toLowerCase()
}

export const slugify = (_: string) =>
  _.replaceAll(/[éèê]/g, 'e')
    .replaceAll(/\(.*?\)/g, '')
    .replaceAll(/[àâ]/g, 'a')
    .replaceAll(/[^\sa-zA-Z0-9_]/g, '')
    .split(/\s/)
    .map(capitalize)
    .join('')
