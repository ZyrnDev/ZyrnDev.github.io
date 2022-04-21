import React, { FC } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Box, Container, Heading, Flex, Spacer, Text, Tag, useColorModeValue } from '@chakra-ui/react';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Link } from '@components/core';
import { getSortedPosts, Post } from '@/lib/posts';
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



export const PostDescription: FC<Post> = ({ children, ...post }) => {
  const bgColour = useColorModeValue("gray.100", "gray.800");
  // const bgColour = "green.500";
  const background = { 
    position: "absolute", top: 0, left: 0, height: "100%", width: "100%",
    borderRadius: "1em",
    backgroundColor: bgColour,
    opacity: useColorModeValue(1, 0.5),
    zIndex: -1,
    content: `""`,
  };
  return (
    <Link href={`/blog/${post.filename}`} isText={false} m="0 0.5rem" display="block" textDecoration="none">
      <Box as="article" pos="relative" textAlign="start" p="0.5em 1em 1rem" margin="0.5em 0" _before={background} _hover={{ _before: { opacity: useColorModeValue(0.5, 1) } }}>
        <PostTitle {...post} isPreview />
        <Text>{post.preview ?? "Preview Unavailable"}</Text>
      </Box>
    </Link>
  );
};

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout meta={meta}>
      <Container maxW="container.lg" p="0 0.5em">
        <Heading as="h1" size="4xl">Blog Posts</Heading>
        <br/>
        <Link href="/blog/tags/">
          <Heading as="h3" size="lg" mt="0">View Tags</Heading>
        </Link>
        <br/>
        {posts.map(post => <PostDescription key={post.title} {...post} />)}
      </Container>
    </Layout>
  )
};
  
export default Blog;