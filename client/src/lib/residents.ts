import axiosClient from '~/app/axiosClient'

export const getResidentsByPage = async ({ page, offset }: Page) => {
  const response = await axiosClient.get(`/nhan-khau?page=${page}&limit=${offset}`)
  if (!response) return

  const residents = (response.data.data as IResident[]).reduce(
    (acc: Map<string, IResident>, resident: IResident) => {
      acc.set(resident.id.toString(), resident)

      return acc
    },
    new Map<string, IResident>()
  )

  return { data: residents, total: response.data.total }
}

export const getResidentById = async (id: string) => {
  const response = await axiosClient.get(`/nhan-khau/${id}`)

  if (!response) return

  return response.data
}

export const createResident = async (
  resident: IResident,
  residentHousehold: ResidentHousehold,
  cmt: IdentificationType,
  isMoiSinh?: boolean
) => {
  let queryString = '/nhan-khau/create'
  let ghiChu = resident.ghiChu
  if (isMoiSinh) {
    queryString = '/nhan-khau/create?moiSinh=true'
    ghiChu = 'Mới sinh'
  }

  const response = await axiosClient.post('/nhan-khau/create', {
    idHoKhau: residentHousehold.idHoKhau,
    quanHeVoiChuHo: residentHousehold.quanHeVoiChuHo,
    nhanKhau: {
      ...resident,
      ghiChu
    },
    cmt: {
      ...cmt
    }
  })

  if (!response) return

  return response.data
}

export const searchResident = async (searchValue: string) => {
  const response = await axiosClient.get(`/nhan-khau?hoTen=${searchValue}`)

  if (!response) return

  return response.data.data as IResident[]
}

export const khaiTuResident = async (id: string, khaiTuData: KhaiTuData) => {
  const response = await axiosClient.post(`/nhan-khau/${id}/khai-tu`, khaiTuData)

  if (!response) return

  return response.data
}

export const editResident = async (resident: IResident) => {
  const response = await axiosClient.put(`/nhan-khau/${resident.id}/edit`, resident)

  if (!response) return

  return response.data
}

export const searchHouseholdLeader = async (searchValue: string) => {
  const response = await axiosClient.get(`/chu-ho?hoTen=${searchValue}`)

  if (!response) return

  return response.data as IHousehold[]
}
