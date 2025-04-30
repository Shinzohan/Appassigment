import { getCurrentUser } from "@/lib/actions/auth.action"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Box, Container, Typography, Button, Stack, Grid, Card, CardContent, Avatar, Chip, List, ListItem, ListItemText, ListItemAvatar, Divider, LinearProgress } from '@mui/material'
import { PlayArrow, MilitaryTech, AutoAwesome, Group, Castle, Whatshot, Visibility, Public, Person, Spa, FlashOn } from '@mui/icons-material'

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: 'white',
        pt: '64px'
      }}
    >
      <Navbar user={user} />

      {/* Hero Section */}
      <Container maxWidth="xl">
        <Box sx={{ mt: 10, display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
          <Box sx={{ maxWidth: 600, flex: 1 }}>
            <Typography 
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '4rem' },
                fontWeight: 900,
                background: 'linear-gradient(45deg, #e94560 30%, #ff6b6b 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                letterSpacing: 4,
                mb: 2
              }}
            >
              Eternal Quest
            </Typography>

            <Typography variant="h5" sx={{ mb: 4, textShadow: '0 0 10px rgba(233,69,96,0.5)' }}>
              Embark on an epic journey through shattered realms. 
              Forge alliances, master arcane arts, and confront ancient evils!
            </Typography>

            <Stack direction="row" spacing={3} flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                sx={{
                  bgcolor: '#e94560',
                  '&:hover': { bgcolor: '#ff6b6b', transform: 'translateY(-2px)', boxShadow: '0 0 20px rgba(233,69,96,0.5)' },
                  transition: 'all 0.3s',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  mb: 2
                }}
              >
                Start Quest
              </Button>

              <Button
                variant="outlined"
                startIcon={<MilitaryTech />}
                sx={{
                  color: '#e94560',
                  borderColor: '#e94560',
                  '&:hover': { bgcolor: 'rgba(233,69,96,0.1)', borderColor: '#ff6b6b', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  mb: 2
                }}
              >
                Leaderboard
              </Button>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, minWidth: 300, position: 'relative', textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 200,
                height: 200,
                bgcolor: 'rgba(233,69,96,0.2)',
                mx: 'auto',
                mb: 2,
                '& .MuiSvgIcon-root': {
                  fontSize: '6rem',
                  color: '#e94560'
                }
              }}
            >
              <Public />
            </Avatar>
            <Chip
              label="New Season!"
              color="secondary"
              sx={{
                position: 'absolute',
                top: 0,
                right: 20,
                fontSize: '1rem',
                fontWeight: 700,
                transform: 'rotate(5deg)'
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ mt: 10, py: 8 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 900 }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          {[
            { icon: <AutoAwesome fontSize="large" />, title: 'Unique Classes', text: 'Choose from 12 mystical classes with evolving skill trees' },
            { icon: <Group fontSize="large" />, title: 'Guild Battles', text: 'Join massive 100v100 territory wars with epic rewards' },
            { icon: <Castle fontSize="large" />, title: 'Dungeon Raids', text: 'Conquer dynamic dungeons with changing layouts and bosses' }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                bgcolor: 'rgba(255,255,255,0.05)', 
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 0 25px rgba(233,69,96,0.3))' }
              }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ 
                    bgcolor: '#e94560', 
                    width: 60, 
                    height: 60, 
                    mb: 2,
                    mx: 'auto'
                  }}>
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h5" gutterBottom>{feature.title}</Typography>
                  <Typography variant="body1">{feature.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Character Classes Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 900 }}>
          Choose Your Class
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { name: 'Pyromancer', icon: <Whatshot />, color: '#ff6b6b' },
            { name: 'Spirit Archer', icon: <Spa />, color: '#4CAF50' },
            { name: 'Shadow Blade', icon: <Visibility />, color: '#9C27B0' },
            { name: 'Stormcaller', icon: <FlashOn />, color: '#2196F3' }
          ].map((cls, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                bgcolor: 'rgba(255,255,255,0.05)',
                textAlign: 'center',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 0 25px ${cls.color}40`
                }
              }}>
                <CardContent>
                  <Avatar sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: cls.color,
                    mx: 'auto',
                    mb: 2
                  }}>
                    {cls.icon}
                  </Avatar>
                  <Typography variant="h5">{cls.name}</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.random() * 100} 
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      mt: 2,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: cls.color
                      }
                    }} 
                  />
                  <Chip
                    label={`${Math.floor(Math.random() * 1000)} players`}
                    size="small"
                    sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.1)' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Leaderboard Preview */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card sx={{ bgcolor: 'rgba(255,255,255,0.05))', backdropFilter: 'blur(10px))' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <MilitaryTech sx={{ mr: 1, color: '#e94560' }} /> Top Players
            </Typography>
            <List>
              {[1, 2, 3, 4, 5].map((item) => (
                <ListItem key={item} sx={{ bgcolor: item % 2 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#e94560' }}>{item}</Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={`Player ${item}`} 
                    secondary={`Level ${item * 15} | ${item * 1250} XP`} 
                  />
                  <Chip label={`#${item}`} color="primary" />
                </ListItem>
              ))}
            </List>
            <Button 
              fullWidth 
              endIcon={<Visibility />}
              sx={{ mt: 2, color: '#e94560' }}
            >
              View Full Leaderboard
            </Button>
          </CardContent>
        </Card>
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        background: 'linear-gradient(45deg, #e94560 30%, #ff6b6b 90%)',
        py: 10,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 900 }}>
            Ready for Adventure?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Join millions of players worldwide in the ultimate anime RPG experience!
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Person />}
            sx={{
              bgcolor: 'white',
              color: '#e94560',
              px: 6,
              py: 1.5,
              fontSize: '1.2rem',
              '&:hover': { bgcolor: '#f0f0f0' }
            }}
          >
            Create Free Account
          </Button>
        </Container>
      </Box>
    </Box>
  )
}