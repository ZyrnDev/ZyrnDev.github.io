import { Heading, HeadingProps, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

const Description: FC<HeadingProps | { [key: string]: string }> = ({children, ...props}) => {
  return (
    <Heading {...props} color={useColorModeValue("green.400", "green.600")}>
      {children}
    </Heading>
  );
};

export default Description;