import { navigation } from "../../../data/navigation-settings";
import LinksProfile from "@/components/ui/text/LinksProfile";

export default function GeneralView() {
  return (
    <div className="flex gap-4 py-10 px-7">
       <nav className="flex gap-10 flex-wrap">
          {navigation.map((link, i) => (
            <LinksProfile key={i} link={link}/>
          ))}
        </nav>
    </div>
  );
}
