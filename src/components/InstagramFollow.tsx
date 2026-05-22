import { motion, useReducedMotion } from 'framer-motion';
import { useSiteContent } from '../lib/content';

type Props = {
  className?: string;
};

const PROFILE_URL = 'https://instagram.com/brie_o_graphy';

export default function InstagramFollow({ className = '' }: Props) {
  const reduce = useReducedMotion();
  const c = useSiteContent();
  const username = c('instagram_username', 'brie_o_graphy');
  const followers = c('instagram_followers', '478');
  const profileUrl = c('instagram_profile_url', PROFILE_URL);

  return (
    <motion.a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduce ? false : { y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
      className={`group flex items-center gap-3 sm:gap-4 rounded-full bg-[#1a1a1a] pl-2.5 pr-4 py-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.45)] no-underline ${className}`}
    >
      <img
        src="/brie-avatar.jpg"
        alt="brie_o_graphy"
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover flex-shrink-0 border-2 border-[#333]"
        draggable={false}
      />

      <div className="flex flex-col mr-2 sm:mr-3 leading-tight">
        <span className="text-white font-bold text-sm sm:text-base tracking-tight">
          {username}
        </span>
        <span className="text-[#a0a0a0] font-normal text-xs sm:text-sm">
          @{username}
        </span>
        <span className="text-[#737373] font-normal text-[0.7rem] sm:text-xs">
          {followers} followers
        </span>
      </div>

      <span className="flex items-center justify-center rounded-full h-9 sm:h-10 w-[110px] sm:w-[124px] flex-shrink-0 bg-[#0095f6] text-white font-bold text-sm sm:text-[0.95rem] transition-[filter,transform] duration-200 group-hover:brightness-110 group-active:scale-95">
        Follow
      </span>
    </motion.a>
  );
}
