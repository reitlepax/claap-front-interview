import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { AsyncSelect } from "chakra-react-select";
import { searchUser, User } from "api";
import { asyncMultiSelectProps } from "./async-multi-select";
import { getInvitationId, getInvitationLabel } from "../invitation";

type Invitation =
  | {
      type: "user";
      value: User;
    }
  | {
      type: "email";
      value: string;
    };

interface InviteFormProps {
  onSubmit: (invitations: Invitation[]) => void;
  onError: () => void;
}

export function InviteForm({ onSubmit, onError }: InviteFormProps) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const getIsAlreadySelected = (invitation: Invitation) => {
    return invitations.some(
      (i) => getInvitationId(i) === getInvitationId(invitation)
    );
  };

  const loadOptions = async (inputValue: string): Promise<Invitation[]> => {
    const invitationOptions: Invitation[] = [];
    if (isValidEmail(inputValue)) {
      invitationOptions.push({ type: "email" as const, value: inputValue });
    } else {
      try {
        const users = await searchUser(inputValue);
        invitationOptions.push(
          ...users.map((user) => ({
            type: "user" as const,
            value: user,
          }))
        );
      } catch {
        onError();
        return [];
      }
    }
    // We don't want to display the options that already selected
    return invitationOptions.filter(
      (invitation) => !getIsAlreadySelected(invitation)
    );
  };

  // Let's add a shortcut to quickly send the invitations
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitShortcutEvent(e) && invitations.length > 0) {
        onSubmit(invitations);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [invitations, onSubmit]);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={4}
      width="full"
      maxWidth="100%"
      sx={{
        [`.${asyncMultiSelectClassName}`]: {
          flex: 1,
          minWidth: 0,
        },
      }}
    >
      <AsyncSelect<Invitation, true>
        {...asyncMultiSelectProps}
        value={invitations}
        onChange={(newValue) => setInvitations([...newValue])}
        name="invitations"
        placeholder="Search names or emails..."
        className="select-container-invite"
        getOptionLabel={getInvitationLabel}
        getOptionValue={getInvitationId}
        loadOptions={loadOptions}
      />

      <Button
        flexShrink={0}
        size="md"
        colorScheme="claap"
        color="white"
        minWidth={24}
        borderRadius="lg"
        isDisabled={invitations.length === 0}
        onClick={() => onSubmit(invitations)}
      >
        Invite
      </Button>
    </Box>
  );
}

const asyncMultiSelectClassName = "select-container-invite";

const EMAIL_REGEX_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailRegex = new RegExp(EMAIL_REGEX_PATTERN);

function isValidEmail(value: string): boolean {
  return emailRegex.test(value);
}

function isSubmitShortcutEvent(event: KeyboardEvent) {
  if (event.key !== "Enter") {
    return false;
  }
  const isUsingWindows = navigator.platform.indexOf("Win") >= 0;
  return Boolean(isUsingWindows ? event.ctrlKey : event.metaKey);
}
