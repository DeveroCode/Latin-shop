import Dropzone from "@/components/dashboard/Settings/Dropzone";
import Subtitle from "@/components/ui/text/Subtitle";
import Title from "@/components/ui/text/Title";

export default function ImageProfileView() {
  return (
    <div>
      <Title>Profile Picture</Title>
      <Subtitle>Upload or update your profile image</Subtitle>


      <Dropzone />
    </div>
  )
}
