import { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Textarea, VStack, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const bg = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("black", "white");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content, tags: tags.split(",").map(tag => tag.trim()) };
    // Save the new post to localStorage (or send to an API)
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([...existingPosts, newPost]));
    navigate("/");
  };

  return (
    <Container maxW="container.md" mt={8} bg={bg} color={color}>
      <Box p={4} shadow="md" borderWidth="1px">
        <Heading as="h2" size="xl" mb={4}>Add New Post</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl id="content" isRequired>
              <FormLabel>Content</FormLabel>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </FormControl>
            <FormControl id="tags">
              <FormLabel>Tags (comma separated)</FormLabel>
              <Input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">Submit</Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default AddPost;