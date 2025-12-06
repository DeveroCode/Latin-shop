import Dropzone from "@/components/dashboard/Settings/Dropzone";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";

export default function ImageProfileView() {
  return (
    <div>
      <Title>Profile Picture</Title>
      <Subtitle>Upload or update your profile image</Subtitle>


      <Dropzone />
    </div>
  )
}
