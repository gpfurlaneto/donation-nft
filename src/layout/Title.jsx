
export default function Title({ text, highlightedText, breakLine = false, fontSize = 'text-xl' }) {
  console.log(breakLine)
  return (
    <h2 class={`mb-5 font-extrabold leading-relaxed ${fontSize}`}>
      <span class="shadow-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
        {text}{' '}
      </span>
      {breakLine && <br />}
      {highlightedText && (
        <span class="bg-mustard p-2 text-black shadow-black drop-shadow-none">
          {highlightedText}
        </span>
      )}
    </h2>
  )
}