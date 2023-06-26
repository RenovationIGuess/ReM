export const gender: {
  [key: number]: GenderType
} = {
  0: 'Khác',
  1: 'Nam',
  2: 'Nữ'
}

export const householdRelationship: {
  [key in HouseholdRelationshipType]: HouseholdRelationshipType
} = {
  Vợ: 'Vợ',
  Chồng: 'Chồng',
  Con: 'Con',
  Cháu: 'Cháu',
  Ông: 'Ông',
  Bà: 'Bà',
  Bố: 'Bố',
  Mẹ: 'Mẹ',
  Anh: 'Anh',
  Chị: 'Chị',
  Em: 'Em',
  'Phức tạp': 'Phức tạp'
}
