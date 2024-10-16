import { animationDefaultOptions } from '@/lib/utils'
import Lottie from 'react-lottie'
const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md: flex flex-col justofy-center items-center hidden duration-1000 transition-all">
        <Lottie
            isClickedToPauseDisabled={true}
            height={200}
            width={200}
            options={animationDefaultOptions}
        />
    </div>
  )
}

export default EmptyChatContainer