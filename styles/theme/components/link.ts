import palette from "../palette";
import { mode } from '@chakra-ui/theme-tools'
import { Dict } from "@chakra-ui/utils";

const Link = {
    baseStyle: (props: Dict) => ({
        // color: mode(palette.light.cyan, palette.dark.cyan)(props),
        textDecoration: props.textDecoration ?? "none",
        _hover: {
            textDecoration: props.textDecoration ?? "underline",
        },
        _focus: {
            textDecoration: props.textDecoration ?? "underline",
        },
        _active: {
            textDecoration: props.textDecoration ?? "underline",
        },
    }),
};

export default Link;