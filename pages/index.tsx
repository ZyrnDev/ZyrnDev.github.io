// import Image from 'next/image';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Box, Center, Heading } from '@chakra-ui/react';
import Description from '@components/description';
import { Link } from '@components/core';

const meta: MetaOptions = {
  title: "Home",
  description: "zyrn.dev's offical website for all our projects, products and services.",
};

export default function Home() {
  return (
    <Layout meta={meta}>
      <Heading as="h1" size="4xl" m="0.83rem 0">
        Welcome to <Link href="https://www.example.com" isText>example_site!</Link>
      </Heading>
      <Description as="h2" size="lg">
        making loveable software together
      </Description>
    </Layout>
  )
}
