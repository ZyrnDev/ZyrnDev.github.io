// import Image from 'next/image';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Box, Center, Heading } from '@chakra-ui/react';
import TagLine from '@/components/tagline';
import { Link } from '@components/core';
import { NextPage, GetStaticProps } from 'next';
import env from '@/lib/env';
import { Code } from '@chakra-ui/react';
import { Grid } from '@chakra-ui/react';
import { GridItem } from '@chakra-ui/react';
import { FC } from 'react';

const meta: MetaOptions = {
  title: "Information",
  description: "zyrn.dev's information / stats page.",
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      version: env.version,
      time: (new Date()).getTime()
    },
  };
}

type BuildStats = {
  version: string;
  time: number;
}

const Stats: FC<{ stats: string[][]}> = ({ stats }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)">
      {stats.map(([key, value]) => (
        <Stat key={key} name={key} value={value} />
      ))}
    </Grid>
  );
}

const Stat: FC<{name: string, value: string}> = ({ name, value }) => {
  return (
    <>
      <GridItem>
        <TagLine as="h2" size="md" textAlign="center" m="0">
          {name}:
        </TagLine>
      </GridItem>
      <GridItem>
        <Code size="lg">{value}</Code>
      </GridItem>
    </>
  );
}

const Info: NextPage<BuildStats> = (buildStats) => {
  return (
    <Layout meta={meta}>
      <Heading as="h1" size="4xl" m="0.83rem 0">
        Information
      </Heading>
      <Stats stats={[
        ["Build Commit", buildStats.version],
        ["Build Time", (new Date(buildStats.time)).toLocaleString("en-AU", {timeZone: "Australia/Sydney"}) + " (AEST)"],

      ]} />
    </Layout>
  )
}
export default Info;