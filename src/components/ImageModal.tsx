import {
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ImageProps,
  TextProps,
  useDisclosure,
} from "@chakra-ui/react";
import { IRichText } from "@ammarahmedca/types";
import RichText from "./RichText";

type ImageModalProps = {
  imageProps: ImageProps;
  captionProps: TextProps;
  captionData: IRichText[];
};

const ImageModal: React.FC<ImageModalProps> = ({
  imageProps,
  captionProps,
  captionData,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex align="center" justify="center" direction="column" my="5">
      <Image {...imageProps} onClick={onOpen} />
      <RichText {...captionProps} data={captionData} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        autoFocus={false}
        returnFocusOnClose={false}
        trapFocus={false}
        scrollBehavior="outside"
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          maxW="75vw"
          bg="transparent"
          backdropFilter="blur(10px)"
          boxShadow="none"
        >
          <Image {...imageProps} />
          <RichText {...captionProps} data={captionData} />
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ImageModal;
