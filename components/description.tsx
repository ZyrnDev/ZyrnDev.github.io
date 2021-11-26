import { Heading, HeadingProps, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

const Description: FC<HeadingProps | { [key: string]: string }> = ({children, colorScheme = "gray", ...props}) => {
  return (
    <Heading color={useColorModeValue(`${colorScheme}.600`, `${colorScheme}.400`)} {...props}>
      {children}
    </Heading>
  );
};

export default Description;