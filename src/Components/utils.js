export const unifyString = string => (
    string
      .toLowerCase()
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
  )