import React, { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Box, Container, Flex, Heading, Spacer, Text, useColorModeValue } from '@chakra-ui/react';
import { getPost, getPostPaths, Post } from '@/lib/posts';
import Layout from '@components/layouts/centered';
import TagLine from '@/components/tagline';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params?.filename as string)
  return {
    props: {
      ...post,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostPaths();
  return {
    paths,
    fallback: false
  }
}

export const PostTitle: FC<Post & { isPreview?: boolean }> = ({ filename, title, date, author, published, isPreview = false }) => {
  const titleSize = isPreview ? 'lg' : '2xl';
  const subTitleSize = isPreview ? 'sm' : 'md';
  const bottomMargin = "0.8rem";
  const textDecoration = isPreview ? 'underline' : 'none';
  return (
    <>
      <TagLine as="h1" size={titleSize} m="0.1em 0" textDecoration={textDecoration}>{ published || (<Text as="span" color="red">(Not Published) </Text>) }{title}</TagLine>
      <Flex align="center">
        <Heading as="h2" size={subTitleSize} m="0" mb={bottomMargin} colorScheme="gray">by {author}</Heading>
        <Spacer />
        <Heading as="time" size={subTitleSize} m="0" mb={bottomMargin} colorScheme="gray" dateTime={(new Date(date)).toISOString()}>{date}</Heading>
      </Flex>
    </>
  );
};

const Render: FC<Post> = ({ children, ...post }) => {
  const { title, content, preview } = post;
  return (
    <Layout meta={{ title: "Blog - " + title, description: preview }}>
      <Container as="article" maxW="container.lg" textAlign="start">
        <PostTitle {...post} />
        <Box id="blog-article" dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </Layout>
  );
};

export default Render;