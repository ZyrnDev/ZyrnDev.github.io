import React, { FC } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Box, Container, Heading, Flex, Spacer, Text, Tag } from '@chakra-ui/react';
import Layout from '@components/layouts/centered';
import { MetaOptions } from '@components/meta';
import { Link } from '@components/core';
import { getSortedPosts, Post } from '@/lib/posts';
import Description from '@components/description';
import { PostTitle } from '@/pages/blog/[filename]';

const meta: MetaOptions = {
  title: "Blog",
  description: "The official blog from example_site on our projects, products and services.",
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getSortedPosts();
  return {
    props: {
      posts: posts,
    }
  }
}

const MAX_RECURSIVE_DEPTH = 3;
const MAX_PREVIEW_LENGTH  = 256;
const HTML_TO_TEXT = (preview: string | undefined, content: string) => {
  if (preview)
    return preview;

  var text = content;

  text = text.replaceAll(/<style[^>]*?>.*?<\/style>/gms, ''); // Remove Styles
  text = text.replaceAll(/<script[^>]*?>.*?<\/script>/gms, ''); // Remove Scripts
  for (var i = 0; i < MAX_RECURSIVE_DEPTH; i++)
    text = text.replaceAll(/<\/?[^>]*?>/gms, '');
  text.replaceAll(/\s+/gm, ' '); // Remove excess white space

  return text.length <= MAX_PREVIEW_LENGTH ? text : text.substring(0, MAX_PREVIEW_LENGTH - 3) + '...';
}

const PostPreview: FC<Post> = ({ filename, content, preview }) => {
  const preview_text = HTML_TO_TEXT(preview, content);

  return (
    <Text>
      {preview_text ?? "Preview Unavailable"}
      <Link href={`/blog/${filename}`} m="0 0.5rem">
        <Tag>Read More</Tag>
      </Link>
    </Text>
  );
};

const PostDescription: FC<Post> = ({ children, ...post }) => {

  return (
    <Box as="article" textAlign="start">
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