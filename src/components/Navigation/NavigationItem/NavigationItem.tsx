import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactElement, type ReactNode } from 'react'

const StyledNavItem = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  '&.Mui-selected': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.selected,
    fontWeight: 'bold',
  },
}))

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

interface Props {
  title: string
  href: string
  icon: ReactNode
}

export default function NavItem({ title, href, icon }: Props): ReactElement {
  const pathname = usePathname()
  return (
    <Link passHref href={href} legacyBehavior>
      <StyledNavItem disableGutters selected={pathname === href}>
        <StyledNavItemIcon>{icon}</StyledNavItemIcon>
        <ListItemText disableTypography primary={title} />
      </StyledNavItem>
    </Link>
  )
}
