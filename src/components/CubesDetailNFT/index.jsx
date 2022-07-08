import CubeMedium from './MediumCube'
import SmallCube from './SmallCube'
import Bubble from './Bubble'
import Connection from './Connection'
import VerticalBubble from './HorizontalBubble'

export default function CubesDetailNFT({ url1, url2 }) {
  return <>
    <div class=".scale-75 w-[410px] h-[685px]">
      <div class="ml-auto max-w-fit"><CubeMedium /></div>
      <div class="relative top-[-15px] left-[184px]"><Bubble /></div>
      <div class="relative top-[-15px] left-[188px]"><Connection /></div>
      <div class="relative top-[-24px] left-[210px]"><VerticalBubble /></div>
      <div class="relative top-[-130px] left-[4px]"><SmallCube /></div>
      <div class="relative left-[9px] top-[-812px]"><img class="w-[371px] h-[349px]" src={url1}/></div>
      <div class="relative left-[6px] top-[-688px]"><img class="w-[196px] h-[184px]"src={url2}/></div>
      <div class="relative top-[-865px] left-[282px] px-[8.74px] py-[7.65px] max-w-fit bg-mustard font-extrabold text-black">Donation</div>
    </div>
  </>
}