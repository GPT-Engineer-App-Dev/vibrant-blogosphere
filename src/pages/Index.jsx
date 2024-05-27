import { Box, Container, Flex, Heading, Link, Text, VStack, HStack, Divider, Stack, Button, useColorMode, useColorModeValue, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("black", "white");

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDeletePost = () => {
    const updatedPosts = posts.filter((post) => post !== postToDelete);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setDeleteDialogOpen(false);
    toast({
      title: "Post deleted.",
      description: "The post has been deleted successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" p={0} bg={bg} color={color}>
      <Flex as="nav" bg={useColorModeValue("gray.800", "gray.900")} color="white" p={4} justifyContent="space-between" alignItems="center">
        <Heading as="h1" size="lg">My Blog</Heading>
        <HStack spacing={4}>
          <Link as={RouterLink} to="/" color="white">Home</Link>
          <Link as={RouterLink} to="#" color="white">About</Link>
          <Link as={RouterLink} to="#" color="white">Blog</Link>
          <Link as={RouterLink} to="#" color="white">Contact</Link>
          <Button onClick={toggleColorMode} colorScheme="teal" size="sm">
            Toggle {useColorModeValue("Dark", "Light")} Mode
          </Button>
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
                <Button colorScheme="red" onClick={() => handleDeleteClick(post)}>Delete</Button>
              </Box>
            ))}
          </VStack>
        </Box>

        <Box flex="1" p={4} bg={useColorModeValue("gray.50", "gray.700")}>
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

      <Box as="footer" bg={useColorModeValue("gray.800", "gray.900")} color="white" p={4} mt={8}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text>&copy; 2023 My Blog. All rights reserved.</Text>
          <HStack spacing={4}>
            <Link href="#"><FaTwitter /></Link>
            <Link href="#"><FaFacebook /></Link>
            <Link href="#"><FaInstagram /></Link>
          </HStack>
        </Flex>
      </Box>

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeletePost} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default Index;