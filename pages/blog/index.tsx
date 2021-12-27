import React, { FC } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Box, Container, Heading, Flex, Spacer, Text, Tag, useColorModeValue } from '@chakra-ui/react';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Link } from '@components/core';
import { getSortedPosts, Post } from '@/lib/posts';
import TagLine from '@/components/tagline';
import { PostTitle } from '@/pages/blog/[filename]';

const meta: MetaOptions = {
  title: "Blog",
  description: "The official blog from zyrn.dev on my projects, products and services.",
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getSortedPosts();
  return {
    props: {
      posts,
    }
  }
}



const PostPreview: FC<Post> = ({ filename, content, preview }) => {
  return (
    <Text>
      {preview ?? "Preview Unavailable"}
      <Link href={`/blog/${filename}`} m="0 0.5rem">
        <Tag>Read More</Tag>
      </Link>
    </Text>
  );
};

const PostDescription: FC<Post> = ({ children, ...post }) => {

  return (
    <Box as="article" textAlign="start" background={useColorModeValue("gray.100", "gray.900")} p="0.5em 1em" borderRadius="1em" margin="0.5em 0" >
      <PostTitle {...post} isPreview />
      <PostPreview {...post} />
    </Box>
  );
};

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout meta={meta}>
      <Container maxW="container.lg">
        <Heading as="h1" size="4xl">Blog Posts</Heading>
        {posts.map(post => <PostDescription key={post.title} {...post} />)}
      </Container>
    </Layout>
  )
};
  
export default Blog;