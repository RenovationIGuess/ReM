import { PlusOutlined } from '@ant-design/icons'
import { Button, Empty, Input, Modal } from 'antd'
import { useState } from 'react'

const AddResidentsModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="flex items-center justify-center gap-2 text-lg text-primary"
        onClick={() => setIsOpen(true)}
      >
        <PlusOutlined /> Thêm nhân khẩu
      </button>
      <Modal
        title={<p className="text-lg">Thêm nhân khẩu</p>}
        footer={[<></>]}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        width={800}
      >
        <div className="flex flex-col items-center justify-start py-2">
          <Input.Search placeholder="Nhập tên nhân khẩu" className="w-full" />
          <Empty className="py-8" />
          <Button type="primary" ghost className="">
            Thêm mới nhân khẩu
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default AddResidentsModal
