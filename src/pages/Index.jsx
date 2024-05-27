import { Box, Container, Flex, Heading, Link, Text, VStack, HStack, Divider, Stack, Button } from "@chakra-ui/react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);
  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="gray.800" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Heading as="h1" size="lg">My Blog</Heading>
        <HStack spacing={4}>
          <Link as={RouterLink} to="/" color="white">Home</Link>
          <Link as={RouterLink} to="#" color="white">About</Link>
          <Link as={RouterLink} to="#" color="white">Blog</Link>
          <Link as={RouterLink} to="#" color="white">Contact</Link>
        </HStack>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} mt={8}>
        <Box flex="3" p={4}>
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading as="h2" size="xl">Welcome to My Blog</Heading>
            <Button as={RouterLink} to="/add-post" colorScheme="blue">Add New Post</Button>
          </Flex>
          <Text fontSize="lg" mb={4}>This is a place where I share my thoughts and experiences.</Text>
          <Divider mb={4} />
          <VStack spacing={4} align="stretch">
            {posts.map((post, index) => (
              <Box key={index} p={4} shadow="md" borderWidth="1px">
                <Heading as="h3" size="md">{post.title}</Heading>
                <Text mt={2}>{post.content}</Text>
                <HStack spacing={2} mt={2}>
                  {post.tags.map((tag, idx) => (
                    <Text key={idx} bg="gray.200" p={2} borderRadius="md">{tag}</Text>
                  ))}
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>

        <Box flex="1" p={4} bg="gray.50">
          <Heading as="h3" size="lg" mb={4}>Recent Posts</Heading>
          <VStack spacing={4} align="stretch">
            <Link href="#">Recent Post 1</Link>
            <Link href="#">Recent Post 2</Link>
            <Link href="#">Recent Post 3</Link>
          </VStack>
          <Divider my={4} />
          <Heading as="h3" size="lg" mb={4}>Categories</Heading>
          <VStack spacing={4} align="stretch">
            <Link href="#">Category 1</Link>
            <Link href="#">Category 2</Link>
            <Link href="#">Category 3</Link>
          </VStack>
          <Divider my={4} />
          <Heading as="h3" size="lg" mb={4}>Tags</Heading>
          <HStack spacing={2}>
            <Link href="#" bg="gray.200" p={2} borderRadius="md">Tag1</Link>
            <Link href="#" bg="gray.200" p={2} borderRadius="md">Tag2</Link>
            <Link href="#" bg="gray.200" p={2} borderRadius="md">Tag3</Link>
          </HStack>
        </Box>
      </Flex>

      <Box as="footer" bg="gray.800" color="white" p={4} mt={8}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text>&copy; 2023 My Blog. All rights reserved.</Text>
          <HStack spacing={4}>
            <Link href="#"><FaTwitter /></Link>
            <Link href="#"><FaFacebook /></Link>
            <Link href="#"><FaInstagram /></Link>
          </HStack>
        </Flex>
      </Box>
    </Container>
  );
};

export default Index;