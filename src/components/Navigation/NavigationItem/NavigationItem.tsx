import {
  ListItemButton,
  type ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

interface Props extends ListItemButtonProps {
  title: string
  href: string
  icon?: ReactNode
}

export default function NavItem({
  title,
  href,
  icon,
  ...props
}: Props): ReactElement {
  const { asPath } = useRouter()
  return (
    <Link passHref href={href} legacyBehavior>
      <StyledNavItem disableGutters selected={asPath === href} {...props}>
        {icon != null && <StyledNavItemIcon>{icon}</StyledNavItemIcon>}
        <ListItemText
          primary={title}
          primaryTypographyProps={{ noWrap: true }}
        />
      </StyledNavItem>
    </Link>
  )
}
