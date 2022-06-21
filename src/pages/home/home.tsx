import { useState } from "react";
import {
  Box,
  Button,
  chakra,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Heading,
  Text,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import { InviteForm } from "./components/invite-form";
import { getInvitationId, getInvitationLabel, Invitation } from "./invitation";

export function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const handleOpenModalClick = () => {
    setInvitations([]);
    onOpen();
  };

  const toast = useToast({
    variant: "subtle",
    position: "bottom-right",
    isClosable: true,
    duration: 5000,
  });

  const onSubmitInvite = (data: Invitation[]) => {
    setInvitations(data);
    onClose();
    const isPlural = data.length > 1;
    toast({
      title: `Invitation${isPlural ? "s" : ""} sent 🚀`,
      description: `You will soon be able to collaborate with your teammate${
        isPlural ? "s" : ""
      }!`,
      status: "success",
    });
  };

  const onError = () => {
    const id = "error-toast";
    if (!toast.isActive(id)) {
      toast({
        id,
        title: "Something unexpected happened",
        description: "You can try again, our team has been informed.",
        status: "error",
      });
    }
  };

  return (
    <Container>
      <Box>
        <Button
          colorScheme="claap"
          color="white"
          onClick={handleOpenModalClick}
        >
          Invite teammates
        </Button>

        <List marginTop={4}>
          {invitations.map((invitation) => (
            <ListItem key={getInvitationId(invitation)}>
              {getInvitationLabel(invitation)}
            </ListItem>
          ))}
        </List>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay background="transparent" />
        <ModalContent padding={16} background="surfaceBackground">
          <ModalHeader padding={0} marginBottom={8} textAlign="center">
            Invite members
          </ModalHeader>
          <ModalBody padding={0}>
            <Box marginBottom={6}>
              <Heading
                size="sm"
                marginBottom={2}
                fontWeight="normal"
                color="gray.300"
              >
                Email invite
              </Heading>
              <Text fontSize="sm" color="gray.400">
                Send members an email invitation to join this workspace
              </Text>
            </Box>

            <InviteForm onSubmit={onSubmitInvite} onError={onError} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}

const Container = chakra("div", {
  baseStyle: {
    display: "grid",
    placeItems: "center",
    height: "100%",
  },
});
