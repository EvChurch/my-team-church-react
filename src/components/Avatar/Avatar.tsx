import { type AvatarProps, Avatar as MuiAvatar, Tooltip } from '@mui/material'
import { type ReactElement } from 'react'

const hRange = [0, 360]
const sRange = [50, 75]
const lRange = [25, 60]

function getHashOfTitle(title: string): number {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash)
  }
  hash = Math.abs(hash)
  return hash
}

function normalizeHash(hash: number, min: number, max: number): number {
  return Math.floor((hash % (max - min)) + min)
}

function titleToColor(title: string): string {
  const hash = getHashOfTitle(title)
  const h = normalizeHash(hash, hRange[0], hRange[1])
  const s = normalizeHash(hash, sRange[0], sRange[1])
  const l = normalizeHash(hash, lRange[0], lRange[1])
  return `hsl(${h}, ${s}%, ${l}%)`
}

function stringAvatar(
  title: string | undefined,
  sx?: AvatarProps['sx']
): AvatarProps {
  if (title == null) return {}

  const [firstName, lastName] = title.split(' ')

  return {
    sx: {
      ...sx,
      bgcolor: titleToColor(title),
    },
    children: `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`,
  }
}

interface Props extends AvatarProps {
  /** The name of contact */
  title?: string
  /** URL pointing to avatar image of contact */
  src?: string
}

/** Tooltip wrapped avatar with contact initials when no image */
export default function Avatar({ title, src, ...other }: Props): ReactElement {
  return (
    <Tooltip title={title} arrow>
      <MuiAvatar src={src} {...other} {...stringAvatar(title, other.sx)} />
    </Tooltip>
  )
}
