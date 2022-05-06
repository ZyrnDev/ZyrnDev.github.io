import React, { FC } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Box, Container, Heading, Flex, Spacer, Text, Tag as ChakraTag, useColorModeValue, Grid, GridItem, Input } from '@chakra-ui/react';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Link } from '@components/core';
import { getSortedPosts, getTagsSortedByPostCount, Post, Tag } from '@/lib/posts';
import { PostTitle } from '@/pages/blog/[filename]';

const meta: MetaOptions = {
  title: "Blog",
  description: "The official blog from zyrn.dev on my projects, products and services.",
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getSortedPosts();
  const tags = await getTagsSortedByPostCount();

  return {
    props: {
      posts,
      tags,
    }
  }
}

export const PostDescription: FC<Post> = ({ children, ...post }) => {
  return (
    <Link href={`/blog/${post.filename}`} isText={false} m="0 0.5rem" display="block" textDecoration="none">
      <Box as="article" pos="relative" textAlign="start" p="0.5em 1em 1rem" margin="0.5em 0" {...TargetHoverProps()}>
        <PostTitle {...post} isPreview />
        <Text>{post.preview ?? "Preview Unavailable"}</Text>
      </Box>
    </Link>
  );
};

const TargetHoverProps = (width?: string | number) => ({
  _before: { 
    position: "absolute", top: 0, left: 0, height: "100%", width: width ?? "100%",
    borderRadius: "1em",
    backgroundColor: useColorModeValue("gray.100", "gray.800"),
    opacity: useColorModeValue(1, 0.5),
    zIndex: -1,
    content: `""`,
  },
  _hover: { _before: { opacity: useColorModeValue(0.5, 1) }}
});

const RightHandPanel: FC<{ tags: Tag[] }> = ({ tags }) => {
  const [search, setSearch] = React.useState("");

  return (
    <Box w="20rem" m="0.5em 0" p="0.5em" pos="relative" display={["none", "none", "none", "block"]}  {...TargetHoverProps("20rem")} _hover={{}}>
      <Link href="/blog/tags/">
        <Heading as="h3" size="lg" mt="0">All Tags</Heading>
      </Link>
      <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <DisplayTags tags={tags.filter(tag => tag.name.toLowerCase().includes(search.toLowerCase()))} />
    </Box>
  );
};

const DisplayTags: FC<{ tags: Tag[] }> = ({ tags }) => {
  const bgColour = useColorModeValue("gray.300", "gray.700");
  return (
    <>
      {tags.map(tag => (
        <Link m="0.5rem 0.5rem" href={`/blog/tags/${encodeURIComponent(tag.name)}`} display={"inline-flex"} key={tag.name} mr="0.6em">
          <ChakraTag size="lg" bgColor={bgColour}>
            {tag.name + " | " + tag.posts.length}
          </ChakraTag>
        </Link>
      ))}
    </>
  );
}

const Blog: NextPage<{ posts: Post[], tags: Tag[] }> = ({ posts, tags }) => {
  return (
    <Layout meta={meta}>
      <Container maxW="container.xl" p="0 0.5em">
        <Heading as="h1" size="4xl">Blog Posts</Heading>
        <br/>
        <Flex wrap="wrap" justify="center" align="start" direction="row">
          <Container maxW="calc(100% - 20rem)">
            {posts.map(post => <PostDescription key={post.title} {...post} />)}
          </Container>
          <RightHandPanel tags={tags} />
        </Flex>
      </Container>
    </Layout>
  )
};
  
export default Blog;
