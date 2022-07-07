import Line from './line';
import Bubble from './bubble';

export default function Connection() {
  return <div class="scale-75">
    <div><Line /></div>
    <div class="absolute top-[-4px] left-[-4px]"><Bubble /></div>
    <div class="absolute top-[126px] left-[378px]"><Bubble /></div>
  </div>
}