'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { signOut } from '@/lib/actions/auth.action'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  IconButton,
  useMediaQuery,
  Theme
} from '@mui/material'
import {
  Pets as CatIcon,
  AccountCircle as UserIcon,
  ExitToApp as LogoutIcon,
  Dashboard as DashboardIcon,
  Assignment as InterviewIcon
} from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import CircularProgress from '@mui/material/CircularProgress'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button
      component={Link}
      href={href}
      sx={{
        color: isActive ? 'common.white' : grey[400],
        bgcolor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.05)'
        },
        transition: 'all 0.2s ease',
        borderRadius: 2,
        mx: 0.5
      }}
    >
      {children}
    </Button>
  )
}

interface ProfileDropdownProps {
  user: {
    name: string
    email: string
  } | null
}

const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await signOut()
      router.push('/sign-in')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      handleClose()
      setIsLoading(false)
    }
  }

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          gap: 1,
          color: grey[400],
          '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
        }}
      >
        <UserIcon sx={{ fontSize: 24 }} />
        <Typography variant="body2" sx={{ color: 'inherit' }}>
          {user?.name || 'Profile'}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'grey.900',
              border: '1px solid',
              borderColor: 'divider',
              width: 280,
              mt: 1.5,
              overflow: 'visible'
            }
          }
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            Signed in as
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'common.white' }}>
            {user?.email || 'Loading...'}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={handleLogout}
          disabled={isLoading}
          sx={{
            color: 'error.main',
            '&:hover': {
              bgcolor: 'error.dark',
              color: 'common.white'
            }
          }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <LogoutIcon fontSize="small" />
            )}
          </ListItemIcon>
          {isLoading ? 'Signing out...' : 'Sign Out'}
        </MenuItem>
      </Menu>
    </>
  )
}

interface NavbarProps {
  user: {
    name: string
    email: string
  } | null
}

export const Navbar = ({ user }: NavbarProps) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'rgba(25, 25, 35, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ maxWidth: 1280, mx: 'auto', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          <Link href="/" passHref>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
              <CatIcon sx={{ color: 'common.white', fontSize: 32 }} />
              <Typography
                variant="h6"
                sx={{
                  background: 'linear-gradient(45deg, #9f7aea 30%, #6b46c1 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Appassigment
              </Typography>
            </Box>
          </Link>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
              <NavLink href="#">
                <InterviewIcon sx={{ fontSize: 20, mr: 1 }} />
                DO something
              </NavLink>
              <NavLink href="#">
                <DashboardIcon sx={{ fontSize: 20, mr: 1 }} />
                DO something else
              </NavLink>
            </Box>
          )}
        </Box>

        <ProfileDropdown user={user} />
      </Toolbar>
    </AppBar>
  )
}