import AntIconWrapper from './AntIconWrapper'
import type IconTypes from './IconTypes'

export default function LogoIcon({ size, className }: IconTypes) {
  return (
    <AntIconWrapper>
      <svg width={size} height={size} className={className} viewBox="0 0 124 124">
        <rect width="124" height="124" fill="#d9d9d9" rx="30.38" />
        <rect width="124" height="124" fill="#158af8" rx="30.38" />
        <g filter="url(#c)">
          <path
            fill="#fff"
            fillRule="evenodd"
            d="m26 48.135 31.079 24.173a8.67 8.67 0 0 0 10.642 0L98.8 48.135V82.8c0 1.38-.548 2.702-1.524 3.676A5.2 5.2 0 0 1 93.6 88H31.2a5.2 5.2 0 0 1-3.676-1.524A5.2 5.2 0 0 1 26 82.8z"
            clipRule="evenodd"
          />
        </g>
        <g filter="url(#d)">
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M98.8 41.236a5.2 5.2 0 0 1-2.007 4.069l-31.2 24.266a5.2 5.2 0 0 1-6.386 0l-31.2-24.266A5.2 5.2 0 0 1 26 41.235V41.2c0-1.38.548-2.702 1.524-3.676A5.2 5.2 0 0 1 31.2 36h62.4c1.38 0 2.702.548 3.676 1.524A5.2 5.2 0 0 1 98.8 41.2z"
            clipRule="evenodd"
          />
        </g>
      </svg>
    </AntIconWrapper>
  )
}
