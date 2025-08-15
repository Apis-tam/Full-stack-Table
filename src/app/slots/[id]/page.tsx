import { FuncSlotMachine } from './FuncSlotMachine';

export async function generateStaticParams() {
  return [{ id: '1' }];
}
export default async function SlotGames({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className={'flex justify-center items-center h-screen w-full pt-10'}>
      <FuncSlotMachine id={id} />
    </div>
  );
}
