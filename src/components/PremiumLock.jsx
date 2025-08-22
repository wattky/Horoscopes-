
import { motion } from 'framer-motion'

export default function PremiumLock({ title, description, onUpgrade, preview=null }){
  return (
    <motion.div
      className="relative rounded-3xl p-6 bg-gradient-to-br from-fuchsia-700/40 via-indigo-800/40 to-sky-800/40
                 border border-white/15 backdrop-blur-xl shadow-[0_0_60px_rgba(167,139,250,0.35)]
                 overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      {/* blurred preview underneath */}
      {preview && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 blur-xl brightness-50">{preview}</div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50" />
        </div>
      )}

      {/* shimmer sweep */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ['-120%','120%'] }}
        transition={{ duration: 3.2, repeat: Infinity }}
      />

      <div className="relative z-10 text-center space-y-4">
        <motion.div
          className="text-5xl select-none"
          animate={{ scale: [1,1.15,1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >🔒</motion.div>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="opacity-80">{description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onUpgrade}
          className="relative px-6 py-3 rounded-full font-semibold text-white
                     bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 shadow-lg overflow-hidden"
        >
          <span className="relative z-10">✨ Upgrade to Premium ✨</span>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-120%','120%'] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.button>
      </div>
    </motion.div>
  )
}
