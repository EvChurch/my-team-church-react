import { Slide, type SlideProps } from '@mui/material'
import { forwardRef } from 'react'

const SlideUp = forwardRef<unknown, SlideProps>(function SlideUp(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default SlideUp
