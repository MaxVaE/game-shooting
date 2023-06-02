import clsx from 'clsx'
import './ButtonSend.css'

interface Props {
  onSend: () => void
  title?: string
  className?: string
}

export const ButtonSend = ({ onSend: handleSend, title, className }: Props) =>
  <button title={title} className={clsx('button-send', className)} onClick={handleSend}>
    <svg
      viewBox='0 0 24 24'
      height='24'
      width='24'
      preserveAspectRatio='xMidYMid meet'
      version='1.1'
      x='0px'
      y='0px'
      enableBackground='new 0 0 24 24'
      xmlSpace='preserve'
    >
      <path fill='#54656f' d='M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z' />
    </svg>
  </button>
