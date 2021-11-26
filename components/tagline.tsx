import { Heading, HeadingProps, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

const TagLine: FC<HeadingProps | { [key: string]: string }> = ({children, colorScheme = "green", ...props}) => {
  return (
    <Heading color={useColorModeValue(`${colorScheme}.400`, `${colorScheme}.600`)} {...props}>
      {children}
    </Heading>
  );
};

export default TagLine;