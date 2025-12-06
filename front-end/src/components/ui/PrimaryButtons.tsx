export default function PrimaryButtons({children}: React.PropsWithChildren) {
  return  <button type="submit" className="bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-950 transition duration-300">{children}</button>
}
