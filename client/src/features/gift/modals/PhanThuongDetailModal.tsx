import { Button, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { FC } from 'react'

interface PhanThuongDetailModalProps {
    open: boolean,
    onOk: () => void,
    onCancel: () => void
    phan_thuong: IPhanThuongThongKe | undefined
}

export const PhanThuongDetailModal: FC<PhanThuongDetailModalProps> = ({ open, onOk, onCancel, phan_thuong }) => {
    return (
        <>
            <Modal title="Chi tiết phần thưởng" open={open} onOk={onOk} onCancel={onCancel}>
                {phan_thuong?.items.map((item) => (
                    <Title key={item.id} level={5}>{`${item.name}: ${item.pivot.soLuong}`}</Title>
                ))}
            </Modal>
        </>
    );
}