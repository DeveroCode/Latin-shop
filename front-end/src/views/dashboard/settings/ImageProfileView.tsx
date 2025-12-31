import Dropzone from "@/components/dashboard/Settings/Dropzone";
import LabelText from "@/components/ui/text/LabelText";
import Span from "@/components/ui/text/Span";

export default function ImageProfileView() {
  return (
    <div className="flex justify-between gap-2 mt-5">
      <div className="w-90 flex flex-col">
        <LabelText id="profile_image">Update Profile Image</LabelText>
        <Span>
          Allows the user to upload or change their profile image. This image is
          used to visually represent the account across the platform, including
          the profile page, product listings, and interactions with other users.
          The profile image can be updated at any time from the account
          settings.
        </Span>
      </div>

      <Dropzone />
    </div>
  );
}
