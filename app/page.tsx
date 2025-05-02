import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import {
  PlayArrow,
  MilitaryTech,
  AutoAwesome,
  Group,
  Castle,
  Whatshot,
  Visibility,
  Spa,
  FlashOn,
  Public,
} from "@mui/icons-material";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        color: "white",
        pt: "64px",
      }}
    >
      <Navbar user={user} />

      <Container maxWidth="lg">
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 8 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                fontWeight: 900,
                background: "linear-gradient(45deg, #e94560 30%, #ff6b6b 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textTransform: "uppercase",
                letterSpacing: 2,
                mb: 2,
              }}
            >
              Eternal Quest
            </Typography>

            <Typography variant="h6" sx={{ mb: 3 }}>
              Embark on an epic journey through shattered realms. Forge alliances,
              master arcane arts, and confront ancient evils!
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                sx={{
                  bgcolor: "#e94560",
                  '&:hover': {
                    bgcolor: "#ff6b6b",
                    transform: "translateY(-2px)",
                    boxShadow: "0 0 20px rgba(233,69,96,0.5)",
                  },
                  transition: "all 0.3s",
                  px: 3,
                  py: 1.2,
                  fontSize: "1rem",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Start Quest
              </Button>

              <Button
                variant="outlined"
                startIcon={<MilitaryTech />}
                sx={{
                  color: "#e94560",
                  borderColor: "#e94560",
                  '&:hover': {
                    bgcolor: "rgba(233,69,96,0.1)",
                    borderColor: "#ff6b6b",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s",
                  px: 3,
                  py: 1.2,
                  fontSize: "1rem",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Leaderboard
              </Button>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <Avatar
              sx={{
                width: { xs: 160, sm: 200 },
                height: { xs: 160, sm: 200 },
                bgcolor: "rgba(233,69,96,0.2)",
                mx: "auto",
                mb: 2,
              }}
            >
              <Public sx={{ fontSize: { xs: "4rem", sm: "6rem" }, color: "#e94560" }} />
            </Avatar>
            <Chip
              label="New Season!"
              color="secondary"
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: "0.9rem",
                fontWeight: 700,
                transform: "rotate(5deg)",
              }}
            />
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 8, py: 6 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 900 }}>
          Features
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          {[
            {
              icon: <AutoAwesome fontSize="large" />, title: "Unique Classes", text:
                "Choose from 12 mystical classes with evolving skill trees",
            },
            {
              icon: <Group fontSize="large" />, title: "Guild Battles", text:
                "Join massive 100v100 territory wars with epic rewards",
            },
            {
              icon: <Castle fontSize="large" />, title: "Dungeon Raids", text:
                "Conquer dynamic dungeons with changing layouts and bosses",
            },
          ].map((feature, index) => (
            <Card
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s",
                '&:hover': {
                  transform: "translateY(-5px)",
                  boxShadow: "0 0 20px rgba(233,69,96,0.3)",
                },
                textAlign: "center",
              }}
              key={index}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: "#e94560",
                    width: 60,
                    height: 60,
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2">{feature.text}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 900 }}>
          Choose Your Class
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 4,
          }}
        >
          {[
            { name: "Pyromancer", icon: <Whatshot />, color: "#ff6b6b" },
            { name: "Spirit Archer", icon: <Spa />, color: "#4CAF50" },
            { name: "Shadow Blade", icon: <Visibility />, color: "#9C27B0" },
            { name: "Stormcaller", icon: <FlashOn />, color: "#2196F3" },
          ].map((cls, index) => (
            <Card
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                textAlign: "center",
                transition: "all 0.3s",
                '&:hover': {
                  transform: "translateY(-8px)",
                  boxShadow: `0 0 20px ${cls.color}40`,
                },
              }}
              key={index}
            >
              <CardContent>
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: cls.color,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  {cls.icon}
                </Avatar>
                <Typography variant="h6">{cls.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}