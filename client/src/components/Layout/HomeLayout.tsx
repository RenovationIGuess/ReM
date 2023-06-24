import React from 'react'
import Sidebar from './Sidebar'
import { ToastContainer } from 'react-toastify'
import { AnimatePresence, motion } from 'framer-motion'

type PropsType = {
  children: React.ReactNode
}

const variants = {
  hidden: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
}

const HomeLayout = ({ children }: PropsType) => {
  return (
    <AnimatePresence
      initial={true}
      onExitComplete={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 })
        }
      }}
    >
      <div className="flex h-screen w-screen shadow-md">
        <ToastContainer autoClose={1500} style={{ fontSize: '16px' }} />
        <Sidebar />
        <div className="relative h-full grow overflow-y-auto bg-neutral-3 p-3">
          <motion.div
            className="h-max"
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5, type: 'easeOut' }}
          >
            {children}
          </motion.div>
          {/* <p className="text-end text-sm opacity-30">© 2023 KTPM Team. All Rights Reserved.</p> */}
        </div>
      </div>
    </AnimatePresence>
  )
}

export default HomeLayout
