export default function ButtonLink({ href, clazz, children }) {
  return (
    <a
      href={href}
      class={`bg-mustard p-2 text-center font-extrabold text-black ${clazz}`}
    >
      {children}
    </a>
  )
}