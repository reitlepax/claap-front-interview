import { User } from "../../api";

export type Invitation =
  | {
      type: "user";
      value: User;
    }
  | {
      type: "email";
      value: string;
    };

export function getInvitationId(invitation: Invitation): string {
  if (invitation.type === "email") {
    return invitation.value;
  } else {
    return invitation.value.id;
  }
}

export function getInvitationLabel(invitation: Invitation): string {
  if (invitation.type === "email") {
    return invitation.value;
  } else {
    return `${invitation.value.firstName} ${invitation.value.lastName}`;
  }
}
