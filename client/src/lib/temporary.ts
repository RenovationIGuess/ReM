import axiosClient from '~/app/axiosClient'

export const getTamTrusByPage = async ({ page, offset }: Page) => {
  const response = await axiosClient.get(`/tam-tru?page=${page}&limit=${offset}`)
  if (!response) return

  const residents = (response.data.data as ITamTru[]).reduce(
    (acc: Map<string, ITamTru>, resident: ITamTru) => {
      acc.set(resident.id.toString(), resident)

      return acc
    },
    new Map<string, ITamTru>()
  )

  return { data: residents, total: response.data.total }
}

export const getTamVangsByPage = async ({ page, offset }: Page) => {
  const response = await axiosClient.get(`/tam-vang?page=${page}&limit=${offset}`)
  if (!response) return

  const residents = (response.data.data as ITamVang[]).reduce(
    (acc: Map<string, ITamVang>, resident: ITamVang) => {
      acc.set(resident.id.toString(), resident)

      return acc
    },
    new Map<string, ITamVang>()
  )

  return { data: residents, total: response.data.total }
}
