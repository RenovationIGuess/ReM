import { Button, Modal } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { FC } from 'react'

interface PhanThuongDetailModalProps {
    open: boolean
    onOk: () => void
    onCancel: () => void
    phan_thuong: IPhanThuongThongKe | undefined
}

export const PhanThuongDetailModal: FC<PhanThuongDetailModalProps> = ({ open, onOk, onCancel, phan_thuong }) => {
    const capHoc = phan_thuong?.capHocType
    const thanhTichHocTap = phan_thuong?.thanhTichHocTap
    return (
        <>
            <Modal title="Chi tiết phần thưởng" open={open} onOk={onOk} onCancel={onCancel}>
                <p>{`Cấp học: ${thanhTichHocTap === 1 ? "Tiểu học" : thanhTichHocTap === 2 ? "Trung học" : thanhTichHocTap === 3 ? "Cấp 3" : "Không có thành tích"}`}</p>
                <p>{`Thành tích học tập: ${capHoc === 1 ? "Tiên tiến" : capHoc === 2 ? "Giỏi" : capHoc === 3 ? "Khác" : "Không có thành tích"}`}</p>
                <Title level={5}>Các phần quà được nhận: </Title>
                {phan_thuong?.items.map((item) => (
                    <>
                        <p>{`${item.name}: ${item.pivot.soLuong}`}</p>
                    </>
                ))}
            </Modal>
        </>
    );
}
