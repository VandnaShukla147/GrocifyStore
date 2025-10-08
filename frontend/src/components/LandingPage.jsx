import React from 'react'
import { motion } from 'framer-motion'

export default function LandingPage() {
  return (
    <>
      <div className='LandingPage'>
        <div className="LandingCon">

          {/* Heading */}
          <motion.h1
            className='Lheading'
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Enjoy healthy getting fresh grocery
          </motion.h1>

          {/* Quote Section */}
          <motion.div
            className="LQ"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className='LQ1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-quote fQ" viewBox="0 0 16 16">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Z" />
              </svg>
              <p>
                Shop fresh, eat well, and save more with our online grocery store.
                Discover the best deals and quality products right at your fingertips!
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-quote sQ" viewBox="0 0 16 16">
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Z" />
              </svg>
            </div>
            <motion.div
              className='LQ2'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <div className="landingFeedBack">
                <div className="ProfilePhoto">
                  <img src="P1.jpg" alt="..." className='profileL' />
                  <img src="P2.jpg" alt="..." className='profileL' id="p2" />
                  <img src="P3.jpg" alt="..." className='profileL' id="p3" />
                </div>
                <div className="Lrating">
                  4.5 <span>⭐</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Images Section */}
          <motion.div
            className="LImagesBox"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.div
              className="LImagesBox1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="LItems">
                <div className="L1itemB1">
                  <p>Shop</p>
                </div>
                <img className="L1itemB2" src="./I1.jpg" alt="..." />
              </div>
              <div className="LItems">
                <img className="L1itemB3" src="./I3.jpg" alt="..." />
                <img className="L1itemB4" src="./I2.jpg" alt="..." />
              </div>
            </motion.div>

            <motion.div
              className="LImagesBox2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <img src="./I4.jpg" alt="..." className='LImgM' />
            </motion.div>

            <motion.div
              className="LImagesBox3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="LItems">
                <img className="L1itemB3" src="./I5.jpg" alt="..." />
                <img className="L1itemB4" src="./I6.jpg" alt="..." />
              </div>
              <div className="LItems">
                <img className="L1itemB2" src="./I7.jpg" alt="..." />
                <div className="L1itemRB1">
                  <p>Grocery</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
