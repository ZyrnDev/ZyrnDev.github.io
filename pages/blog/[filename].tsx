import React, { FC } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Box, Container, Flex, Heading,  Spacer, Tag, Text } from '@chakra-ui/react';
import { getPost, getPostPaths, Post } from '@/lib/posts';
import { Link } from '@components/core';
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

export const PostTitle: FC<Post & { isPreview?: boolean }> = ({ filename, title, date, author, published, tags, isPreview = false }) => {
  const titleSize = isPreview ? 'lg' : '2xl';
  const subTitleSize = isPreview ? 'sm' : 'md';
  const tagSize = isPreview ? 'md' : 'lg';
  const bottomMargin = isPreview ? "0.3rem" : "0.6rem"; //"0.8rem";
  const textDecoration = isPreview ? 'underline' : 'none';

  return (
    <>
      <TagLine as="h1" size={titleSize} m="0.1em 0" textDecoration={textDecoration}>{ published || (<Text as="span" color="red">(Not Published) </Text>) }{title}</TagLine>
      <Flex align="center">
        <Heading as="h2" size={subTitleSize} m="0" mb={bottomMargin} colorScheme="gray">by {author}</Heading>
        <Spacer />
        <Heading as="time" size={subTitleSize} m="0" mb={bottomMargin} colorScheme="gray" dateTime={(new Date(date)).toISOString()}>{date}</Heading>
      </Flex>
      <PostTags tags={tags} headingSize={subTitleSize} tagSize={tagSize} />
    </>
  );
};

export const PostTags: FC<{ tags: string[], headingSize: string, tagSize: string }> = ({ tags, headingSize, tagSize }) => {
  return (
    <Flex wrap="wrap">
      <Heading as="h4" m="auto 0" mr="0.6rem" size={headingSize}>Tags: </Heading>
      {tags?.map(tag => (
        <Link href={`/blog/tags/${encodeURIComponent(tag)}`} key={tag} display="inline-flex" m="0.2rem 0" mr="0.6em">
          <Tag size={tagSize} whiteSpace="nowrap">
            {tag}
          </Tag>
        </Link>
      ))}
    </Flex>
  )
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