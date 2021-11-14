import React, { FC } from "react";
import { Box, BoxProps, ButtonGroup, Container, Flex, Heading } from '@chakra-ui/react';
import Layout from '@components/layouts/centered';
import { MetaOptions } from "@components/meta";
import Description from '@components/description';
import { GithubLink, GitlabLink, WebsiteLink, DiscordLink, EmailLink } from "@components/social_links";

interface ProfileOptions {
  name: string;
  description: string;
  email?: string;
  website?: {
    name: string;
    url: string;
  },
  github?: string;
  gitlab?: string;
  discord?: {
    tag: string;
    user_id: string;
  }
}

const profiles: ProfileOptions[] = [
  {
    name: "Mitch | Zyrn",
    description: "It's ugly, but it works",
    email: "mitch@zyrn.dev",
    github: "ZyrnDev",
    gitlab: "Zyrn",
    website: {
      name: "Zyrn.Dev",
      url: "https://zyrn.dev",
    },
    discord: {
      tag: "Zyrn#0001",
      user_id: "416841964013748234",
    },
  },
];

const meta: MetaOptions = {
  title: "About Us",
  description: "About me: zyrn! Find out about who I am and my mission.",
};

const description = "My name is Mitchell 'Zyrn' Lee, and I am a 3rd year software engineering student. I'm passionate about building software and have been doing just that for over a decade. I am interested in low level systems programming, development operations, robust and scalable web applications as well as building simple, easy to use abstractions.";
  export default function AboutUs() {
  return (
    <Layout meta={meta}>
      <Container maxW="container.lg">
        <Heading as="h1" size="4xl">
        Who am I?
        </Heading>
        <Description as="h2" size="md">
          {description}
        </Description>
          
        <Flex as="section" wrap="wrap" textAlign="center">
          {profiles.map((profile) => (<Profile key={profile.name} {...profile} />))}
        </Flex>
      </Container>
    </Layout>
  )
}

const Profile: FC<BoxProps & ProfileOptions > = ({ name, description, email, github, gitlab, website, discord, children, ...props }) => (
  <Box p="1rem" minW="15rem" m="auto" {...props}>
    <Heading as="h2" size="xl">{name}</Heading>
      
    <Description as="h3" size="md">&quot;{description}&quot;</Description>
    <ButtonGroup>
      {email && <EmailLink email={email} />}
      {website && <WebsiteLink {...website} />}
      {github && <GithubLink path={github} />}
      {gitlab && <GitlabLink path={gitlab} />}
      {discord && <DiscordLink {...discord} />}
    </ButtonGroup>
    {children}
  </Box>
);