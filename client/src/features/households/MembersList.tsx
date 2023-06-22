import { DeleteOutlined, WarningFilled } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import React from 'react'
import { showDeleteConfirm } from '~/components/ConfirmModal'

type PropsType = {
  membersList: IResident[]
}

function MembersList({ membersList }: PropsType) {
  return (
    <>
      {membersList.map(member => (
        <div key={member.id} className="flex w-full flex-row items-center justify-between py-3">
          <div className="flex flex-row items-center gap-4">
            <Avatar size={40} src="https://i.pravatar.cc/150?img=1" />
            <p className="text-lg">
              {member.hoTen} - {member.maNhanKhau}
            </p>
          </div>
          <Button
            type="link"
            danger
            ghost
            icon={<DeleteOutlined />}
            onClick={() =>
              showDeleteConfirm({
                title: 'Bạn có chắc chắn muốn xóa nhân khẩu này không?',
                icon: <WarningFilled />,
                onOk: () => {}
              })
            }
          />
        </div>
      ))}
    </>
  )
}

export default MembersList
