import React from 'react'
import Sidebar from './Sidebar'
import { AnimatePresence, motion } from 'framer-motion'

type PropsType = {
  children: React.ReactNode
}

const variants = {
  hidden: { opacity: 0, x: 0, y: -20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 }
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
      <div className="flex h-screen w-screen items-center justify-center shadow-md">
        <Sidebar />
        <motion.div
          className="relative h-full basis-5/6 overflow-y-auto bg-bgDefault p-3"
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.6, type: 'easeInOut' }}
        >
          {children}
          {/* <p className="text-end text-sm opacity-30">© 2023 KTPM Team. All Rights Reserved.</p> */}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default HomeLayout
