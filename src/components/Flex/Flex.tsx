import { Flex as RadixFlex } from "@radix-ui/themes";
import { FC } from "react";
import { styled } from "../../stitches.config";
import { FlexProps } from "./types";

const FlexRoot = styled(RadixFlex, {});

export const Flex: FC<FlexProps> = (props) => {
  return <FlexRoot {...props}></FlexRoot>;
};
