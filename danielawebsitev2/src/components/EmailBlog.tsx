import { Html, Heading, Text, Link } from "@react-email/components";
const EmailBlogTemplate = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <Html lang="en">
      <Heading as="h1">{`Nueva entrada en el blog: ${name}`}</Heading>
      <Text>{description}</Text>
      <Link href={`https://danielawebsitev2.vercel.app/blogs/${name}`}>
        Ver entrada
      </Link>
    </Html>
  );
};
export default EmailBlogTemplate;
