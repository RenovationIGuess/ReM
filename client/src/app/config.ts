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

export const academicLevel: {
  [key in string]: string
} = {
  'Mầm non': 'Mầm non',
  'Tiểu học': 'Tiểu học',
  'Trung học cơ sở': 'Trung học cơ sở',
  'Trung học phổ thông': 'Trung học phổ thông',
  'Lao động': 'Lao Động',
  'Nghỉ hưu': 'Nghỉ hưu'
}
