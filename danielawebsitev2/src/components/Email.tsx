import { Html, Heading, Text } from "@react-email/components";
const EmailTemplate = ({
  telefono,
  contactemail,
  message,
  servicio,
}: {
  telefono: string;
  contactemail: string;
  message: string;
  servicio: string;
}) => {
  return (
    <Html lang="en">
      <Heading as="h1">{`Nueva Solicitud de ${servicio}`}</Heading>
      <Text>Detalles de contacto</Text>
      <Text>Tel.: {telefono}</Text>
      <Text>Email: {contactemail}</Text>
      <Text>Mensaje: {message}</Text>
    </Html>
  );
};
export default EmailTemplate;
