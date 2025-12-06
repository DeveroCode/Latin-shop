export default function Footer() {
    const actualYear = new Date().getFullYear();
  return (
    <footer className="p-4 flex items-center justify-between gap-3 bg-blue-200/60 fixed bottom-0 w-full text-center">
        <p className="text-gray-700 text-xs">&copy; {actualYear} Latin Shop. All rights reserved.</p>
        <p className="text-gray-700 text-xs">Crafted by ❤️ <span className="font-semibold">DeveroCode</span></p>
    </footer>
  )
}
