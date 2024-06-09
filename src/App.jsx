import * as React from "react";
import weaviate, { ApiKey } from "weaviate-ts-client";

// 1. import `ChakraProvider` component
import {
  ChakraProvider,
  Box,
  Input,
  Stack,
  VStack,
  Button,
  Text,
  Tag,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

// Instantiate the client with the auth config
const client = weaviate.client({
  scheme: "https",
  host: import.meta.env.VITE_WEAVIATE_HOST,
  apiKey: new ApiKey(import.meta.env.VITE_WEAVIATE_KEY),
  headers: {
    "X-OpenAI-Api-Key": import.meta.env.VITE_OPEN_AI_KEY,
  },
});

export default function App() {
  const [postings, setPostings] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    client.graphql
      .get()
      .withClassName("Postings")
      .withFields("job_id title company_name description")
      .withLimit(20)
      .do()
      .then(({ data }) => {
        setPostings(data.Get.Postings);
      });
  }, []);

  const onSearch = () => {
    setLoading(true);
    client.graphql
      .get()
      .withClassName("Postings")
      .withFields("job_id title company_name description")
      .withLimit(5)
      .withNearText({ concepts: [query] })
      .withGenerate({
        singlePrompt:
          "Write Three skills (separated by comma, maximum 4 words) that are needed in the job {description}.",
        groupedTask:
          "write most common needed skills, separated by comma, maximum 5 skills.",
      })
      .do()
      .then(({ data }) => {
        console.log(data);
        setPostings(data.Get.Postings);
        setLoading(false);
      });
  };
  return (
    <ChakraProvider>
      <Box px={100} py={20}>
        <VStack spacing={10}>
          <Stack direction="row" spacing={4}>
            <Input
              placeholder="Search Job title"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button
              leftIcon={<Search2Icon />}
              px={6}
              isLoading={loading}
              onClick={onSearch}
              loadingText="Searching"
              colorScheme="teal"
            >
              Search
            </Button>
          </Stack>
          {postings[0]?._additional?.generate?.groupedResult && (
            <Alert status="info">
              <AlertIcon />
              Common skills needed for this job search:
              <br /> {postings[0]._additional?.generate?.groupedResult}
            </Alert>
          )}
          <VStack align={"flex-start"} spacing={10}>
            {postings.map((p) => (
              <VStack align={"flex-start"} key={p.job_id}>
                <Text as="b">
                  {p.title} -{" "}
                  {p.company_name === "NaN" ? "No Company" : p.company_name}
                </Text>
                <Text noOfLines={5}>{p.description}</Text>
                {p._additional && (
                  <Stack direction="row">
                    <Text as={"i"} color="grey">
                      ✨ Needed Skills:
                    </Text>
                    {p._additional?.generate?.singleResult
                      .split(", ")
                      .map((tag) => (
                        <Tag
                          variant="solid"
                          colorScheme="teal"
                          key={tag}
                          isTruncated={true}
                        >
                          {tag}
                        </Tag>
                      ))}
                  </Stack>
                )}
              </VStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
