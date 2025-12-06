import Logo from "../ui/Logo";

export default function Header() {
  return (
    <header className="shadow">
      <div className="max-w-7xl mx-auto flex items-center gap-2 p-2">
        <Logo/>
        <p className="text-2xl font-semibold">Latin Shop</p>
      </div>
    </header>
  )
}
