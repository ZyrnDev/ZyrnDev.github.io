import Layout from "@/components/layouts/centered";
import { PostDescription } from '@/pages/blog/index';
import { MetaOptions } from "@/components/meta";
import { getPost, getPostPaths, getPostsByTag, getTagPaths, Post } from "@/lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { Container, Heading, Text } from '@chakra-ui/react';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getPostsByTag(params?.tag as string);
  
  return {
    props: {
      posts,
      tag: params?.tag as string,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getTagPaths();

  return {
    paths,
    fallback: false
  }
}

const meta: MetaOptions = {
  title: "Home",
  description: "zyrn.dev's offical website for all our projects, products and services.",
};

const Render: FC<{ tag: string, posts: Post[] }> = ({ tag, posts }) => {
  return (
    <Layout meta={meta}>
      <Container maxW="container.lg" p="0 0.5em">
        <Heading as="h1" size="4xl">Posts Tagged as &apos;{tag}&apos;</Heading>
        <br/>
        {posts.map(post => <PostDescription key={post.title} {...post} />)}
      </Container>
    </Layout>
  )
}

export default Render;