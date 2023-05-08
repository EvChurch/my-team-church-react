import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { type ReactElement } from 'react'

import management from '../../../public/images/illustrations/illustration_17.svg'
import train from '../../../public/images/illustrations/illustration_3.svg'
import teamwork from '../../../public/images/illustrations/illustration_4.svg'
import centralized from '../../../public/images/illustrations/illustration_5.svg'
import pathways from '../../../public/images/illustrations/illustration_9.svg'
import EarlyAccess from '../EarlyAccess'
import Logo from '../Logo'

export default function Home(): ReactElement {
  return (
    <>
      <Box component="section" bgcolor="primary.main" py={5}>
        <Container>
          <Box display="flex" justifyContent="flex-end">
            <Link passHref href="/dashboard" legacyBehavior>
              <Button
                startIcon={<LoginRoundedIcon />}
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Login
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
      <Box component="section" py={20} bgcolor="primary.main">
        <Container>
          <Stack
            direction={{ sx: 'column', md: 'row' }}
            alignItems="center"
            spacing={2}
          >
            <Box flex={1}>
              <Logo
                sx={{
                  backgroundColor: 'white',
                  padding: 2,
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  mb: 4,
                }}
              />
              <Typography
                variant="h1"
                component="h1"
                color="white"
                gutterBottom
              >
                My Team
              </Typography>
              <Typography variant="h3" component="h2" color="white">
                Identify, equip, and unleash people to use their skills, gifts,
                and abilities for the spread of the gospel.
              </Typography>
            </Box>
            <Box flex={1} display="flex" justifyContent="center">
              <Image alt="Teamwork" src={teamwork} />
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box component="section" py={10}>
        <Container maxWidth="xs">
          <EarlyAccess />
        </Container>
      </Box>
      <Divider />
      <Box component="section" py={5}>
        <Container>
          <Stack
            direction={{ sx: 'column', md: 'row' }}
            alignItems="center"
            spacing={2}
          >
            <Box flex={1} display="flex" justifyContent="center">
              <Image alt="Pathways" src={pathways} />
            </Box>
            <Box flex={1}>
              <Typography variant="h4" component="h2" gutterBottom>
                Build strong &amp; clear leadership development pathways
              </Typography>
              <Typography gutterBottom>
                The experts tell us that 70% of leadership is generic and
                transferable. That means if you can build a simple course to
                train your team members to be team leaders and your team leaders
                to be leaders of leaders, you can leave the other 30% of team
                training to the specific team leader. My Team gives you a
                platform to build your own leadership training and deliver to
                your church - using the positions in your current Church
                Managing Software. You won&apos;t need to re-set up who serves
                where, you wont need to maintain two sets of serving positions,
                you won&apos;t need to work out who to deliver what training to.
                Simply set the training required for every position in your
                church and you are away!
              </Typography>
              <Typography pl={2} component="ul">
                <li>Track team members training progress</li>
                <li>Coach and track your team leaders growth</li>
                <li>Identify leaders who need help</li>
                <li>Identify leaders who can coach other leaders</li>
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box component="section" py={5} bgcolor="#fcfcfc">
        <Container>
          <Stack
            direction={{ sx: 'column', md: 'row' }}
            alignItems="center"
            spacing={2}
          >
            <Box flex={1}>
              <Typography variant="h4" component="h2" gutterBottom>
                Focus on great people development &amp; management
              </Typography>
              <Typography gutterBottom>
                Imagine every team leader being able to log their positions
                vacant, recruit their own team members, and work with each
                person so set clear and effective next steps in their training
                process.
              </Typography>
              <Typography pl={2} component="ul">
                <li>Church-wide positions vacant dashboard</li>
                <li>
                  Simple reporting of who is being recruited to what positions
                  by who
                </li>
                <li>Log each persons serving history</li>
                <li>
                  Manage position commitments (ie the length of time people have
                  committed to a position)
                </li>
                <li>
                  Reminders to have recommitment conversations with team members
                  who are approaching the end of their term
                </li>
                <li>
                  Job description builder: build and collate all your job
                  descriptions across your church
                </li>
                <li>Set training goals for each responsibility area</li>
              </Typography>
            </Box>
            <Box flex={1} display="flex" justifyContent="center">
              <Image alt="Management" src={management} />
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box component="section" py={5}>
        <Container>
          <Stack
            direction={{ sx: 'column', md: 'row' }}
            alignItems="center"
            spacing={2}
          >
            <Box flex={1} display="flex" justifyContent="center">
              <Image alt="Centralized System" src={centralized} />
            </Box>
            <Box flex={1}>
              <Typography variant="h4" component="h2" gutterBottom>
                Have a single place to document your systems &amp; processes
              </Typography>
              <Typography gutterBottom>
                My Team collates all your job descriptions, training modules and
                provides custom built checklists for every position in your
                church. All your team members need to do is open the app on
                their phone, choose which of their positions they wish to serve
                in. Then, right there in app, they have a custom checklist their
                leader has created for that position, detailing the process, and
                recording when they do each step and how long each step takes.
              </Typography>
              <Typography pl={2} component="ul">
                <li>Job Descriptions</li>
                <li>Custom Checklists for every position</li>
                <li>
                  In app training both on the position specific tasks and the
                  general leadership levels required for that position
                </li>
                <li>
                  Customisable training library created by you and your team
                  leaders, deployable in app, and via drip feed emails
                </li>
                <li>
                  Simple training builder with multiple choice and long form
                  answers
                </li>
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box component="section" py={5} bgcolor="#fcfcfc">
        <Container>
          <Stack
            direction={{ sx: 'column', md: 'row' }}
            alignItems="center"
            spacing={2}
          >
            <Box flex={1}>
              <Typography variant="h4" component="h2" gutterBottom>
                Equip your leaders to manage and train their teams
              </Typography>
              <Typography gutterBottom>
                A system so simple your leaders can run, yet so powerful you can
                see where every person is, how they are tracking in their
                position, what their next step goals are, and what area&apos;s
                of godliness and competency they are working on.
              </Typography>
              <Typography pl={2} component="ul">
                <li>
                  Auto reminders for your leaders to meet with team members
                </li>
                <li>
                  Simple customisable directions for your team leaders
                  1:1&apos;s
                </li>
                <li>
                  Leadership dashboard to track how your leaders are leading
                </li>
                <li>
                  Allows you to get out of the way, and your teams to do what
                  they do best
                </li>
              </Typography>
            </Box>
            <Box flex={1} display="flex" justifyContent="center">
              <Image alt="Train" src={train} />
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box bgcolor="primary.dark" py={2} textAlign="center">
        <Container>
          <Typography color="white">
            Copyright © {new Date().getFullYear()} Auckland Evangelical Church
            Trust
          </Typography>
        </Container>
      </Box>
    </>
  )
}
