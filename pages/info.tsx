// import Image from 'next/image';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Box, Center, Heading } from '@chakra-ui/react';
import TagLine from '@/components/tagline';
import { Link } from '@components/core';
import { NextPage, GetStaticProps } from 'next';
import env from '@/lib/env';

const meta: MetaOptions = {
  title: "Information",
  description: "zyrn.dev's information / stats page.",
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    version: env.version,
  };
}

const Info: NextPage<{ version: string }> = ({ version }) => {
  return (
    <Layout meta={meta}>
      <Heading as="h1" size="4xl" m="0.83rem 0">
        Information
      </Heading>
      <TagLine as="h2" size="lg">
        Current Version = &apos;{version}&apos;
      </TagLine>
    </Layout>
  )
}
export default Info;